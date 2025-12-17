import React from 'react';
import { useTimerContext } from '../context/TimerProvider';
import TimerList from '../components/TimerList';
import TimerControls from '../components/TimerControls';
import AddTimerForm from '../components/AddTimerForm';
import styles from '../styles/dashboard.module.css';

const Dashboard = () => {
    const { timers, startTimer, pauseTimer, resetTimer, removeTimer } = useTimerContext();

    return (
        <div className={styles.dashboard}>
            <h1>Timer Dashboard</h1>
            <AddTimerForm />
            <TimerControls />
            <TimerList timers={timers} onStart={startTimer} onPause={pauseTimer} onReset={resetTimer} onRemove={removeTimer} />
        </div>
    );
};

export default Dashboard;