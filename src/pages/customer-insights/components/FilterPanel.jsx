import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFilterChange, onApplyFilters, onResetFilters }) => {
  const segmentOptions = [
    { value: 'all', label: 'All Customers' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'smb', label: 'Small & Medium Business' },
    { value: 'individual', label: 'Individual' },
    { value: 'trial', label: 'Trial Users' }
  ];

  const interactionOptions = [
    { value: 'all', label: 'All Interactions' },
    { value: 'support', label: 'Support Calls' },
    { value: 'sales', label: 'Sales Conversations' },
    { value: 'feedback', label: 'Feedback Sessions' },
    { value: 'onboarding', label: 'Onboarding Calls' }
  ];

  const sentimentOptions = [
    { value: 'all', label: 'All Sentiments' },
    { value: 'positive', label: 'Positive (≥70%)' },
    { value: 'neutral', label: 'Neutral (40-69%)' },
    { value: 'negative', label: 'Negative (<40%)' }
  ];

  const periodOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 border border-border mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Filter" size={20} />
          Advanced Filters
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          iconName="RotateCcw"
          onClick={onResetFilters}
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Customer Segment"
          options={segmentOptions}
          value={filters?.segment}
          onChange={(value) => onFilterChange('segment', value)}
          placeholder="Select segment"
        />

        <Select
          label="Interaction Type"
          options={interactionOptions}
          value={filters?.interactionType}
          onChange={(value) => onFilterChange('interactionType', value)}
          placeholder="Select type"
        />

        <Select
          label="Sentiment Threshold"
          options={sentimentOptions}
          value={filters?.sentimentThreshold}
          onChange={(value) => onFilterChange('sentimentThreshold', value)}
          placeholder="Select threshold"
        />

        <Select
          label="Time Period"
          options={periodOptions}
          value={filters?.period}
          onChange={(value) => onFilterChange('period', value)}
          placeholder="Select period"
        />
      </div>
      <div className="flex items-center justify-end gap-3">
        
        <Button 
          variant="default" 
          size="sm"
          iconName="Search"
          onClick={onApplyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;