import React from 'react';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const LiveActivityFeed = ({ activities }) => {
  const navigate = useNavigate();

  const getSentimentBadge = (sentiment, confidence) => {
    const badges = {
      satisfied: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-600',
        icon: 'Smile',
        dot: 'bg-emerald-500'
      },
      neutral: {
        bg: 'bg-slate-500/10',
        text: 'text-slate-600',
        icon: 'Minus',
        dot: 'bg-slate-500'
      },
      frustrated: {
        bg: 'bg-amber-500/10',
        text: 'text-amber-600',
        icon: 'Frown',
        dot: 'bg-amber-500'
      },
      angry: {
        bg: 'bg-rose-500/10',
        text: 'text-rose-600',
        icon: 'AlertCircle',
        dot: 'bg-rose-500'
      }
    };

    const badge = badges?.[sentiment] || badges?.neutral;

    return (
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${badge?.bg}`}>
          <Icon name={badge?.icon} size={14} className={badge?.text} />
          <span className={`text-xs font-medium ${badge?.text} capitalize`}>
            {sentiment}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{confidence}%</span>
      </div>
    );
  };

  const getStatusBadge = (status) => {
    if (status === 'processing') {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10">
          <Icon name="Loader" size={14} className="text-blue-600 animate-spin" />
          <span className="text-xs font-medium text-blue-600">Processing ⚙️</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10">
        <Icon name="CheckCircle2" size={14} className="text-emerald-600" />
        <span className="text-xs font-medium text-emerald-600">Completed ✅</span>
      </div>
    );
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const handleCallClick = (callId) => {
    navigate(`/call-details/${callId}`);
  };

  return (
    <div className="bg-card border-2 border-border rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Recently Processed Queue</h2>
          <p className="text-sm text-muted-foreground mt-1">Latest completed and processing calls</p>
        </div>
      </div>
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar flex-grow">
        {activities?.map((activity) => (
          <div 
            key={activity?.id}
            onClick={() => handleCallClick(activity?.id)}
            className="p-4 bg-muted/30 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-150 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{activity?.customer}</p>
                  <p className="text-xs text-muted-foreground">{activity?.customerId}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{getTimeAgo(activity?.timestamp)}</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              {getStatusBadge(activity?.status)}
              {getSentimentBadge(activity?.sentiment, activity?.confidence)}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {activity?.transcript}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                <span>{activity?.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveActivityFeed;