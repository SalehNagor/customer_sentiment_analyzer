import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import ActionToolbar from './components/ActionToolbar';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';

const AdminUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@company.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Agent',
      status: 'active',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      avatar: 'https://i.pravatar.cc/150?img=12',
      role: 'Agent',
      status: 'active',
      lastActive: '5 minutes ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'Agent',
      status: 'active',
      lastActive: '1 hour ago'
    },
    {
      id: 4,
      name: 'James Thompson',
      email: 'james.thompson@company.com',
      avatar: 'https://i.pravatar.cc/150?img=13',
      role: 'Agent',
      status: 'inactive',
      lastActive: '2 days ago'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@company.com',
      avatar: 'https://i.pravatar.cc/150?img=9',
      role: 'Agent',
      status: 'active',
      lastActive: '30 minutes ago'
    },
    {
      id: 6,
      name: 'David Park',
      email: 'david.park@company.com',
      avatar: 'https://i.pravatar.cc/150?img=14',
      role: 'Agent',
      status: 'active',
      lastActive: '3 hours ago'
    },
    {
      id: 7,
      name: 'Jennifer White',
      email: 'jennifer.white@company.com',
      avatar: 'https://i.pravatar.cc/150?img=10',
      role: 'Agent',
      status: 'active',
      lastActive: '15 minutes ago'
    },
    {
      id: 8,
      name: 'Robert Taylor',
      email: 'robert.taylor@company.com',
      avatar: 'https://i.pravatar.cc/150?img=15',
      role: 'Agent',
      status: 'inactive',
      lastActive: '1 week ago'
    }
  ]);

  // Filter users based on search and role
  const filteredUsers = useMemo(() => {
    return users?.filter((user) => {
      const matchesSearch = 
        user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesRole = selectedRole === 'all' || user?.role === selectedRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, selectedRole]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users?.filter(u => u?.id !== userId));
    }
  };

  const handleToggleStatus = (userId) => {
    setUsers(users?.map(u => 
      u?.id === userId 
        ? { ...u, status: u?.status === 'active' ? 'inactive' : 'active' }
        : u
    ));
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users?.map(u => 
        u?.id === selectedUser?.id 
          ? { ...u, ...userData }
          : u
      ));
    } else {
      // Add new user
      const newUser = {
        id: users?.length + 1,
        ...userData,
        avatar: `https://i.pravatar.cc/150?img=${users?.length + 1}`,
        status: 'active',
        lastActive: 'Just now'
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-background">
        <div className="container mx-auto p-6 max-w-[1600px]">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2 font-['Inter']">
              User Management
            </h1>
            <p className="text-muted-foreground font-['Inter']">
              Manage access and roles
            </p>
          </div>

          {/* Action Toolbar */}
          <ActionToolbar
            onSearch={handleSearch}
            onRoleFilter={handleRoleFilter}
            onAddUser={handleAddUser}
          />

          {/* User Table */}
          <UserTable
            users={filteredUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </main>

      {/* User Modal */}
      {isModalOpen && (
        <UserModal
          user={selectedUser}
          onSave={handleSaveUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default AdminUserManagement;