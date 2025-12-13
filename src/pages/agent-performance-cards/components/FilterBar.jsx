import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterBar = ({ onSearch, onDepartmentChange, onDateRangeChange, onReset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'sales', label: 'Sales' },
    { value: 'support', label: 'Customer Support' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing' }
  ];

  const dateRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleDepartmentChange = (e) => {
    const value = e?.target?.value;
    setDepartment(value);
    onDepartmentChange?.(value);
  };

  const handleDateRangeChange = (e) => {
    const value = e?.target?.value;
    setDateRange(value);
    onDateRangeChange?.(value);
  };

  const handleReset = () => {
    setSearchTerm('');
    setDepartment('all');
    setDateRange('7d');
    onReset?.();
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-1">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name="Search" size={18} color="rgb(148 163 184)" />
            </div>
            <Input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="md:col-span-1">
          <Select
            value={department}
            onChange={handleDepartmentChange}
            className="bg-slate-900 border-slate-700 text-white"
          >
            {departments?.map((dept) => (
              <option key={dept?.value} value={dept?.value} className="bg-slate-900 text-white">
                {dept?.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="md:col-span-1">
          <Select
            value={dateRange}
            onChange={handleDateRangeChange}
            className="bg-slate-900 border-slate-700 text-white"
          >
            {dateRanges?.map((range) => (
              <option key={range?.value} value={range?.value} className="bg-slate-900 text-white">
                {range?.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="md:col-span-1">
          <Button
            onClick={handleReset}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
          >
            <Icon name="RotateCcw" size={18} className="mr-2" />
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;