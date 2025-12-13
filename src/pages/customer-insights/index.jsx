import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import FilterPanel from './components/FilterPanel';
import SentimentHeatmap from './components/SentimentHeatmap';
import SentimentAlertFeed from './components/SentimentAlertFeed';
import CustomerSentimentTable from './components/CustomerSentimentTable';
import TopicBubbleChart from './components/TopicBubbleChart';
import KeywordWordCloud from './components/KeywordWordCloud';
import TrendAlertWidget from './components/TrendAlertWidget';
import Icon from '../../components/AppIcon';

const CustomerInsights = () => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [filters, setFilters] = useState({
    segment: 'all',
    interactionType: 'all',
    sentimentThreshold: 'all',
    period: '30d'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', filters);
  };

  const handleResetFilters = () => {
    setFilters({
      segment: 'all',
      interactionType: 'all',
      sentimentThreshold: 'all',
      period: '30d'
    });
  };

  const metricsData = [
    {
      title: 'Customer Satisfaction Score',
      value: '78.5%',
      change: '+5.2%',
      changeType: 'positive',
      icon: 'Heart',
      iconColor: 'var(--color-success)'
    },
    {
      title: 'Sentiment Velocity',
      value: '+12.3%',
      change: '+3.1%',
      changeType: 'positive',
      icon: 'TrendingUp',
      iconColor: 'var(--color-primary)'
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Customer Insights</h1>
              <p className="text-muted-foreground">Strategic analytics for business decision-making with advanced filtering</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>Last updated: {lastUpdate?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
            {metricsData?.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500/20 rounded-lg p-2">
                <Icon name="BarChart3" size={24} className="text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Topic & Keyword Trends</h2>
                <p className="text-slate-400 text-sm">AI-powered analysis of recurring patterns across all processed calls</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <TopicBubbleChart />
              </div>
              <div className="lg:col-span-1">
                <TrendAlertWidget />
              </div>
            </div>

            <div className="mb-6">
              <KeywordWordCloud />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <SentimentHeatmap />
            </div>
            <div className="lg:col-span-1">
              <SentimentAlertFeed />
            </div>
          </div>

          

          <div>
            <CustomerSentimentTable />
          </div>
        </div>
      </main>
    </>
  );
};

export default CustomerInsights;