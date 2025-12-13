import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

import Button from '../../../components/ui/Button';

const ActionToolbar = ({ onSearch, onRoleFilter, onAddUser }) => {
  const handleSearchChange = (e) => {
    onSearch?.(e?.target?.value);
  };

  const handleRoleChange = (e) => {
    onRoleFilter?.(e?.target?.value);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Search Input */}
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
            <Input
              type="text"
              placeholder="Search Users..."
              className="pl-10 bg-slate-900 border-slate-700 text-white placeholder-slate-400 w-full"
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Add User Button */}
        <Button
          onClick={onAddUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 whitespace-nowrap"
        >
          <Icon name="Plus" size={18} />
          <span>Add New User</span>
        </Button>
      </div>
    </div>
  );
};

export default ActionToolbar;