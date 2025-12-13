import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SentimentTimelineChart = ({ data }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm text-muted-foreground capitalize">{entry?.name}:</span>
              <span className="text-sm font-medium text-foreground">{entry?.value}%</span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {payload?.[0]?.payload?.interactions} interactions
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border-2 border-border rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Real-Time Emotion Timeline</h2>
          <p className="text-sm text-muted-foreground mt-1">Customer emotion patterns throughout the day</p>
        </div>
      </div>
      <div className="w-full h-80 flex-grow" aria-label="Emotion Timeline Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            onMouseMove={(e) => e && e?.activePayload && setHoveredPoint(e?.activePayload?.[0])}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{ value: 'Emotion Score (%)', angle: -90, position: 'insideLeft', style: { fill: 'var(--color-muted-foreground)' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <Line 
              type="monotone" 
              dataKey="satisfied" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
              name="Satisfied"
            />
            <Line 
              type="monotone" 
              dataKey="neutral" 
              stroke="#64748b" 
              strokeWidth={2}
              dot={{ fill: '#64748b', r: 4 }}
              activeDot={{ r: 6 }}
              name="Neutral"
            />
            <Line 
              type="monotone" 
              dataKey="frustrated" 
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={{ fill: '#f59e0b', r: 4 }}
              activeDot={{ r: 6 }}
              name="Frustrated"
            />
            <Line 
              type="monotone" 
              dataKey="angry" 
              stroke="#f43f5e" 
              strokeWidth={2}
              dot={{ fill: '#f43f5e', r: 4 }}
              activeDot={{ r: 6 }}
              name="Angry"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SentimentTimelineChart;