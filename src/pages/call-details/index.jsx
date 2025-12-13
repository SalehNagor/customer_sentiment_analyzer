import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CallDetails = () => {
  const { callId } = useParams();
  const navigate = useNavigate();

  const callData = {
    id: callId || "1",
    customer: "Sarah Mitchell",
    customerId: "CUST-2847",
    agent: "John Smith",
    agentId: "AGT-1234",
    sentiment: "satisfied",
    confidence: 94,
    timestamp: new Date(Date.now() - 120000),
    duration: "3:45",
    format: "MP3",
    status: "completed"
  };

  const aiSummary = "Customer contacted support regarding billing discrepancy on recent invoice. Agent verified account details, identified system error that caused double-charge, processed immediate refund, and provided confirmation number. Customer expressed satisfaction with quick resolution. No escalation required.";

  const talkRatioData = [
    { speaker: 'Agent', percentage: 40, color: '#3b82f6' },
    { speaker: 'Customer', percentage: 60, color: '#64748b' }
  ];

  const smartTopics = [
    { tag: "#Billing", icon: "DollarSign" },
    { tag: "#Refund", icon: "RefreshCw" },
    { tag: "#AccountIssue", icon: "AlertCircle" }
  ];

  const qaChecklist = [
    { 
      item: "Opening Greeting",
      description: "Verified standard welcome phrase used",
      status: "pass",
      details: "Agent: 'Thank you for calling, this is John. How may I help you today?'"
    },
    { 
      item: "Closing Etiquette",
      description: "Proper call closure with confirmation",
      status: "pass",
      details: "Agent: 'Is there anything else I can help you with today? Thank you for calling.'"
    }
  ];

  const transcript = [
    {
      speaker: "agent",
      message: "Thank you for calling, this is John. How may I help you today?",
      sentiment: "neutral",
      timestamp: "00:00"
    },
    {
      speaker: "customer",
      message: "Hi, I noticed I was charged twice on my last bill. Can you help me with that?",
      sentiment: "frustrated",
      timestamp: "00:05"
    },
    {
      speaker: "agent",
      message: "I apologize for the inconvenience. Let me pull up your account right away and investigate this for you.",
      sentiment: "neutral",
      timestamp: "00:12"
    },
    {
      speaker: "customer",
      message: "Thank you, I appreciate your help.",
      sentiment: "neutral",
      timestamp: "00:20"
    },
    {
      speaker: "agent",
      message: "I can see the duplicate charge on your account. This appears to be a system error. I\'ll process an immediate refund for you.",
      sentiment: "neutral",
      timestamp: "00:35"
    },
    {
      speaker: "customer",
      message: "That\'s great! How long will it take for the refund to show up?",
      sentiment: "neutral",
      timestamp: "00:45"
    },
    {
      speaker: "agent",
      message: "The refund will appear in your account within 3-5 business days. Your confirmation number is REF-9287463.",
      sentiment: "neutral",
      timestamp: "00:52"
    },
    {
      speaker: "customer",
      message: "Perfect! Thank you so much for resolving this quickly.",
      sentiment: "satisfied",
      timestamp: "01:02"
    },
    {
      speaker: "agent",
      message: "You're very welcome! Is there anything else I can help you with today?",
      sentiment: "neutral",
      timestamp: "01:08"
    },
    {
      speaker: "customer",
      message: "No, that's all. Have a great day!",
      sentiment: "satisfied",
      timestamp: "01:12"
    },
    {
      speaker: "agent",
      message: "Thank you for calling. You have a great day as well!",
      sentiment: "neutral",
      timestamp: "01:16"
    }
  ];

  const getSentimentColor = (sentiment) => {
    const colors = {
      satisfied: 'bg-emerald-500',
      neutral: 'bg-slate-500',
      frustrated: 'bg-amber-500',
      angry: 'bg-rose-500'
    };
    return colors?.[sentiment] || colors?.neutral;
  };

  const getSentimentBadge = (sentiment) => {
    const badges = {
      satisfied: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', icon: 'Smile' },
      neutral: { bg: 'bg-slate-500/10', text: 'text-slate-600', icon: 'Minus' },
      frustrated: { bg: 'bg-amber-500/10', text: 'text-amber-600', icon: 'Frown' },
      angry: { bg: 'bg-rose-500/10', text: 'text-rose-600', icon: 'AlertCircle' }
    };
    const badge = badges?.[sentiment] || badges?.neutral;
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${badge?.bg}`}>
        <Icon name={badge?.icon} size={16} className={badge?.text} />
        <span className={`text-sm font-medium ${badge?.text} capitalize`}>{sentiment}</span>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-[1400px]">
          <div className="mb-6">
            <Button
              variant="ghost"
              iconName="ArrowLeft"
              iconPosition="left"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              Back to Dashboard
            </Button>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Call Details</h1>
                <p className="text-muted-foreground">Comprehensive analysis and transcript review</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" iconName="Download" iconPosition="left">
                  Export
                </Button>
                <Button variant="outline" iconName="Share2" iconPosition="left">
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Call Overview Card */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Customer</p>
                <p className="text-base font-semibold text-foreground">{callData?.customer}</p>
                <p className="text-xs text-muted-foreground">{callData?.customerId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Agent</p>
                <p className="text-base font-semibold text-foreground">{callData?.agent}</p>
                <p className="text-xs text-muted-foreground">{callData?.agentId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Overall Sentiment</p>
                {getSentimentBadge(callData?.sentiment)}
                <p className="text-xs text-muted-foreground mt-1">{callData?.confidence}% confidence</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Call Duration</p>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">{callData?.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Sparkles" size={20} className="text-primary" />
              <h2 className="text-xl font-semibold text-foreground">AI Summary</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{aiSummary}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Talk-to-Listen Ratio */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Talk-to-Listen Ratio</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={talkRatioData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis type="number" domain={[0, 100]} stroke="var(--color-muted-foreground)" />
                  <YAxis dataKey="speaker" type="category" stroke="var(--color-muted-foreground)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--color-card)', 
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => `${value}%`}
                  />
                  <Bar dataKey="percentage" radius={[0, 8, 8, 0]}>
                    {talkRatioData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Smart Topics */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Smart Topics</h3>
              <div className="flex flex-wrap gap-3">
                {smartTopics?.map((topic, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
                  >
                    <Icon name={topic?.icon} size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">{topic?.tag}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Topics detected using AI-powered intent recognition
                </p>
              </div>
            </div>

            {/* QA Checklist */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Script Compliance</h3>
              <div className="space-y-4">
                {qaChecklist?.map((check, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">{check?.item}</p>
                      {check?.status === 'pass' ? (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 rounded-full">
                          <Icon name="CheckCircle2" size={14} className="text-emerald-600" />
                          <span className="text-xs font-medium text-emerald-600">Pass ✅</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-rose-500/10 rounded-full">
                          <Icon name="XCircle" size={14} className="text-rose-600" />
                          <span className="text-xs font-medium text-rose-600">Fail ❌</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{check?.description}</p>
                    <div className="bg-muted/30 rounded p-2">
                      <p className="text-xs text-muted-foreground italic">{check?.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Conversation Transcript */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Conversation Transcript</h2>
            <div className="space-y-4">
              {transcript?.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message?.speaker === 'agent' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message?.speaker === 'customer' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message?.speaker === 'agent' ? 'bg-blue-500/10' : 'bg-slate-500/10'
                    }`}>
                      <Icon 
                        name={message?.speaker === 'agent' ? 'Headphones' : 'User'} 
                        size={20} 
                        className={message?.speaker === 'agent' ? 'text-blue-600' : 'text-slate-600'} 
                      />
                    </div>
                    <div className={`flex flex-col ${message?.speaker === 'customer' ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-foreground capitalize">
                          {message?.speaker === 'agent' ? 'Agent' : 'Customer'}
                        </span>
                        <span className="text-xs text-muted-foreground">{message?.timestamp}</span>
                      </div>
                      <div className={`relative px-4 py-3 rounded-lg ${
                        message?.speaker === 'agent' ?'bg-blue-500/10 border border-blue-500/20' :'bg-slate-700/50 border border-slate-600/20'
                      }`}>
                        <div className={`absolute w-2 h-2 rounded-full ${getSentimentColor(message?.sentiment)} top-2 ${
                          message?.speaker === 'agent' ? '-left-1' : '-right-1'
                        }`} />
                        <p className="text-sm text-foreground">{message?.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CallDetails;