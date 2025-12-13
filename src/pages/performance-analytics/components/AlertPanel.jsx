import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AlertPanel = ({ alerts }) => {
  const [filter, setFilter] = useState('all');

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: {
        color: 'text-error',
        bgColor: 'bg-error/10',
        borderColor: 'border-error/20',
        icon: 'AlertCircle'
      },
      warning: {
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        borderColor: 'border-warning/20',
        icon: 'AlertTriangle'
      },
      info: {
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/20',
        icon: 'Info'
      }
    };
    return configs?.[severity] || configs?.info;
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.severity === filter);

  const severityCounts = {
    critical: alerts?.filter(a => a?.severity === 'critical')?.length,
    warning: alerts?.filter(a => a?.severity === 'warning')?.length,
    info: alerts?.filter(a => a?.severity === 'info')?.length
  };

  const defaultAlerts = alerts?.length > 0 ? alerts : [
    {
      id: 1,
      severity: 'critical',
      title: 'High Customer Anger Detected',
      message: 'Multiple calls with angry emotion scores below 30% in the last hour',
      timestamp: '2 min ago',
      source: 'Voice Analysis'
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Increased Customer Frustration',
      message: 'Frustrated customer interactions increased by 25% in the last 30 minutes',
      timestamp: '5 min ago',
      source: 'Performance'
    },
    {
      id: 3,
      severity: 'info',
      title: 'High Satisfaction Period',
      message: 'Satisfied customer emotions at peak levels - 85% positive interactions',
      timestamp: '10 min ago',
      source: 'System'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 border border-border h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-destructive/10 rounded-lg">
            <Icon name="Bell" size={20} color="var(--color-destructive)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Emotion Alerts</h3>
            <p className="text-sm text-muted-foreground">{defaultAlerts?.length} active alerts</p>
          </div>
        </div>
        {/* ... keep View All button ... */}
      </div>

      {/* ... keep alert list rendering with existing structure ... */}
      {/* ... keep refresh button ... */}
    </div>
  );
};

export default AlertPanel;