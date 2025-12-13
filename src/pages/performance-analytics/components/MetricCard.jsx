import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, unit, change, changeType, icon, iconColor, threshold }) => {
  const getStatusColor = () => {
    if (!threshold) return 'text-foreground';
    
    const numValue = parseFloat(value);
    if (changeType === 'positive') {
      return numValue >= threshold ? 'text-success' : 'text-warning';
    }
    return numValue <= threshold ? 'text-success' : 'text-error';
  };

  const getChangeColor = () => {
    if (changeType === 'positive') {
      return change >= 0 ? 'text-success' : 'text-error';
    }
    return change <= 0 ? 'text-success' : 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-all duration-150 hover:border-primary/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
            <Icon name={icon} size={20} color={iconColor} />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${getChangeColor()}`}>
            <Icon name={change >= 0 ? 'TrendingUp' : 'TrendingDown'} size={14} />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold ${getStatusColor()}`}>{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
};

export default MetricCard;