import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  MoreVertical,
  Star,
  Users
} from 'lucide-react';

// Hooks
import { 
  useTeam, 
  useDeleteTeamMember, 
  useUpdateTeamMember 
} from '../../hooks/useApi';

// Components
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { getMediaUrl } from '../../services/api';

// Styles
import '../../styles/ManageTeam.css';

const ManageTeam = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const { data: teamData, isLoading, error } = useTeam();
  const deleteTeamMemberMutation = useDeleteTeamMember();
  const updateTeamMemberMutation = useUpdateTeamMember();

  const teamMembers = teamData?.data?.results || teamData?.data || [];

  const positions = [...new Set(teamMembers.map(member => member.position))];
  const departments = [...new Set(teamMembers.map(member => member.department).filter(Boolean))];

  const positionFilters = [
    { value: 'all', label: 'All Positions' },
    ...positions.map(position => ({ value: position, label: position }))
  ];

  const departmentFilters = [
    { value: 'all', label: 'All Departments' },
    ...departments.map(dept => ({ value: dept, label: dept }))
  ];

  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesPosition = positionFilter === 'all' || member.position === positionFilter;
      const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;

      return matchesSearch && matchesPosition && matchesDepartment;
    });
  }, [teamMembers, searchTerm, positionFilter, departmentFilter]);

  const handleSelectMember = (memberId) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(member => member.id));
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await deleteTeamMemberMutation.mutateAsync(memberId);
      setShowDeleteModal(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error('Failed to delete team member:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPositionLevel = (position) => {
    const leadership = ['President', 'Vice President', 'Secretary', 'Treasurer'];
    const heads = ['Head', 'Lead', 'Coordinator', 'Manager'];
    
    if (leadership.includes(position)) return 'leadership';
    if (heads.some(title => position.includes(title))) return 'head';
    return 'member';
  };

  if (isLoading) return <LoadingSpinner message="Loading team members..." />;
  if (error) return <ErrorMessage message="Failed to load team members" />;

  return (
    <div className="manage-team-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Manage Team</h1>
              <p>Add, edit, and manage team members</p>
            </div>
            
            <div className="header-actions">
              <button className="btn btn-primary">
                <Plus size={18} />
                Add Team Member
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{teamMembers.length}</div>
                <div className="stat-label">Total Members</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Award size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">
                  {teamMembers.filter(m => getPositionLevel(m.position) === 'leadership').length}
                </div>
                <div className="stat-label">Leadership</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Star size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">
                  {teamMembers.filter(m => getPositionLevel(m.position) === 'head').length}
                </div>
                <div className="stat-label">Heads</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <User size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{departments.length}</div>
                <div className="stat-label">Departments</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="team-controls">
        <div className="container">
          <div className="controls-grid">
            <div className="search-section">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="filters-section">
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="filter-select"
              >
                {positionFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              {departments.length > 0 && (
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="filter-select"
                >
                  {departmentFilters.map(filter => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="bulk-actions">
              {selectedMembers.length > 0 && (
                <div className="bulk-actions-bar">
                  <span>{selectedMembers.length} selected</span>
                  <button className="btn btn-outline btn-sm">
                    Bulk Edit
                  </button>
                  <button className="btn btn-danger btn-sm">
                    <Trash2 size={16} />
                    Delete Selected
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="results-info">
            <span>{filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''} found</span>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="team-content">
        <div className="container">
          <div className="team-grid">
            <AnimatePresence>
              {filteredMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  isSelected={selectedMembers.includes(member.id)}
                  onSelect={() => handleSelectMember(member.id)}
                  onDelete={() => {
                    setMemberToDelete(member);
                    setShowDeleteModal(true);
                  }}
                  formatDate={formatDate}
                  getPositionLevel={getPositionLevel}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredMembers.length === 0 && (
            <div className="no-members">
              <Users size={48} />
              <h3>No team members found</h3>
              <p>Try adjusting your search terms or filters.</p>
              <button className="btn btn-primary">
                <Plus size={18} />
                Add First Member
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteModal
            member={memberToDelete}
            onConfirm={() => handleDeleteMember(memberToDelete.id)}
            onCancel={() => {
              setShowDeleteModal(false);
              setMemberToDelete(null);
            }}
            isLoading={deleteTeamMemberMutation.isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ 
  member, 
  index, 
  isSelected, 
  onSelect, 
  onDelete, 
  formatDate,
  getPositionLevel 
}) => {
  const [showActions, setShowActions] = useState(false);
  const positionLevel = getPositionLevel(member.position);

  return (
    <motion.div
      className={`team-member-card ${positionLevel}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="member-card-header">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="member-checkbox"
        />
        
        <div className="actions-dropdown">
          <button
            className="actions-trigger"
            onClick={() => setShowActions(!showActions)}
          >
            <MoreVertical size={16} />
          </button>
          
          {showActions && (
            <div className="actions-menu">
              <button className="action-item">
                <Edit3 size={14} />
                Edit
              </button>
              <button className="action-item">
                <Mail size={14} />
                Send Email
              </button>
              <button className="action-item danger" onClick={onDelete}>
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="member-avatar">
        {member.photo ? (
          <img 
            src={getMediaUrl(member.photo)} 
            alt={member.name}
          />
        ) : (
          <div className="avatar-placeholder">
            <User size={32} />
          </div>
        )}
        
        {positionLevel === 'leadership' && (
          <div className="leadership-badge">
            <Award size={16} />
          </div>
        )}
      </div>

      <div className="member-info">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-position">{member.position}</p>
        
        {member.department && (
          <p className="member-department">{member.department}</p>
        )}

        <div className="member-contact">
          {member.email && (
            <div className="contact-item">
              <Mail size={14} />
              <span>{member.email}</span>
            </div>
          )}
          
          {member.phone && (
            <div className="contact-item">
              <Phone size={14} />
              <span>{member.phone}</span>
            </div>
          )}
        </div>

        {member.bio && (
          <p className="member-bio">
            {member.bio.length > 100 
              ? `${member.bio.substring(0, 100)}...` 
              : member.bio
            }
          </p>
        )}

        <div className="member-meta">
          <span className="join-date">
            Joined {formatDate(member.created_at)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Delete Modal Component
const DeleteModal = ({ member, onConfirm, onCancel, isLoading }) => {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
    >
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Remove Team Member</h3>
        </div>
        
        <div className="modal-body">
          <p>Are you sure you want to remove <strong>{member?.name}</strong> from the team?</p>
          <p className="warning-text">This action cannot be undone.</p>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </button>
          <button 
            className="btn btn-danger" 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ManageTeam;
