import React, { useState } from 'react';
import { useTimerContext } from '../context/TimerProvider';

const AddTimerForm: React.FC = () => {
  const { addTimer } = useTimerContext();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(300); // default 5 min

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && duration > 0) {
      const newTimer = {
        id: Date.now().toString(), // temporary id
        title,
        duration,
        remainingTime: duration,
        isActive: false,
        isPaused: false,
      };
      addTimer(newTimer);
      setTitle('');
      setDuration(300);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Timer name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Duration in seconds"
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        min="1"
        required
      />
      <button type="submit">Add Timer</button>
    </form>
  );
};

export default AddTimerForm;