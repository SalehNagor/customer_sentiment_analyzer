import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SentimentAlertFeed = () => {
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const alerts = [
    {
      id: 1,
      severity: 'critical',
      customer: 'Acme Corporation',
      sentiment: 28,
      interaction: 'Support Call',
      timestamp: '2025-12-04 09:45:00',
      issue: 'Multiple product failures reported during implementation phase',
      recommendedAction: 'Immediate escalation to senior account manager and technical team',
      status: 'active',
      emotion: 'Angry'
    },
    {
      id: 2,
      severity: 'high',
      customer: 'TechStart Inc.',
      sentiment: 35,
      interaction: 'Feedback Session',
      timestamp: '2025-12-04 09:12:00',
      issue: 'Customer expressed frustration with onboarding process complexity',
      recommendedAction: 'Schedule follow-up call with customer success team within 24 hours',
      status: 'active',
      emotion: 'Frustrated'
    },
    {
      id: 3,
      severity: 'medium',
      customer: 'Global Solutions Ltd.',
      sentiment: 42,
      interaction: 'Sales Call',
      timestamp: '2025-12-04 08:30:00',
      issue: 'Pricing concerns raised during renewal discussion',
      recommendedAction: 'Prepare custom pricing proposal and competitive analysis',
      status: 'in-progress',
      emotion: 'Frustrated'
    },
    {
      id: 4,
      severity: 'critical',
      customer: 'Enterprise Systems Co.',
      sentiment: 22,
      interaction: 'Support Call',
      timestamp: '2025-12-04 08:05:00',
      issue: 'System downtime affecting critical business operations',
      recommendedAction: 'Emergency response team activated, provide hourly updates',
      status: 'active',
      emotion: 'Angry'
    },
    {
      id: 5,
      severity: 'high',
      customer: 'Innovation Labs',
      sentiment: 38,
      interaction: 'Onboarding Call',
      timestamp: '2025-12-04 07:45:00',
      issue: 'Integration challenges with existing infrastructure',
      recommendedAction: 'Assign dedicated technical consultant for integration support',
      status: 'resolved',
      emotion: 'Frustrated'
    },
    {
      id: 6,
      severity: 'medium',
      customer: 'Digital Ventures',
      sentiment: 45,
      interaction: 'Feedback Session',
      timestamp: '2025-12-04 07:20:00',
      issue: 'Feature requests not addressed in recent product updates',
      recommendedAction: 'Add to product roadmap review and communicate timeline',
      status: 'in-progress',
      emotion: 'Frustrated'
    }
  ];

  const getSeverityConfig = (severity) => {
   
        return {
          color: 'text-primary',
          bg: 'bg-primary/10',
          border: 'border-primary/50',
          icon: 'Info'
        };
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return { color: 'text-destructive', bg: 'bg-destructive/10', label: 'Active' };
      case 'in-progress':
        return { color: 'text-warning', bg: 'bg-warning/10', label: 'In Progress' };
      case 'resolved':
        return { color: 'text-success', bg: 'bg-success/10', label: 'Resolved' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted', label: 'Unknown' };
    }
  };

  const filteredAlerts = selectedSeverity === 'all' 
    ? alerts 
    : alerts?.filter(alert => alert?.severity === selectedSeverity);

  return (
    <div className="bg-card rounded-lg p-6 border border-border h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="Bell" size={20} />
            Emotion-Based Alerts
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            High frustration and anger detection
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={14} />
          <span>Live</span>
        </div>
      </div>
     <div className="divide-y divide-border max-h-[383px] overflow-y-auto">
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {filteredAlerts?.map((alert) => {
          const severityConfig = getSeverityConfig(alert?.severity);
          const statusConfig = getStatusConfig(alert?.status);

          return (
            <div
              key={alert?.id}
              className={`p-4 rounded-lg border ${severityConfig?.border} ${severityConfig?.bg} hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon name={severityConfig?.icon} size={16} className={severityConfig?.color} />
                  <span className={`text-xs font-semibold uppercase ${severityConfig?.color}`}>
                    {alert?.emotion} Customer
                  </span>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig?.bg} ${statusConfig?.color}`}>
                  {statusConfig?.label}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{alert?.customer}</h3>
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Emotion Score:</span>
                  <span className={`font-medium ${alert?.sentiment < 30 ? 'text-red-600' : 'text-amber-600'}`}>
                    {alert?.emotion} ({alert?.sentiment}%)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Interaction:</span>
                  <span className="font-medium text-foreground">{alert?.interaction}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium text-foreground">
                    {new Date(alert.timestamp)?.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
              <div className="mb-3 p-3 bg-background/50 rounded border border-border">
                <p className="text-xs text-muted-foreground mb-1">Issue:</p>
                <p className="text-xs text-foreground">{alert?.issue}</p>
              </div>
              <div className="mb-3 p-3 bg-primary/5 rounded border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                  <Icon name="Lightbulb" size={12} />
                  Recommended Action:
                </p>
                <p className="text-xs text-foreground">{alert?.recommendedAction}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="default" size="xs" iconName="Eye" fullWidth>
                  View Details
                </Button>
                
              </div>
            </div>
          );
        })}
      </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="ghost" size="sm" iconName="RefreshCw" fullWidth>
          Refresh Alerts
        </Button>
      </div>
    </div>
  );
};

export default SentimentAlertFeed;