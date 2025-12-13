import React from 'react';
import Icon from '../../../components/AppIcon';

const ConnectionStatus = ({ isConnected, lastUpdate }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-error'}`} />
        <span className="text-xs font-medium text-foreground">
          {isConnected ? 'Live' : 'Disconnected'}
        </span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon name="Clock" size={12} />
        <span>Updated {lastUpdate}</span>
      </div>
    </div>
  );
};

export default ConnectionStatus;