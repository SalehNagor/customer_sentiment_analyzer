import React from 'react';
import Select from '../../../components/ui/Select';


const GlobalControls = ({ 
  dateRange, 
  onDateRangeChange
}) => {
  const dateRangeOptions = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  
  

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1 min-w-[200px]">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={dateRange}
              onChange={onDateRangeChange}
            />
          </div>
          
          
        </div>

       
      </div>
    </div>
  );
};

export default GlobalControls;