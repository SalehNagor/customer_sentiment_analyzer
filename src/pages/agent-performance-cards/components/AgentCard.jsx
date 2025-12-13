import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AgentCard = ({ agent, onViewDetails }) => {
  const [isSelected] = useState(false);



  const getTrendIcon = (trend) => {
    if (trend > 0) return { name: 'TrendingUp', color: 'rgb(16 185 129)' };
    if (trend < 0) return { name: 'TrendingDown', color: 'rgb(239 68 68)' };
    return { name: 'Minus', color: 'rgb(148 163 184)' };
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-emerald-500';
    if (trend < 0) return 'text-rose-500';
    return 'text-slate-400';
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 20);
    const hasHalfStar = (rating % 20) >= 10;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)]?.map((_, index) => {
          if (index < fullStars) {
            return <Icon key={index} name="Star" size={14} color="rgb(234 179 8)" fill="rgb(234 179 8)" />;
          } else if (index === fullStars && hasHalfStar) {
            return <Icon key={index} name="Star" size={14} color="rgb(234 179 8)" fill="transparent" />;
          }
          return <Icon key={index} name="Star" size={14} color="rgb(71 85 105)" fill="transparent" />;
        })}
      </div>
    );
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-slate-600 transition-all duration-200">
      {/* Header with Avatar and Selection */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {agent?.name?.split(' ')?.map(n => n?.[0])?.join('')}
              </span>
            </div>
            {agent?.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-800"></div>
            )}
          </div>
          <div>
            <h3 className="text-white font-bold text-base">{agent?.name}</h3>
            <p className="text-slate-400 text-sm">{agent?.role}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="CheckCircle2" size={14} color="rgb(148 163 184)" />
            <span className="text-slate-400 text-xs">Tickets Solved</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold text-lg">{agent?.ticketsSolved}</span>
            <div className="flex items-center gap-1">
              <Icon {...getTrendIcon(agent?.ticketsTrend)} size={12} />
              <span className={`text-xs ${getTrendColor(agent?.ticketsTrend)}`}>
                {agent?.ticketsTrend > 0 ? '+' : ''}{agent?.ticketsTrend}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Target" size={14} color="rgb(148 163 184)" />
            <span className="text-slate-400 text-xs">FCR Rate</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold text-lg">{agent?.fcrRate}%</span>
            <div className="flex items-center gap-1">
              <Icon {...getTrendIcon(agent?.fcrTrend)} size={12} />
              <span className={`text-xs ${getTrendColor(agent?.fcrTrend)}`}>
                {agent?.fcrTrend > 0 ? '+' : ''}{agent?.fcrTrend}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Clock" size={14} color="rgb(148 163 184)" />
            <span className="text-slate-400 text-xs">Avg Handle Time</span>
          </div>
          <span className="text-white font-bold text-lg">{agent?.avgHandleTime}m</span>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Inbox" size={14} color="rgb(148 163 184)" />
            <span className="text-slate-400 text-xs">Open Tickets</span>
          </div>
          <span className="text-white font-bold text-lg">{agent?.openTickets}</span>
        </div>
      </div>
      {/* Performance Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-xs">7-Day Performance</span>
          <span className="text-white font-semibold text-sm">{agent?.performanceScore}%</span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${agent?.performanceScore}%` }}
          ></div>
        </div>
      </div>
      {/* Footer Section */}
      <div className="space-y-3 pt-3 border-t border-slate-700">
        {/* CSAT Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {renderStars(agent?.csatScore)}
            <span className="text-white font-semibold text-sm ml-1">{agent?.csatScore}%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-2">
          <Button
            onClick={() => onViewDetails?.(agent)}
            className="w-full bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;