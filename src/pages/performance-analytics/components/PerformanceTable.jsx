import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceTable = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig?.key) return data;

    return [...data]?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      const aString = String(aValue)?.toLowerCase();
      const bString = String(bValue)?.toLowerCase();
      
      if (sortConfig?.direction === 'asc') {
        return aString?.localeCompare(bString);
      }
      return bString?.localeCompare(aString);
    });
  }, [data, sortConfig]);

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ChevronsUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ChevronUp" size={14} className="text-primary" />
      : <Icon name="ChevronDown" size={14} className="text-primary" />;
  };

  const getStatusColor = (value, threshold, type) => {
    if (!threshold) return 'text-foreground';
    
    const numValue = parseFloat(value);
    if (type === 'positive') {
      return numValue >= threshold ? 'text-success' : numValue >= threshold * 0.8 ? 'text-warning' : 'text-error';
    }
    return numValue <= threshold ? 'text-success' : numValue <= threshold * 1.2 ? 'text-warning' : 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Performance Breakdown by Format</h2>
        <p className="text-sm text-muted-foreground mt-1">Detailed metrics across audio formats and file sizes</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {columns?.map(column => (
                <th
                  key={column?.key}
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => column?.sortable && handleSort(column?.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column?.label}</span>
                    {column?.sortable && getSortIcon(column?.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedData?.map((row, index) => (
              <tr key={index} className="hover:bg-muted/50 transition-colors">
                {columns?.map(column => (
                  <td key={column?.key} className="px-6 py-4 whitespace-nowrap text-sm">
                    {column?.render ? (
                      column?.render(row?.[column?.key], row)
                    ) : (
                      <span className={column?.threshold ? getStatusColor(row?.[column?.key], column?.threshold, column?.type) : 'text-foreground'}>
                        {row?.[column?.key]}{column?.unit || ''}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceTable;