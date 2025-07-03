import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  User,
  BookOpen,
  MoreVertical,
  Star,
  TrendingUp
} from 'lucide-react';

// Hooks
import { 
  useBlogs, 
  useDeleteBlog, 
  useUpdateBlog 
} from '../../hooks/useApi';

// Components
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { getMediaUrl } from '../../services/api';

// Styles
// import '../../styles/ManageBlogs.css';

const ManageBlogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const { data: blogsData, isLoading, error } = useBlogs();
  const deleteBlogMutation = useDeleteBlog();
  const updateBlogMutation = useUpdateBlog();

  const blogs = blogsData?.data?.results || blogsData?.data || [];

  const categories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];
  
  const statusFilters = [
    { value: 'all', label: 'All Status' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' },
    { value: 'featured', label: 'Featured' },
  ];

  const categoryFilters = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(cat => ({ value: cat, label: cat }))
  ];

  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'published' && blog.is_published) ||
                           (statusFilter === 'draft' && !blog.is_published) ||
                           (statusFilter === 'featured' && blog.is_featured);
      
      const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [blogs, searchTerm, statusFilter, categoryFilter]);

  const handleSelectBlog = (blogId) => {
    setSelectedBlogs(prev => 
      prev.includes(blogId) 
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBlogs.length === filteredBlogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(filteredBlogs.map(blog => blog.id));
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteBlogMutation.mutateAsync(blogId);
      setShowDeleteModal(false);
      setBlogToDelete(null);
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  const handleTogglePublished = async (blog) => {
    try {
      await updateBlogMutation.mutateAsync({
        id: blog.id,
        data: { ...blog, is_published: !blog.is_published }
      });
    } catch (error) {
      console.error('Failed to update blog:', error);
    }
  };

  const handleToggleFeatured = async (blog) => {
    try {
      await updateBlogMutation.mutateAsync({
        id: blog.id,
        data: { ...blog, is_featured: !blog.is_featured }
      });
    } catch (error) {
      console.error('Failed to update blog:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) return <LoadingSpinner message="Loading blogs..." />;
  if (error) return <ErrorMessage message="Failed to load blogs" />;

  return (
    <div className="manage-blogs-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Manage Blogs</h1>
              <p>Create, edit, and manage blog posts</p>
            </div>
            
            <div className="header-actions">
              <button className="btn btn-primary">
                <Plus size={18} />
                New Blog Post
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
                <BookOpen size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{blogs.length}</div>
                <div className="stat-label">Total Blogs</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Eye size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{blogs.filter(b => b.is_published).length}</div>
                <div className="stat-label">Published</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Star size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{blogs.filter(b => b.is_featured).length}</div>
                <div className="stat-label">Featured</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{blogs.reduce((sum, b) => sum + (b.views_count || 0), 0)}</div>
                <div className="stat-label">Total Views</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="blogs-controls">
        <div className="container">
          <div className="controls-grid">
            <div className="search-section">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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

              {categories.length > 0 && (
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="filter-select"
                >
                  {categoryFilters.map(filter => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="bulk-actions">
              {selectedBlogs.length > 0 && (
                <div className="bulk-actions-bar">
                  <span>{selectedBlogs.length} selected</span>
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
            <span>{filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''} found</span>
          </div>
        </div>
      </section>

      {/* Blogs Table */}
      <section className="blogs-content">
        <div className="container">
          <div className="blogs-table-container">
            <table className="blogs-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedBlogs.length === filteredBlogs.length && filteredBlogs.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Blog Post</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredBlogs.map((blog, index) => (
                    <BlogTableRow
                      key={blog.id}
                      blog={blog}
                      index={index}
                      isSelected={selectedBlogs.includes(blog.id)}
                      onSelect={() => handleSelectBlog(blog.id)}
                      onDelete={() => {
                        setBlogToDelete(blog);
                        setShowDeleteModal(true);
                      }}
                      onTogglePublished={() => handleTogglePublished(blog)}
                      onToggleFeatured={() => handleToggleFeatured(blog)}
                      formatDate={formatDate}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {filteredBlogs.length === 0 && (
              <div className="no-blogs">
                <BookOpen size={48} />
                <h3>No blogs found</h3>
                <p>Try adjusting your search terms or filters.</p>
                <button className="btn btn-primary">
                  <Plus size={18} />
                  Create First Blog
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Delete Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <DeleteModal
            blog={blogToDelete}
            onConfirm={() => handleDeleteBlog(blogToDelete.id)}
            onCancel={() => {
              setShowDeleteModal(false);
              setBlogToDelete(null);
            }}
            isLoading={deleteBlogMutation.isLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Blog Table Row Component
const BlogTableRow = ({ 
  blog, 
  index, 
  isSelected, 
  onSelect, 
  onDelete, 
  onTogglePublished, 
  onToggleFeatured, 
  formatDate 
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.tr
      className="blog-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      
      <td className="blog-info">
        <div className="blog-info-content">
          <div className="blog-image">
            {blog.featured_image ? (
              <img src={getMediaUrl(blog.featured_image)} alt={blog.title} />
            ) : (
              <div className="blog-image-placeholder">
                <BookOpen size={20} />
              </div>
            )}
          </div>
          <div className="blog-details">
            <h4 className="blog-title">{blog.title}</h4>
            <p className="blog-excerpt">
              {blog.excerpt || blog.content.substring(0, 100) + '...'}
            </p>
            <div className="blog-badges">
              {blog.is_featured && (
                <span className="badge featured">Featured</span>
              )}
              {blog.is_published && (
                <span className="badge published">Published</span>
              )}
            </div>
          </div>
        </div>
      </td>
      
      <td>
        <div className="author-info">
          <User size={16} />
          <span>{blog.author_name || 'Admin'}</span>
        </div>
      </td>
      
      <td>
        <span className="category-tag">{blog.category}</span>
      </td>
      
      <td>
        <div className="status-indicators">
          <button
            className={`status-btn ${blog.is_published ? 'published' : 'draft'}`}
            onClick={onTogglePublished}
            title={blog.is_published ? 'Published' : 'Draft'}
          >
            {blog.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          
          <button
            className={`status-btn ${blog.is_featured ? 'featured' : ''}`}
            onClick={onToggleFeatured}
            title={blog.is_featured ? 'Featured' : 'Not Featured'}
          >
            <Star size={16} fill={blog.is_featured ? 'currentColor' : 'none'} />
          </button>
        </div>
      </td>
      
      <td>
        <div className="views-count">
          <Eye size={14} />
          <span>{blog.views_count || 0}</span>
        </div>
      </td>
      
      <td>
        <div className="date-info">
          <Calendar size={14} />
          <span>{formatDate(blog.created_at)}</span>
        </div>
      </td>
      
      <td>
        <div className="actions-cell">
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
                  <Eye size={14} />
                  Preview
                </button>
                <button className="action-item danger" onClick={onDelete}>
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </motion.tr>
  );
};

// Delete Modal Component
const DeleteModal = ({ blog, onConfirm, onCancel, isLoading }) => {
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
          <h3>Delete Blog Post</h3>
        </div>
        
        <div className="modal-body">
          <p>Are you sure you want to delete "<strong>{blog?.title}</strong>"?</p>
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

export default ManageBlogs;
