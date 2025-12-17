import React from 'react';
import { Timer } from '../types';

interface TimerCardProps {
  timer: Timer;
  onStart?: (id: string) => void;
  onPause?: (id: string) => void;
  onReset?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const TimerCard: React.FC<TimerCardProps> = ({ timer, onStart, onPause, onReset, onRemove }) => {
  return (
    <div className="timer-card">
      <h3>{timer.title}</h3>
      <p>{Math.floor(timer.remainingTime / 60)}:{(timer.remainingTime % 60).toString().padStart(2, '0')} remaining</p>
      <div className="timer-controls">
        {onStart && <button onClick={() => onStart(timer.id)}>Start</button>}
        {onPause && <button onClick={() => onPause(timer.id)}>Pause</button>}
        {onReset && <button onClick={() => onReset(timer.id)}>Reset</button>}
        {onRemove && <button onClick={() => onRemove(timer.id)}>Remove</button>}
      </div>
    </div>
  );
};

export default TimerCard;