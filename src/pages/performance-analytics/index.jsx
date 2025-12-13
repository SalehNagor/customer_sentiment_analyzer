import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import PerformanceChart from './components/PerformanceChart';
import SystemHealthGauge from './components/SystemHealthGauge';



const PerformanceAnalytics = () => {
  const [lastUpdate, setLastUpdate] = useState('just now');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const seconds = now?.getSeconds();
      setLastUpdate(`${seconds}s ago`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const kpiMetrics = [
    {
      title: "Processing Speed",
      value: "2.3",
      unit: "sec/file",
      change: -12,
      changeType: "negative",
      icon: "Zap",
      iconColor: "var(--color-primary)",
      threshold: 3.0
    },
    {
      title: "Transcription Confidence",
      value: "96.8",
      unit: "%",
      change: 2.4,
      changeType: "positive",
      icon: "Target",
      iconColor: "var(--color-success)",
      threshold: 95.0
    },
    {
      title: "Sentiment Confidence",
      value: "94.2",
      unit: "%",
      change: 1.8,
      changeType: "positive",
      icon: "TrendingUp",
      iconColor: "var(--color-warning)",
      threshold: 90.0
    },
    {
      title: "Script Adherence Rate",
      value: "91.5",
      unit: "%",
      change: 3.2,
      changeType: "positive",
      icon: "ClipboardCheck",
      iconColor: "var(--color-success)",
      threshold: 85.0
    }
  ];

  const chartData = [
    { time: "00:00", filesUploaded: 156, filesProcessed: 145, accuracy: 96.2, scriptAdherence: 89.5 },
    { time: "04:00", filesUploaded: 95, filesProcessed: 89, accuracy: 96.5, scriptAdherence: 90.2 },
    { time: "08:00", filesUploaded: 342, filesProcessed: 312, accuracy: 95.8, scriptAdherence: 88.7 },
    { time: "12:00", filesUploaded: 468, filesProcessed: 428, accuracy: 96.1, scriptAdherence: 91.8 },
    { time: "16:00", filesUploaded: 421, filesProcessed: 389, accuracy: 96.9, scriptAdherence: 92.4 },
    { time: "20:00", filesUploaded: 289, filesProcessed: 267, accuracy: 97.2, scriptAdherence: 93.1 },
    { time: "23:59", filesUploaded: 215, filesProcessed: 198, accuracy: 96.8, scriptAdherence: 91.5 }
  ];

  const chartMetrics = [
    { key: "filesUploaded", label: "Files Uploaded", color: "var(--color-primary)", unit: " files" },
    { key: "filesProcessed", label: "Files Processed", color: "var(--color-success)", unit: " files" },
    { key: "accuracy", label: "Accuracy", color: "var(--color-warning)", unit: "%" },
    { key: "scriptAdherence", label: "Script Adherence", color: "#8b5cf6", unit: "%" }
  ];
    const systemHealthData = [
    {
      title: "Memory",
      value: 12.4,
      max: 16,
      unit: "GB",
      icon: "HardDrive",
      thresholds: { warning: 75, critical: 90 }
    },
    {
      title: "API Response",
      value: 142,
      max: 500,
      unit: "ms",
      icon: "Gauge",
      thresholds: { warning: 60, critical: 80 }
    }
  ];
 
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Post-Call Performance Analytics</h1>
              <p className="text-muted-foreground">Batch processing monitoring for system efficiency and AI model accuracy</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpiMetrics?.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            <div className="lg:col-span-9">
              <PerformanceChart data={chartData} metrics={chartMetrics} />
            </div>
            <div className="lg:col-span-3 space-y-4">
              {systemHealthData?.map((health, index) => (
                <SystemHealthGauge key={index} {...health} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PerformanceAnalytics;