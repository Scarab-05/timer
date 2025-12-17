import React from 'react';
import { useTimerContext } from '../context/TimerProvider';
import styles from '../styles/dashboard.module.css';

const Timeline: React.FC = () => {
    const { timers } = useTimerContext();

    return (
        <div className={styles.timeline}>
            {timers.map(timer => {
                const elapsedTime = timer.duration - timer.remainingTime;
                const totalTime = timer.duration;
                return (
                    <div key={timer.id} className={styles.timer}>
                        <div className={styles.timerName}>{timer.title}</div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{ width: `${totalTime > 0 ? (elapsedTime / totalTime) * 100 : 0}%` }}
                            />
                        </div>
                        <div className={styles.timerStatus}>{timer.isActive ? 'Running' : 'Paused'}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Timeline;