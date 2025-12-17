import React from 'react';

const TimerControls: React.FC<{ onStart?: () => void; onPause?: () => void; onReset?: () => void; onAdd?: () => void; }> = ({ onStart, onPause, onReset, onAdd }) => {
    return (
        <div className="timer-controls">
            {onAdd && <button onClick={onAdd}>Add Timer</button>}
            {onStart && <button onClick={onStart}>Start All</button>}
            {onPause && <button onClick={onPause}>Pause All</button>}
            {onReset && <button onClick={onReset}>Reset All</button>}
        </div>
    );
};

export default TimerControls;