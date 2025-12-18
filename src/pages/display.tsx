import React from 'react';
import { useTimerContext } from '../context/TimerProvider';
import TimerList from '../components/TimerList';
import SyncIndicator from '../components/SyncIndicator';

const DisplayPage = () => {
  const { timers } = useTimerContext();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1d29 0%, #2d3142 100%)',
      padding: '40px 20px',
      color: '#e8eaed'
    }}>
      <h1 style={{
        fontSize: '3rem',
        textAlign: 'center',
        marginBottom: '40px',
        background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Timers Ativos
      </h1>
      <SyncIndicator isSynced={true} />
      <TimerList timers={timers} />
    </div>
  );
};

export default DisplayPage;