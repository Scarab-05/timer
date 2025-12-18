import React from 'react';
import { Timer } from '../types';
import styles from '../styles/dashboard.module.css';

interface TimerCardProps {
  timer: Timer;
  onStart?: (id: string) => void;
  onPause?: (id: string) => void;
  onReset?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const TimerCard: React.FC<TimerCardProps> = ({ timer, onStart, onPause, onReset, onRemove }) => {
  const minutes = Math.floor(timer.remainingTime / 60);
  const seconds = timer.remainingTime % 60;
  const progress = ((timer.duration - timer.remainingTime) / timer.duration) * 100;

  const isRunning = timer.isActive;
  const isFinished = timer.remainingTime === 0;

  return (
    <div className={styles.timerCard}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#e8eaed' }}>
        {timer.title}
      </h3>

      <div style={{
        fontSize: '4rem',
        fontWeight: '700',
        marginBottom: '10px',
        fontFamily: 'monospace',
        color: isFinished ? '#ef4444' : isRunning ? '#10b981' : '#60a5fa',
        textShadow: '0 0 20px rgba(96, 165, 250, 0.5)'
      }}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>

      <div style={{
        fontSize: '0.9rem',
        color: 'rgba(255, 255, 255, 0.6)',
        marginBottom: '20px'
      }}>
        {isFinished ? 'Tempo Esgotado' : isRunning ? 'Em Execução' : 'Pausado'}
      </div>

      <div className={styles.timeline}>
        <div
          className={styles.timelineProgress}
          style={{
            width: `${progress}%`,
            background: isFinished ? '#ef4444' : 'linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6)'
          }}
        />
      </div>

      <div className={styles.timerControls}>
        {onStart && !isRunning && (
          <button
            onClick={() => onStart(timer.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#10b981',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            ▶ Iniciar
          </button>
        )}
        {onPause && isRunning && (
          <button
            onClick={() => onPause(timer.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(251, 191, 36, 0.2)',
              color: '#fbbf24',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            ⏸ Pausar
          </button>
        )}
        {onReset && (
          <button
            onClick={() => onReset(timer.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(59, 130, 246, 0.2)',
              color: '#3b82f6',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            ↻ Resetar
          </button>
        )}
        {onRemove && (
          <button
            onClick={() => onRemove(timer.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            ✕ Remover
          </button>
        )}
      </div>
    </div>
  );
};

export default TimerCard;