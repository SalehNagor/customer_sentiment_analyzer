import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendAlertWidget = () => {
  // Mock data for rising topics and trend alerts
  const trendAlerts = [
    {
      id: 1,
      topic: 'Login Failure',
      icon: 'AlertTriangle',
      severity: 'critical',
      change: '+340%',
      timeframe: 'last hour',
      count: 47,
      color: 'rose',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      textColor: 'text-rose-400'
    },
    {
      id: 2,
      topic: 'Payment Declined',
      icon: 'CreditCard',
      severity: 'high',
      change: '+180%',
      timeframe: 'last 2 hours',
      count: 32,
      color: 'orange',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-400'
    },
    {
      id: 3,
      topic: 'App Crashes',
      icon: 'Bug',
      severity: 'high',
      change: '+156%',
      timeframe: 'last 3 hours',
      count: 28,
      color: 'orange',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      textColor: 'text-orange-400'
    },
    {
      id: 4,
      topic: 'Refund Requests',
      icon: 'DollarSign',
      severity: 'medium',
      change: '+89%',
      timeframe: 'last 4 hours',
      count: 19,
      color: 'amber',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400'
    },
    {
      id: 5,
      topic: 'Feature Questions',
      icon: 'HelpCircle',
      severity: 'low',
      change: '+45%',
      timeframe: 'last 6 hours',
      count: 12,
      color: 'blue',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400'
    }
  ];

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertOctagon';
      case 'high':
        return 'AlertTriangle';
      case 'medium':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Rising Topics</h3>
          <p className="text-slate-400 text-sm">Real-time trend alerts</p>
        </div>
        <div className="bg-rose-500/20 rounded-full p-2">
          <Icon name="TrendingUp" size={20} className="text-rose-400" />
        </div>
      </div>

      <div className="space-y-3">
        {trendAlerts?.map((alert) => (
          <div 
            key={alert?.id}
            className={`${alert?.bgColor} ${alert?.borderColor} border rounded-lg p-4 hover:shadow-lg transition-all duration-200 cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`${alert?.bgColor} rounded-lg p-2`}>
                  <Icon name={alert?.icon} size={18} className={alert?.textColor} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{alert?.topic}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {alert?.count} mentions in {alert?.timeframe}
                  </p>
                </div>
              </div>
              <Icon name={getSeverityIcon(alert?.severity)} size={16} className={alert?.textColor} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`${alert?.textColor} text-sm font-bold`}>
                  {alert?.change}
                </span>
                <span className="text-slate-500 text-xs">spike detected</span>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-semibold ${alert?.textColor} ${alert?.bgColor}`}>
                {alert?.severity?.toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Last updated</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300 font-medium">Live</span>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2">
        <Icon name="Filter" size={16} />
        Configure Alerts
      </button>
    </div>
  );
};

export default TrendAlertWidget;