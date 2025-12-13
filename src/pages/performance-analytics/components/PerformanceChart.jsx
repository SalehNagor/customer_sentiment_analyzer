import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const PerformanceChart = ({ data, metrics }) => {
  const [activeMetrics, setActiveMetrics] = useState(
    metrics?.reduce((acc, metric) => ({ ...acc, [metric?.key]: true }), {})
  );

  const toggleMetric = (key) => {
    setActiveMetrics(prev => ({ ...prev, [key]: !prev?.[key] }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium" style={{ color: entry?.color }}>
                {entry?.value?.toFixed(2)}{entry?.unit || ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Processing Performance Trends</h2>
        <div className="flex items-center gap-2">
          {metrics?.map(metric => (
            <button
              key={metric?.key}
              onClick={() => toggleMetric(metric?.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
                activeMetrics?.[metric?.key]
                  ? 'bg-primary/10 text-primary border border-primary/20' :'bg-muted text-muted-foreground border border-transparent hover:border-border'
              }`}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: metric?.color }} />
              <span>{metric?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {metrics?.map(metric => (
              <linearGradient key={metric?.key} id={`color${metric?.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={metric?.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={metric?.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="time" 
            stroke="var(--color-muted-foreground)" 
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="var(--color-muted-foreground)" 
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
            iconType="circle"
          />
          {metrics?.map(metric => (
            activeMetrics?.[metric?.key] && (
              <Area
                key={metric?.key}
                type="monotone"
                dataKey={metric?.key}
                name={metric?.label}
                stroke={metric?.color}
                fillOpacity={1}
                fill={`url(#color${metric?.key})`}
                strokeWidth={2}
                unit={metric?.unit || ''}
              />
            )
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;