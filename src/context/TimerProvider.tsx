import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Timer } from '../types';
import { supabase } from '../lib/supabase';

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

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timers, setTimers] = useState<Timer[]>([]);

  useEffect(() => {
    const loadTimers = async () => {
      try {
        const response = await fetch('/api/timers');
        if (response.ok) {
          const data = await response.json();
          setTimers(data);
        }
      } catch (error) {
        console.error('Failed to load timers:', error);
      }
    };
    loadTimers();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('timers')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Timer' }, (payload) => {
        console.log('Change received!', payload);
        loadTimers(); // Reload timers on any change
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addTimer = async (timer: Timer) => {
    setTimers((prevTimers) => [...prevTimers, timer]);
    // Persist to database
    try {
      const response = await fetch('/api/timers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: timer.title, duration: timer.duration }),
      });
      if (response.ok) {
        const savedTimer = await response.json();
        // Update with real id
        setTimers((prevTimers) =>
          prevTimers.map((t) => (t.id === timer.id ? { ...savedTimer, remainingTime: savedTimer.remainingTime } : t))
        );
      }
    } catch (error) {
      console.error('Failed to save timer:', error);
    }
  };

  const updateTimer = async (id: string, updatedTimer: Partial<Timer>) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => (timer.id === id ? { ...timer, ...updatedTimer } : timer))
    );
    // Persist to database
    try {
      await fetch('/api/timers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedTimer }),
      });
    } catch (error) {
      console.error('Failed to update timer:', error);
    }
  };

  const removeTimer = async (id: string) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
    // Persist to database
    try {
      await fetch('/api/timers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error('Failed to delete timer:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) =>
          timer.isActive && timer.remainingTime > 0
            ? { ...timer, remainingTime: timer.remainingTime - 1 }
            : timer
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const startTimer = (id: string) => {
    updateTimer(id, { isActive: true, isPaused: false });
  };

  const pauseTimer = (id: string) => {
    updateTimer(id, { isActive: false, isPaused: true });
  };

  const resetTimer = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, remainingTime: timer.duration, isActive: false, isPaused: false } : timer
      )
    );
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