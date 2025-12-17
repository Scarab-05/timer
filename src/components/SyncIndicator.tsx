import React from 'react';

const SyncIndicator: React.FC<{ isSynced: boolean }> = ({ isSynced }) => {
    return (
        <div style={{ color: isSynced ? 'green' : 'red' }}>
            {isSynced ? 'Synchronized' : 'Out of Sync'}
        </div>
    );
};

export default SyncIndicator;