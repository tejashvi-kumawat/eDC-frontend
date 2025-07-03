import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Mail, 
  MailOpen,
  Trash2, 
  Eye,
  Calendar,
  User,
  MessageSquare,
  Phone,
  Clock,
  CheckCircle,
  X,
  Star,
  Archive
} from 'lucide-react';

// Hooks
import { 
  useContactQueries, 
  useMarkContactAsRead, 
  useDeleteContactQuery 
} from '../../hooks/useApi';

// Components
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

// Styles
import '../../styles/ContactQueries.css';

const ContactQueries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQueries, setSelectedQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [queryToDelete, setQueryToDelete] = useState(null);

  const { data: queriesData, isLoading, error } = useContactQueries();
  const markAsReadMutation = useMarkContactAsRead();
  const deleteQueryMutation = useDeleteContactQuery();

  const queries = queriesData?.data?.results || queriesData?.data || [];

  const statusFilters = [
    { value: 'all', label: 'All Queries' },
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
  ];

  const filteredQueries = useMemo(() => {
    return queries.filter(query => {
      const matchesSearch = query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           query.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           query.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'read' && query.is_read) ||
                           (statusFilter === 'unread' && !query.is_read);

      return matchesSearch && matchesStatus;
    });
  }, [queries, searchTerm, statusFilter]);

  const handleSelectQuery = (queryId) => {
    setSelectedQueries(prev => 
      prev.includes(queryId) 
        ? prev.filter(id => id !== queryId)
        : [...prev, queryId]
    );
  };

  const handleSelectAll = () => {
    if (selectedQueries.length === filteredQueries.length) {
      setSelectedQueries([]);
    } else {
      setSelectedQueries(filteredQueries.map(query => query.id));
    }
  };

  const handleMarkAsRead = async (queryId) => {
    try {
      await markAsReadMutation.mutateAsync(queryId);
    } catch (error) {
      console.error('Failed to mark query as read:', error);
    }
  };

  const handleDeleteQuery = async (queryId) => {
    try {
      await deleteQueryMutation.mutateAsync(queryId);
      setShowDeleteModal(false);
      setQueryToDelete(null);
      if (selectedQuery && selectedQuery.id === queryId) {
        setSelectedQuery(null);
      }
    } catch (error) {
      console.error('Failed to delete query:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const unreadCount = queries.filter(q => !q.is_read).length;
  const todayCount = queries.filter(q => {
    const today = new Date();
    const queryDate = new Date(q.created_at);
    return queryDate.toDateString() === today.toDateString();
  }).length;

  if (isLoading) return <LoadingSpinner message="Loading contact queries..." />;
  if (error) return <ErrorMessage message="Failed to load contact queries" />;

  return (
    <div className="contact-queries-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Contact Queries</h1>
              <p>Manage and respond to contact form submissions</p>
            </div>
            
            <div className="header-stats">
              <div className="stat-badge unread">
                <Mail size={16} />
                <span>{unreadCount} Unread</span>
              </div>
              <div className="stat-badge today">
                <Calendar size={16} />
                <span>{todayCount} Today</span>
              </div>
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
                <MessageSquare size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{queries.length}</div>
                <div className="stat-label">Total Queries</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Mail size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{unreadCount}</div>
                <div className="stat-label">Unread</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{queries.filter(q => q.is_read).length}</div>
                <div className="stat-label">Read</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Clock size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{todayCount}</div>
                <div className="stat-label">Today</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="queries-content">
        <div className="container">
          <div className="queries-layout">
            {/* Queries List */}
            <div className="queries-list-panel">
              {/* Controls */}
              <div className="queries-controls">
                <div className="search-bar">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search queries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="filters-section">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="filter-select"
                  >
                    {statusFilters.map(filter => (
                      <option key={filter.value} value={filter.value}>
                        {filter.label}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedQueries.length > 0 && (
                  <div className="bulk-actions">
                    <span className="selected-count">{selectedQueries.length} selected</span>
                    <button className="btn btn-outline btn-sm">
                      Mark as Read
                    </button>
                    <button className="btn btn-danger btn-sm">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Queries List */}
              <div className="queries-list">
                <div className="list-header">
                  <input
                    type="checkbox"
                    checked={selectedQueries.length === filteredQueries.length && filteredQueries.length > 0}
                    onChange={handleSelectAll}
                  />
                  <span>{filteredQueries.length} queries</span>
                </div>

                <div className="queries-items">
                  <AnimatePresence>
                    {filteredQueries.map((query, index) => (
                      <QueryListItem
                        key={query.id}
                        query={query}
                        index={index}
                        isSelected={selectedQueries.includes(query.id)}
                        isActive={selectedQuery?.id === query.id}
                        onSelect={() => handleSelectQuery(query.id)}
                        onClick={() => {
                          setSelectedQuery(query);
                          if (!query.is_read) {
                            handleMarkAsRead(query.id);
                          }
                        }}
                        onDelete={() => {
                          setQueryToDelete(query);
                          setShowDeleteModal(true);
                        }}
                        getTimeAgo={getTimeAgo}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {filteredQueries.length === 0 && (
                  <div className="no-queries">
                    <MessageSquare size={48} />
                    <h3>No queries found</h3>
                    <p>Try adjusting your search terms or filters.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Query Detail Panel */}
            <div className="query-detail-panel">
              {selectedQuery ? (
                <QueryDetail
                  query={selectedQuery}
                  onClose={() => setSelectedQuery(null)}
                  onDelete={() => {
                    setQueryToDelete(selectedQuery);
                    setShowDeleteModal(true);
                  }}
                  formatDate={formatDate}
                />
              ) : (
                <div className="no-query-selected">
                  <Mail size={64} />
                  <h3>Select a query to view details</h3>
                  <p>Choose a query from the list to see the full message and details.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteModal
            query={queryToDelete}
            onConfirm={() => handleDeleteQuery(queryToDelete.id)}
            onCancel={() => {
              setShowDeleteModal(false);
              setQueryToDelete(null);
            }}
            isLoading={deleteQueryMutation.isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Query List Item Component
const QueryListItem = ({ 
  query, 
  index, 
  isSelected, 
  isActive, 
  onSelect, 
  onClick, 
  onDelete, 
  getTimeAgo 
}) => {
  return (
    <motion.div
      className={`query-item ${!query.is_read ? 'unread' : ''} ${isActive ? 'active' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
    >
      <div className="query-item-header">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          onClick={(e) => e.stopPropagation()}
        />
        
        <div className="query-status">
          {query.is_read ? (
            <MailOpen size={16} className="read-icon" />
          ) : (
            <Mail size={16} className="unread-icon" />
          )}
        </div>
        
        <div className="query-time">
          {getTimeAgo(query.created_at)}
        </div>
      </div>

      <div className="query-item-content">
        <div className="query-sender">
          <User size={14} />
          <span className="sender-name">{query.name}</span>
          <span className="sender-email">{query.email}</span>
        </div>
        
        <h4 className="query-subject">{query.subject}</h4>
        
        <p className="query-preview">
          {query.message.length > 100 
            ? `${query.message.substring(0, 100)}...` 
            : query.message
          }
        </p>
      </div>

      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Delete query"
      >
        <Trash2 size={14} />
      </button>
    </motion.div>
  );
};

// Query Detail Component
const QueryDetail = ({ query, onClose, onDelete, formatDate }) => {
  return (
    <motion.div
      className="query-detail"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="detail-header">
        <div className="detail-title">
          <h2>{query.subject}</h2>
          <div className="detail-status">
            {query.is_read ? (
              <span className="status-badge read">
                <CheckCircle size={14} />
                Read
              </span>
            ) : (
              <span className="status-badge unread">
                <Mail size={14} />
                Unread
              </span>
            )}
          </div>
        </div>
        
        <div className="detail-actions">
          <button className="btn btn-outline btn-sm">
            <Mail size={14} />
            Reply
          </button>
          <button className="btn btn-danger btn-sm" onClick={onDelete}>
            <Trash2 size={14} />
            Delete
          </button>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="detail-meta">
        <div className="meta-item">
          <User size={16} />
          <div>
            <strong>{query.name}</strong>
            <span>{query.email}</span>
          </div>
        </div>
        
        {query.phone && (
          <div className="meta-item">
            <Phone size={16} />
            <span>{query.phone}</span>
          </div>
        )}
        
        <div className="meta-item">
          <Calendar size={16} />
          <span>{formatDate(query.created_at)}</span>
        </div>
      </div>

      <div className="detail-content">
        <div className="message-content">
          <h3>Message</h3>
          <div className="message-text">
            {query.message.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Delete Modal Component
const DeleteModal = ({ query, onConfirm, onCancel, isLoading }) => {
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
          <h3>Delete Query</h3>
        </div>
        
        <div className="modal-body">
          <p>Are you sure you want to delete the query from <strong>{query?.name}</strong>?</p>
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
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactQueries;
