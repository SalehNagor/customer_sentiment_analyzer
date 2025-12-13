import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentAnalysis = ({ analyses }) => {
  const getEmotionConfig = (sentiment) => {
    // Map sentiment scores to 4 emotion categories with colors
    if (sentiment >= 70) {
      return { label: 'Satisfied', color: 'text-emerald-600 bg-emerald-500/10' };
    } else if (sentiment >= 50) {
      return { label: 'Neutral', color: 'text-slate-600 bg-slate-500/10' };
    } else if (sentiment >= 30) {
      return { label: 'Frustrated', color: 'text-amber-600 bg-amber-500/10' };
    } else {
      return { label: 'Angry', color: 'text-red-600 bg-red-600/10' };
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(date)) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(date)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (analyses?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 h-full flex flex-col">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="History" size={32} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No recent analysis</h3>
          <p className="text-sm text-muted-foreground">
            Completed analyses will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
              <Icon name="History" size={20} color="var(--color-success)" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Recent Analysis</h2>
              <p className="text-sm text-muted-foreground">Last {analyses?.length} completed</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="ExternalLink">
            View All
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
        {analyses?.map((analysis) => {
          const emotionConfig = getEmotionConfig(analysis?.sentimentScore);
          
          return (
            <div key={analysis?.id} className="p-6 hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                  <Icon name="FileAudio" size={20} color="var(--color-primary)" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate mb-1">
                        {analysis?.fileName}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(analysis?.completedAt)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${emotionConfig?.color}`}>
                        {emotionConfig?.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {analysis?.sentimentScore}%
                      </span>
                    </div>
                  </div>

                  {analysis?.transcript && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {analysis?.transcript}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {analysis?.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Zap" size={12} />
                      {analysis?.confidence}% confidence
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <Button variant="outline" size="xs" iconName="Play">
                      Play
                    </Button>
                    <Button variant="outline" size="xs" iconName="FileText">
                      Transcript
                    </Button>
                    <Button variant="ghost" size="xs" iconName="Share2">
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentAnalysis;