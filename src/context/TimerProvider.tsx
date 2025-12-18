import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Timer } from '../types';

interface TimerContextType {
  timers: Timer[];
  addTimer: (timer: Timer) => void;
  updateTimer: (id: string, updatedTimer: Partial<Timer>) => void;
  removeTimer: (id: string) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

const STORAGE_KEY = 'timers';
const CHANNEL_NAME = 'timer-sync';

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [channel, setChannel] = useState<BroadcastChannel | null>(null);

  // Load timers from localStorage on mount
  useEffect(() => {
    console.log('Loading timers from localStorage...');
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('Timers loaded:', parsed);
      setTimers(parsed);
    }

    // Setup BroadcastChannel for cross-tab sync
    if (typeof window !== 'undefined') {
      const bc = new BroadcastChannel(CHANNEL_NAME);
      bc.onmessage = (event) => {
        console.log('Broadcast received:', event.data);
        if (event.data.type === 'TIMERS_UPDATE') {
          setTimers(event.data.timers);
        }
      };
      setChannel(bc);

      return () => {
        bc.close();
      };
    }
  }, []);

  // Save to localStorage and broadcast whenever timers change
  const syncTimers = (newTimers: Timer[]) => {
    console.log('Syncing timers:', newTimers);
    setTimers(newTimers);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTimers));
    if (channel) {
      channel.postMessage({ type: 'TIMERS_UPDATE', timers: newTimers });
    }
  };

  const addTimer = (timer: Timer) => {
    console.log('Adding timer:', timer);
    syncTimers([...timers, timer]);
  };

  const updateTimer = (id: string, updatedTimer: Partial<Timer>) => {
    const newTimers = timers.map((timer) =>
      timer.id === id ? { ...timer, ...updatedTimer } : timer
    );
    syncTimers(newTimers);
  };

  const removeTimer = (id: string) => {
    const newTimers = timers.filter((timer) => timer.id !== id);
    syncTimers(newTimers);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = prevTimers.map((timer) =>
          timer.isActive && timer.remainingTime > 0
            ? { ...timer, remainingTime: timer.remainingTime - 1 }
            : timer
        );
        // Check if any timer changed
        const hasChanged = newTimers.some((timer, i) =>
          timer.remainingTime !== prevTimers[i].remainingTime
        );
        if (hasChanged) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newTimers));
          if (channel) {
            channel.postMessage({ type: 'TIMERS_UPDATE', timers: newTimers });
          }
        }
        return newTimers;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [channel]);

  const startTimer = (id: string) => {
    updateTimer(id, { isActive: true, isPaused: false });
  };

  const pauseTimer = (id: string) => {
    updateTimer(id, { isActive: false, isPaused: true });
  };

  const resetTimer = (id: string) => {
    const newTimers = timers.map((timer) =>
      timer.id === id ? { ...timer, remainingTime: timer.duration, isActive: false, isPaused: false } : timer
    );
    syncTimers(newTimers);
  };

  return (
    <TimerContext.Provider value={{ timers, addTimer, updateTimer, removeTimer, startTimer, pauseTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};