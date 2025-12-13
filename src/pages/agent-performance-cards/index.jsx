import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import FilterBar from './components/FilterBar';
import AgentCard from './components/AgentCard';
import Icon from '../../components/AppIcon';

const AgentPerformanceCards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('7d');

  const agentsData = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Senior Support Agent',
      department: 'support',
      avatar: '/avatars/sarah.jpg',
      isOnline: true,
      ticketsSolved: 178,
      ticketsTrend: 15,
      fcrRate: 91,
      fcrTrend: 3,
      avgHandleTime: 7.2,
      openTickets: 3,
      performanceScore: 89,
      csatScore: 94
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Technical Support Lead',
      department: 'technical',
      avatar: '/avatars/michael.jpg',
      isOnline: true,
      ticketsSolved: 156,
      ticketsTrend: 8,
      fcrRate: 87,
      fcrTrend: -2,
      avgHandleTime: 9.5,
      openTickets: 7,
      performanceScore: 85,
      csatScore: 91
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Sales Agent',
      department: 'sales',
      avatar: '/avatars/emily.jpg',
      isOnline: false,
      ticketsSolved: 203,
      ticketsTrend: 22,
      fcrRate: 95,
      fcrTrend: 5,
      avgHandleTime: 5.8,
      openTickets: 2,
      performanceScore: 94,
      csatScore: 96
    },
    {
      id: 4,
      name: 'James Thompson',
      role: 'Support Agent',
      department: 'support',
      avatar: '/avatars/james.jpg',
      isOnline: true,
      ticketsSolved: 142,
      ticketsTrend: -5,
      fcrRate: 82,
      fcrTrend: -8,
      avgHandleTime: 11.3,
      openTickets: 15,
      performanceScore: 76,
      csatScore: 85
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'Billing Specialist',
      department: 'billing',
      avatar: '/avatars/lisa.jpg',
      isOnline: true,
      ticketsSolved: 167,
      ticketsTrend: 12,
      fcrRate: 89,
      fcrTrend: 4,
      avgHandleTime: 8.1,
      openTickets: 5,
      performanceScore: 88,
      csatScore: 92
    },
    {
      id: 6,
      name: 'David Park',
      role: 'Technical Support Agent',
      department: 'technical',
      avatar: '/avatars/david.jpg',
      isOnline: true,
      ticketsSolved: 189,
      ticketsTrend: 18,
      fcrRate: 93,
      fcrTrend: 6,
      avgHandleTime: 6.9,
      openTickets: 4,
      performanceScore: 92,
      csatScore: 95
    },
    {
      id: 7,
      name: 'Jennifer White',
      role: 'Customer Support Agent',
      department: 'support',
      avatar: '/avatars/jennifer.jpg',
      isOnline: false,
      ticketsSolved: 151,
      ticketsTrend: 7,
      fcrRate: 86,
      fcrTrend: 2,
      avgHandleTime: 9.8,
      openTickets: 6,
      performanceScore: 84,
      csatScore: 89
    },
    {
      id: 8,
      name: 'Robert Taylor',
      role: 'Sales Team Lead',
      department: 'sales',
      avatar: '/avatars/robert.jpg',
      isOnline: true,
      ticketsSolved: 195,
      ticketsTrend: 20,
      fcrRate: 92,
      fcrTrend: 7,
      avgHandleTime: 7.5,
      openTickets: 12,
      performanceScore: 90,
      csatScore: 94
    },
    {
      id: 9,
      name: 'Amanda Garcia',
      role: 'Support Agent',
      department: 'support',
      avatar: '/avatars/amanda.jpg',
      isOnline: true,
      ticketsSolved: 172,
      ticketsTrend: 14,
      fcrRate: 90,
      fcrTrend: 5,
      avgHandleTime: 7.8,
      openTickets: 3,
      performanceScore: 87,
      csatScore: 93
    },
    {
      id: 10,
      name: 'Kevin Martinez',
      role: 'Billing Agent',
      department: 'billing',
      avatar: '/avatars/kevin.jpg',
      isOnline: true,
      ticketsSolved: 159,
      ticketsTrend: 10,
      fcrRate: 88,
      fcrTrend: 3,
      avgHandleTime: 8.7,
      openTickets: 7,
      performanceScore: 86,
      csatScore: 90
    },
    {
      id: 11,
      name: 'Jessica Brown',
      role: 'Technical Support Agent',
      department: 'technical',
      avatar: '/avatars/jessica.jpg',
      isOnline: false,
      ticketsSolved: 181,
      ticketsTrend: 16,
      fcrRate: 91,
      fcrTrend: 4,
      avgHandleTime: 7.4,
      openTickets: 4,
      performanceScore: 89,
      csatScore: 92
    },
    {
      id: 12,
      name: 'Christopher Lee',
      role: 'Senior Sales Agent',
      department: 'sales',
      avatar: '/avatars/christopher.jpg',
      isOnline: true,
      ticketsSolved: 187,
      ticketsTrend: 19,
      fcrRate: 93,
      fcrTrend: 8,
      avgHandleTime: 6.5,
      openTickets: 5,
      performanceScore: 91,
      csatScore: 95
    }
  ];

  const filteredAgents = useMemo(() => {
    return agentsData?.filter((agent) => {
      const matchesSearch = agent?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                          agent?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || agent?.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [searchTerm, selectedDepartment, agentsData]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
  };

  const handleDateRangeChange = (range) => {
    setSelectedDateRange(range);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedDepartment('all');
    setSelectedDateRange('7d');
  };

  const handleViewDetails = (agent) => {
    console.log('View details for agent:', agent?.name);
  };

  

  const stats = useMemo(() => {
    const totalAgents = filteredAgents?.length || 0;
    const onlineAgents = filteredAgents?.filter(a => a?.isOnline)?.length || 0;
    const avgPerformance = totalAgents > 0
      ? Math.round(filteredAgents?.reduce((sum, a) => sum + (a?.performanceScore || 0), 0) / totalAgents)
      : 0;
    const totalTickets = filteredAgents?.reduce((sum, a) => sum + (a?.ticketsSolved || 0), 0) || 0;

    return { totalAgents, onlineAgents, avgPerformance, totalTickets };
  }, [filteredAgents]);

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-slate-900">
        <div className="container mx-auto p-6 max-w-[1600px]">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2 font-['Inter']">Agent Performance Cards</h1>
            <p className="text-slate-400 font-['Inter']">
              Comprehensive agent performance metrics and individual statistics dashboard
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600/10 rounded-lg">
                  <Icon name="Users" size={20} color="rgb(37 99 235)" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-['Inter']">Total Agents</p>
                  <p className="text-white text-2xl font-bold font-['Inter']">{stats?.totalAgents}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-emerald-500/10 rounded-lg">
                  <Icon name="UserCheck" size={20} color="rgb(16 185 129)" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-['Inter']">Online Now</p>
                  <p className="text-white text-2xl font-bold font-['Inter']">{stats?.onlineAgents}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600/10 rounded-lg">
                  <Icon name="TrendingUp" size={20} color="rgb(37 99 235)" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-['Inter']">Avg Performance</p>
                  <p className="text-white text-2xl font-bold font-['Inter']">{stats?.avgPerformance}%</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-10 h-10 bg-emerald-500/10 rounded-lg">
                  <Icon name="CheckCircle2" size={20} color="rgb(16 185 129)" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-['Inter']">Total Tickets Solved</p>
                  <p className="text-white text-2xl font-bold font-['Inter']">{stats?.totalTickets}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar
            onSearch={handleSearch}
            onDepartmentChange={handleDepartmentChange}
            onDateRangeChange={handleDateRangeChange}
            onReset={handleReset}
          />

          {/* Agent Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgents?.length > 0 ? (
              filteredAgents?.map((agent) => (
                <AgentCard
                  key={agent?.id}
                  agent={agent}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <Icon name="Search" size={48} color="rgb(148 163 184)" />
                <p className="text-slate-400 mt-4 font-['Inter']">No agents found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default AgentPerformanceCards;