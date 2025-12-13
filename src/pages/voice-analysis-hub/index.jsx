import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import RecordingInterface from './components/RecordingInterface';
import FileUploadZone from './components/FileUploadZone';
import RecentAnalysis from './components/RecentAnalysis';



const VoiceAnalysisHub = () => {
  const [queueItems, setQueueItems] = useState([]);
  const [completedAnalyses, setCompletedAnalyses] = useState([
    {
      id: 'analysis_001',
      fileName: 'customer_call_2025-12-04_morning.wav',
      sentiment: 'Positive',
      sentimentScore: 87,
      completedAt: new Date(Date.now() - 3600000),
      duration: '3:45',
      confidence: 94,
      transcript: 'Thank you so much for your help today. The service was excellent and I really appreciate how quickly you resolved my issue. I will definitely recommend your company to my friends and family.'
    },
    {
      id: 'analysis_002',
      fileName: 'support_interaction_dec03.mp3',
      sentiment: 'Neutral',
      sentimentScore: 62,
      completedAt: new Date(Date.now() - 7200000),
      duration: '5:12',
      confidence: 89,
      transcript: 'I called to inquire about my account status. The representative provided the information I needed. The process was straightforward and took about five minutes to complete.'
    },
    {
      id: 'analysis_003',
      fileName: 'feedback_session_client_a.m4a',
      sentiment: 'Negative',
      sentimentScore: 34,
      completedAt: new Date(Date.now() - 10800000),
      duration: '2:28',
      confidence: 91,
      transcript: 'I am very disappointed with the service I received. The wait time was unacceptable and my issue was not resolved properly. This is not what I expected from your company.'
    },
    {
      id: 'analysis_004',
      fileName: 'product_review_recording.wav',
      sentiment: 'Positive',
      sentimentScore: 78,
      completedAt: new Date(Date.now() - 14400000),
      duration: '4:33',
      confidence: 87,
      transcript: 'The product quality is good and meets my expectations. Delivery was on time and the packaging was secure. Overall, I am satisfied with my purchase and would consider buying again.'
    }
  ]);

  const handleRecordingComplete = (recording) => {
    const newItem = {
      ...recording,
      progress: 0,
      status: 'processing'
    };
    setQueueItems(prev => [newItem, ...prev]);
  };

  const handleFilesAdded = (file) => {
    const newItem = {
      ...file,
      progress: 0,
      status: 'processing'
    };
    setQueueItems(prev => [newItem, ...prev]);
  };

  const handleItemComplete = (completedItem) => {
    setQueueItems(prev => 
      prev?.map(item => 
        item?.id === completedItem?.id ? completedItem : item
      )
    );

    const analysis = {
      id: completedItem?.id,
      fileName: completedItem?.fileName,
      sentiment: completedItem?.sentiment,
      sentimentScore: completedItem?.sentimentScore,
      completedAt: completedItem?.completedAt,
      duration: completedItem?.duration ? `${Math.floor(completedItem?.duration / 60)}:${(completedItem?.duration % 60)?.toString()?.padStart(2, '0')}` : '0:00',
      confidence: Math.floor(Math.random() * 15) + 85,
      transcript: 'This is a sample transcript generated from the audio analysis. The actual transcript would contain the full conversation text extracted from the audio file using speech-to-text technology.'
    };

    setCompletedAnalyses(prev => [analysis, ...prev]);
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Voice Analysis Hub</h1>
            <p className="text-muted-foreground">
              Record conversations or upload audio files for AI-powered sentiment analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <RecordingInterface onRecordingComplete={handleRecordingComplete} />
              <FileUploadZone onFilesAdded={handleFilesAdded} />
            </div>

            <div className="lg:col-span-7 flex">
              <RecentAnalysis analyses={completedAnalyses} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default VoiceAnalysisHub;