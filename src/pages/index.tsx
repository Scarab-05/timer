import React from 'react';
import Link from 'next/link';
import styles from '../styles/dashboard.module.css';

const Home: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Welcome to the Multi-Timer App</h1>
            <p>Manage your presentation timers efficiently.</p>
            <div className={styles.links}>
                <Link href="/dashboard">
                    <a className={styles.link}>Go to Dashboard</a>
                </Link>
                <Link href="/display">
                    <a className={styles.link}>View Timers</a>
                </Link>
            </div>
        </div>
    );
};

export default Home;