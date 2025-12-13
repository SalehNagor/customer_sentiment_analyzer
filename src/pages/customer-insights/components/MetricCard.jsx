import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, iconColor }) => {
  const isPositive = changeType === 'positive';
  const isNegative = changeType === 'negative';
  const isNeutral = changeType === 'neutral';

  return (
    <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
          <Icon name={icon} size={24} color={iconColor || 'var(--color-primary)'} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
          isPositive ? 'bg-success/10 text-success' : isNegative ?'bg-destructive/10 text-destructive': 'bg-muted text-muted-foreground'
        }`}>
          <Icon 
            name={isPositive ? 'TrendingUp' : isNegative ? 'TrendingDown' : 'Minus'} 
            size={14} 
          />
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </div>
  );
};

export default MetricCard;