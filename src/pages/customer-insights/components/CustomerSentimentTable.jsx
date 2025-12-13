import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerSentimentTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const customerData = [
    {
      id: 1,
      customer: 'Acme Corporation',
      segment: 'Enterprise',
      sentiment: 28,
      emotion: 'Angry',
      trend: 'down',
      trendValue: -15,
      interactions: 24,
      lastInteraction: '2025-12-04 09:45:00',
      interactionType: 'Support Call',
      avgResponseTime: '2.5 hours',
      satisfaction: 2.1
    },
    {
      id: 2,
      customer: 'TechStart Inc.',
      segment: 'SMB',
      sentiment: 85,
      emotion: 'Satisfied',
      trend: 'up',
      trendValue: 12,
      interactions: 18,
      lastInteraction: '2025-12-04 09:12:00',
      interactionType: 'Feedback Session',
      avgResponseTime: '1.2 hours',
      satisfaction: 4.5
    },
    {
      id: 3,
      customer: 'Global Solutions Ltd.',
      segment: 'Enterprise',
      sentiment: 72,
      emotion: 'Satisfied',
      trend: 'stable',
      trendValue: 2,
      interactions: 32,
      lastInteraction: '2025-12-04 08:30:00',
      interactionType: 'Sales Call',
      avgResponseTime: '3.1 hours',
      satisfaction: 3.8
    },
    {
      id: 4,
      customer: 'Innovation Labs',
      segment: 'SMB',
      sentiment: 38,
      emotion: 'Frustrated',
      trend: 'down',
      trendValue: -8,
      interactions: 15,
      lastInteraction: '2025-12-04 07:45:00',
      interactionType: 'Onboarding Call',
      avgResponseTime: '4.2 hours',
      satisfaction: 2.5
    },
    {
      id: 5,
      customer: 'Digital Ventures',
      segment: 'Individual',
      sentiment: 92,
      emotion: 'Satisfied',
      trend: 'up',
      trendValue: 18,
      interactions: 8,
      lastInteraction: '2025-12-04 07:20:00',
      interactionType: 'Support Call',
      avgResponseTime: '0.8 hours',
      satisfaction: 4.8
    },
    {
      id: 6,
      customer: 'Enterprise Systems Co.',
      segment: 'Enterprise',
      sentiment: 22,
      emotion: 'Angry',
      trend: 'down',
      trendValue: -22,
      interactions: 45,
      lastInteraction: '2025-12-04 08:05:00',
      interactionType: 'Support Call',
      avgResponseTime: '5.5 hours',
      satisfaction: 1.8
    },
    {
      id: 7,
      customer: 'CloudTech Partners',
      segment: 'SMB',
      sentiment: 78,
      emotion: 'Satisfied',
      trend: 'up',
      trendValue: 6,
      interactions: 22,
      lastInteraction: '2025-12-03 16:30:00',
      interactionType: 'Sales Call',
      avgResponseTime: '2.0 hours',
      satisfaction: 4.1
    },
    {
      id: 8,
      customer: 'StartupHub Inc.',
      segment: 'Individual',
      sentiment: 65,
      emotion: 'Neutral',
      trend: 'stable',
      trendValue: 1,
      interactions: 12,
      lastInteraction: '2025-12-03 15:45:00',
      interactionType: 'Feedback Session',
      avgResponseTime: '1.5 hours',
      satisfaction: 3.5
    },
    {
      id: 9,
      customer: 'MegaCorp Industries',
      segment: 'Enterprise',
      sentiment: 88,
      emotion: 'Satisfied',
      trend: 'up',
      trendValue: 14,
      interactions: 38,
      lastInteraction: '2025-12-03 14:20:00',
      interactionType: 'Support Call',
      avgResponseTime: '1.8 hours',
      satisfaction: 4.6
    },
    {
      id: 10,
      customer: 'SmallBiz Solutions',
      segment: 'SMB',
      sentiment: 45,
      emotion: 'Frustrated',
      trend: 'down',
      trendValue: -5,
      interactions: 19,
      lastInteraction: '2025-12-03 13:10:00',
      interactionType: 'Onboarding Call',
      avgResponseTime: '3.5 hours',
      satisfaction: 2.8
    }
  ];

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'Satisfied':
        return 'text-emerald-600';
      case 'Neutral':
        return 'text-slate-600';
      case 'Frustrated':
        return 'text-amber-600';
      case 'Angry':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const getEmotionBg = (emotion) => {
    switch (emotion) {
      case 'Satisfied':
        return 'bg-emerald-500/10';
      case 'Neutral':
        return 'bg-slate-500/10';
      case 'Frustrated':
        return 'bg-amber-500/10';
      case 'Angry':
        return 'bg-red-600/10';
      default:
        return 'bg-muted';
    }
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment >= 70) return 'text-success';
    if (sentiment >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getSentimentBg = (sentiment) => {
    if (sentiment >= 70) return 'bg-success/10';
    if (sentiment >= 40) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const filteredData = customerData?.filter(customer =>
    customer?.customer?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    customer?.segment?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    customer?.interactionType?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const sortedData = [...filteredData]?.sort((a, b) => {
    if (sortConfig?.direction === 'asc') {
      return a?.[sortConfig?.key] > b?.[sortConfig?.key] ? 1 : -1;
    }
    return a?.[sortConfig?.key] < b?.[sortConfig?.key] ? 1 : -1;
  });

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData?.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="Users" size={20} />
            Customer Sentiment Details
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Individual customer drill-down with sorting and filtering
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            type="search"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-64"
          />
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                <button
                  onClick={() => handleSort('customer')}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  Customer
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                <button
                  onClick={() => handleSort('segment')}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  Segment
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                <button
                  onClick={() => handleSort('emotion')}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  Emotion
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                <button
                  onClick={() => handleSort('sentiment')}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  Score
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                Trend
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                <button
                  onClick={() => handleSort('interactions')}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  Interactions
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                Last Interaction
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                <button
                  onClick={() => handleSort('satisfaction')}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  Satisfaction
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((customer) => (
              <tr key={customer?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Building2" size={18} color="var(--color-primary)" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{customer?.customer}</p>
                      <p className="text-xs text-muted-foreground">{customer?.interactionType}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
                    {customer?.segment}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEmotionBg(customer?.emotion)} ${getEmotionColor(customer?.emotion)}`}>
                    {customer?.emotion}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-foreground font-medium">{customer?.sentiment}%</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <Icon 
                      name={customer?.trend === 'up' ? 'TrendingUp' : customer?.trend === 'down' ? 'TrendingDown' : 'Minus'} 
                      size={16}
                      className={customer?.trend === 'up' ? 'text-success' : customer?.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}
                    />
                    <span className={`text-sm font-medium ${customer?.trend === 'up' ? 'text-success' : customer?.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                      {customer?.trendValue > 0 ? '+' : ''}{customer?.trendValue}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-foreground">{customer?.interactions}</span>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm text-foreground">
                      {new Date(customer.lastInteraction)?.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(customer.lastInteraction)?.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={14} className="text-warning" fill="currentColor" />
                    <span className="text-sm font-medium text-foreground">{customer?.satisfaction}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-md hover:bg-muted transition-colors" title="View Details">
                      <Icon name="Eye" size={16} className="text-muted-foreground" />
                    </button>
                    <button className="p-2 rounded-md hover:bg-muted transition-colors" title="Contact">
                      <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData?.length)} of {sortedData?.length} customers
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)?.map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-md text-sm font-medium transition-all ${
                  currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            iconPosition="right"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSentimentTable;