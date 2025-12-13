import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import GlobalControls from './components/GlobalControls';
import SentimentTimelineChart from './components/SentimentTimelineChart';
import LiveActivityFeed from './components/LiveActivityFeed';
import SentimentDistributionChart from './components/SentimentDistributionChart';

const SentimentOverview = () => {
  const [dateRange, setDateRange] = useState('24h');

  const kpiData = [
    {
      title: "Overall Sentiment Score",
      value: "87.5%",
      change: "+5.2%",
      changeType: "positive",
      icon: "TrendingUp",
      sparklineData: [65, 70, 68, 75, 80, 85, 87, 90, 88, 87]
    },
    {
      title: "Files Processed Today",
      value: "2,847",
      change: "+12.3%",
      changeType: "positive",
      icon: "FileCheck",
      sparklineData: [60, 65, 70, 75, 80, 85, 90, 88, 92, 95]
    },
    {
      title: "Satisfaction Trend",
      value: "92.1%",
      change: "+3.8%",
      changeType: "positive",
      icon: "Heart",
      sparklineData: [70, 72, 75, 78, 80, 85, 88, 90, 91, 92]
    },
    {
      title: "Processing Accuracy",
      value: "98.7%",
      change: "-0.2%",
      changeType: "negative",
      icon: "Target",
      sparklineData: [95, 96, 97, 98, 99, 98, 99, 98, 99, 98]
    }
  ];

  const timelineData = [
    { time: "00:00", satisfied: 65, neutral: 20, frustrated: 10, angry: 5, interactions: 145 },
    { time: "03:00", satisfied: 60, neutral: 25, frustrated: 10, angry: 5, interactions: 98 },
    { time: "06:00", satisfied: 55, neutral: 28, frustrated: 12, angry: 5, interactions: 187 },
    { time: "09:00", satisfied: 70, neutral: 18, frustrated: 8, angry: 4, interactions: 342 },
    { time: "12:00", satisfied: 75, neutral: 15, frustrated: 7, angry: 3, interactions: 456 },
    { time: "15:00", satisfied: 78, neutral: 12, frustrated: 7, angry: 3, interactions: 523 },
    { time: "18:00", satisfied: 72, neutral: 16, frustrated: 8, angry: 4, interactions: 398 },
    { time: "21:00", satisfied: 68, neutral: 20, frustrated: 9, angry: 3, interactions: 276 }
  ];

  const liveActivities = [
    {
      id: 1,
      customer: "Sarah Mitchell",
      customerId: "CUST-2847",
      sentiment: "satisfied",
      confidence: 94,
      transcript: "The customer service representative was extremely helpful and resolved my issue quickly. I\'m very satisfied with the support I received today.",
      timestamp: new Date(Date.now() - 120000),
      duration: "3:45",
      status: "completed"
    },
    {
      id: 2,
      customer: "James Rodriguez",
      customerId: "CUST-2846",
      sentiment: "neutral",
      confidence: 78,
      transcript: "I called to inquire about my account status. The information provided was accurate, though I expected a bit more detail about the upcoming changes.",
      timestamp: new Date(Date.now() - 300000),
      duration: "2:18",
      status: "completed"
    },
    {
      id: 3,
      customer: "Emily Chen",
      customerId: "CUST-2845",
      sentiment: "frustrated",
      confidence: 91,
      transcript: "I\'ve been waiting for over 20 minutes and still haven\'t received a clear answer to my question. This is frustrating and unprofessional.",
      timestamp: new Date(Date.now() - 480000),
      duration: "5:32",
      status: "completed"
    },
    {
      id: 4,
      customer: "Michael Thompson",
      customerId: "CUST-2844",
      sentiment: "satisfied",
      confidence: 96,
      transcript: "Excellent experience! The agent went above and beyond to help me understand the new features. Very impressed with the level of service.",
      timestamp: new Date(Date.now() - 720000),
      duration: "4:12",
      status: "completed"
    },
    {
      id: 5,
      customer: "Lisa Anderson",
      customerId: "CUST-2843",
      sentiment: "satisfied",
      confidence: 89,
      transcript: "Quick resolution to my billing inquiry. The representative was knowledgeable and courteous throughout the entire conversation.",
      timestamp: new Date(Date.now() - 900000),
      duration: "2:56",
      status: "completed"
    },
    {
      id: 6,
      customer: "David Park",
      customerId: "CUST-2842",
      sentiment: "angry",
      confidence: 88,
      transcript: "This is absolutely unacceptable! I\'ve called three times about the same issue and still no resolution. I want to speak with a supervisor immediately!",
      timestamp: new Date(Date.now() - 1200000),
      duration: "4:45",
      status: "completed"
    },
    {
      id: 7,
      customer: "Jennifer White",
      customerId: "CUST-2841",
      sentiment: "neutral",
      confidence: 82,
      transcript: "Standard interaction about delivery timeframe. Information was provided as expected. No complaints but nothing exceptional either.",
      timestamp: new Date(Date.now() - 1500000),
      duration: "3:12",
      status: "processing"
    }
  ];

  const distributionData = [
    { name: "satisfied", value: 1850, percentage: 65.0 },
    { name: "neutral", value: 570, percentage: 20.0 },
    { name: "frustrated", value: 285, percentage: 10.0 },
    { name: "angry", value: 142, percentage: 5.0 }
  ];

  

  const handleDrillDown = (sentiment) => {
    console.log(`Drilling down into ${sentiment} sentiment transcripts`);
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-[1600px]">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Post-Call Analytics System</h1>
            <p className="text-muted-foreground">Batch processing sentiment monitoring and comprehensive call analysis dashboard</p>
          </div>

          <GlobalControls
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {kpiData?.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mb-6 items-stretch">
            <div className="lg:flex-[2]">
              <SentimentTimelineChart data={timelineData} />
            </div>
            <div className="lg:flex-[1]">
              <LiveActivityFeed activities={liveActivities} />
            </div>
          </div>

          <div className="mb-6">
            <SentimentDistributionChart 
              data={distributionData}
              onDrillDown={handleDrillDown}
            />
          </div>
        </div>
      </main>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--color-muted);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-primary);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--color-primary);
          opacity: 0.8;
        }
      `}</style>
    </>
  );
};

export default SentimentOverview;