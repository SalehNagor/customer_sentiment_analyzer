import React, { useState } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';

const SentimentHeatmap = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Helper function to randomly distribute negative emotions
  const getEmotionLabel = (sentiment) => {
    if (sentiment >= 70) return 'Satisfied';
    if (sentiment >= 50) return 'Neutral';
    // Randomly distribute between Frustrated and Angry for negative sentiment
    return Math.random() > 0.5 ? 'Frustrated' : 'Angry';
  };

  const heatmapData = [
    { hour: '00:00', day: 'Mon', sentiment: 72, interactions: 45, emotion: 'Satisfied' },
    { hour: '04:00', day: 'Mon', sentiment: 68, interactions: 32, emotion: 'Neutral' },
    { hour: '08:00', day: 'Mon', sentiment: 85, interactions: 120, emotion: 'Satisfied' },
    { hour: '12:00', day: 'Mon', sentiment: 78, interactions: 95, emotion: 'Satisfied' },
    { hour: '16:00', day: 'Mon', sentiment: 65, interactions: 88, emotion: 'Neutral' },
    { hour: '20:00', day: 'Mon', sentiment: 58, interactions: 42, emotion: 'Neutral' },
    { hour: '00:00', day: 'Tue', sentiment: 70, interactions: 38, emotion: 'Satisfied' },
    { hour: '04:00', day: 'Tue', sentiment: 66, interactions: 28, emotion: 'Neutral' },
    { hour: '08:00', day: 'Tue', sentiment: 82, interactions: 115, emotion: 'Satisfied' },
    { hour: '12:00', day: 'Tue', sentiment: 76, interactions: 102, emotion: 'Satisfied' },
    { hour: '16:00', day: 'Tue', sentiment: 62, interactions: 85, emotion: 'Neutral' },
    { hour: '20:00', day: 'Tue', sentiment: 55, interactions: 45, emotion: 'Neutral' },
    { hour: '00:00', day: 'Wed', sentiment: 35, interactions: 52, emotion: 'Angry' },
    { hour: '04:00', day: 'Wed', sentiment: 42, interactions: 35, emotion: 'Frustrated' },
    { hour: '08:00', day: 'Wed', sentiment: 88, interactions: 125, emotion: 'Satisfied' },
    { hour: '12:00', day: 'Wed', sentiment: 80, interactions: 110, emotion: 'Satisfied' },
    { hour: '16:00', day: 'Wed', sentiment: 68, interactions: 92, emotion: 'Neutral' },
    { hour: '20:00', day: 'Wed', sentiment: 60, interactions: 48, emotion: 'Neutral' },
    { hour: '00:00', day: 'Thu', sentiment: 73, interactions: 40, emotion: 'Satisfied' },
    { hour: '04:00', day: 'Thu', sentiment: 69, interactions: 30, emotion: 'Neutral' },
    { hour: '08:00', day: 'Thu', sentiment: 86, interactions: 118, emotion: 'Satisfied' },
    { hour: '12:00', day: 'Thu', sentiment: 79, interactions: 105, emotion: 'Satisfied' },
    { hour: '16:00', day: 'Thu', sentiment: 64, interactions: 90, emotion: 'Neutral' },
    { hour: '20:00', day: 'Thu', sentiment: 57, interactions: 44, emotion: 'Neutral' },
    { hour: '00:00', day: 'Fri', sentiment: 75, interactions: 48, emotion: 'Satisfied' },
    { hour: '04:00', day: 'Fri', sentiment: 71, interactions: 33, emotion: 'Satisfied' },
    { hour: '08:00', day: 'Fri', sentiment: 90, interactions: 130, emotion: 'Satisfied' },
    { hour: '12:00', day: 'Fri', sentiment: 83, interactions: 115, emotion: 'Satisfied' },
    { hour: '16:00', day: 'Fri', sentiment: 70, interactions: 95, emotion: 'Satisfied' },
    { hour: '20:00', day: 'Fri', sentiment: 62, interactions: 50, emotion: 'Neutral' },
    { hour: '00:00', day: 'Sat', sentiment: 28, interactions: 35, emotion: 'Angry' },
    { hour: '08:00', day: 'Sat', sentiment: 45, interactions: 55, emotion: 'Frustrated' }
  ];

  const getEmotionColor = (sentiment) => {
    if (sentiment >= 70) return '#10B981'; // Emerald for Satisfied
    if (sentiment >= 50) return '#64748b'; // Slate for Neutral
    if (sentiment >= 30) return '#F59E0B'; // Amber for Frustrated
    return '#EF4444'; // Rose/Red for Angry
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-foreground mb-2">
            {data?.day} at {data?.hour}
          </p>
          <div className="space-y-1 text-xs">
            <p className="text-muted-foreground">
              Sentiment Score: <span className="text-foreground font-medium">{data?.sentiment}%</span>
            </p>
            <p className="text-muted-foreground">
              Interactions: <span className="text-foreground font-medium">{data?.interactions}</span>
            </p>
            <p className="text-muted-foreground">
              Emotion: <span className="text-foreground font-medium">{data?.emotion}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="Activity" size={20} />
            Sentiment Heatmap
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customer emotion patterns across time periods and interaction types
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              selectedPeriod === 'week' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              selectedPeriod === 'month' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Month
          </button>
        </div>
      </div>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              type="category" 
              dataKey="hour" 
              name="Time"
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              stroke="var(--color-border)"
            />
            <YAxis 
              type="category" 
              dataKey="day" 
              name="Day"
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              stroke="var(--color-border)"
            />
            <ZAxis type="number" dataKey="interactions" range={[50, 400]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={heatmapData} shape="circle">
              {heatmapData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getEmotionColor(entry?.sentiment)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-xs text-muted-foreground">Satisfied (≥70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-500"></div>
          <span className="text-xs text-muted-foreground">Neutral (50-69%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-xs text-muted-foreground">Frustrated (30-49%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-600"></div>
          <span className="text-xs text-muted-foreground">Angry (&lt;30%)</span>
        </div>
      </div>
    </div>
  );
};

export default SentimentHeatmap;