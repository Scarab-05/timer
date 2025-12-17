import React from 'react';
import { useTimerContext } from '../context/TimerProvider';
import TimerList from '../components/TimerList';
import SyncIndicator from '../components/SyncIndicator';

const DisplayPage = () => {
  const { timers } = useTimerContext();

  return (
    <div style={{ fontSize: '2rem', textAlign: 'center', padding: '20px' }}>
      <h1>Active Timers</h1>
      <SyncIndicator isSynced={true} />
      <TimerList timers={timers} />
    </div>
  );
};

export default DisplayPage;