import React from 'react';
import TimerCard from './TimerCard';
import { Timer } from '../types';

interface TimerListProps {
  timers: Timer[];
  onStart?: (id: string) => void;
  onPause?: (id: string) => void;
  onReset?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const TimerList: React.FC<TimerListProps> = ({ timers, onStart, onPause, onReset, onRemove }) => {
  return (
    <div>
      {timers.map((timer) => (
        <TimerCard key={timer.id} timer={timer} onStart={onStart} onPause={onPause} onReset={onReset} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default TimerList;