import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Calendar, 
  User, 
  Eye, 
  Clock,
  Grid,
  List,
  Star,
  TrendingUp,
  Tag,
  X,
  Heart,
  Share2
} from 'lucide-react';

// Hooks - COMMENTED OUT
// import { useBlogs } from '../hooks/useApi';

// Components - COMMENTED OUT
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';
// import BlogCard from '../components/BlogCard';

// Local Data
import { localBlogsData } from '../data/blogsData';

// Styles
import '../styles/Blogs.css';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedBlog, setSelectedBlog] = useState(null);

  // API Hook - COMMENTED OUT
  // const { data: blogsData, isLoading, error } = useBlogs();
  
  // Use only local data
  const blogs = localBlogsData;

  const categories = [...new Set(blogs.map(blog => blog.category).filter(Boolean))];
  const categoryFilters = [
    { value: 'all', label: 'All Categories' },
    ...categories.map(category => ({ value: category, label: category }))
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'title', label: 'Alphabetical' },
    { value: 'oldest', label: 'Oldest First' },
  ];

  const filteredBlogs = useMemo(() => {
    let filtered = blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (blog.tags && blog.tags.some(tag => 
                             tag.toLowerCase().includes(searchTerm.toLowerCase())
                           ));
      
      const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    // Sort blogs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.views_count || 0) - (a.views_count || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'recent':
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });

    return filtered;
  }, [blogs, searchTerm, categoryFilter, sortBy]);

  const featuredBlogs = blogs.filter(blog => blog.is_featured);
  const totalViews = blogs.reduce((sum, blog) => sum + (blog.views_count || 0), 0);

  // Handle blog click
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedBlog(null);
    document.body.style.overflow = 'unset'; // Restore scroll
  };

  // Loading and Error states - COMMENTED OUT
  // if (isLoading) return <LoadingSpinner message="Loading blogs..." />;
  // if (error) return <ErrorMessage message="Failed to load blogs" />;

  return (
    <div className="blogs-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="header-background"></div>
        <div className="container">
          <motion.div
            className="header-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Blog</h1>
            <p>Insights, stories, and knowledge from our entrepreneurship community</p>
            <div className="header-stats">
              <div className="stat-item">
                <BookOpen size={20} />
                <span>{blogs.length} Articles</span>
              </div>
              <div className="stat-item">
                <Star size={20} />
                <span>{featuredBlogs.length} Featured</span>
              </div>
              <div className="stat-item">
                <Eye size={20} />
                <span>{totalViews.toLocaleString()} Views</span>
              </div>
              <div className="stat-item">
                <Tag size={20} />
                <span>{categories.length} Categories</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <section className="featured-blogs-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>
                <Star size={32} />
                Featured Articles
              </h2>
              <p>Must-read articles from our community</p>
            </div>
            
            <div className="featured-blogs-grid">
              {featuredBlogs.slice(0, 3).map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BlogCard 
                    blog={blog} 
                    featured={true} 
                    isLocalData={true}
                    onBlogClick={handleBlogClick}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Controls */}
      <section className="blogs-controls">
        <div className="container">
          <div className="controls-grid">
            {/* Search */}
            <div className="search-section">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
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

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <Grid size={20} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          <div className="results-count">
            <span>{filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found</span>
          </div>
        </div>
      </section>

      {/* Blogs Grid/List */}
      <section className="blogs-content">
        <div className="container">
          <AnimatePresence mode="wait">
            {filteredBlogs.length === 0 ? (
              <motion.div
                className="no-blogs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <BookOpen size={64} />
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or filters.</p>
              </motion.div>
            ) : (
              <motion.div
                className={`blogs-${viewMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                {filteredBlogs.map((blog, index) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    viewMode={viewMode}
                    index={index}
                    isLocalData={true}
                    onBlogClick={handleBlogClick}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Blog Modal */}
      <BlogModal 
        blog={selectedBlog} 
        isOpen={!!selectedBlog} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

// Blog Card Component
const BlogCard = ({ blog, featured = false, viewMode = 'grid', index = 0, isLocalData = false, onBlogClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Date TBD';
    }
  };

  const getImageUrl = (imageUrl) => {
    if (isLocalData) {
      return imageUrl || '/blogs/default-blog.jpg';
    }
    return imageUrl;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (e) => {
    setImageError(true);
    setImageLoaded(true);
    e.target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  return (
    <motion.div
      className={`blog-card ${featured ? 'featured' : ''} ${viewMode}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      layout
      onClick={() => onBlogClick && onBlogClick(blog)}
      style={{ cursor: onBlogClick ? 'pointer' : 'default' }}
    >
      {/* Blog Image */}
      <div className="blog-image">
        {!imageLoaded && !imageError && (
          <div className="image-placeholder">
            <BookOpen size={32} />
          </div>
        )}
        <img 
          src={getImageUrl(blog.image)} 
          alt={blog.title}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ 
            opacity: imageLoaded ? 1 : 0,
            display: imageError ? 'block' : 'block'
          }}
        />
        <div className="image-overlay"></div>
        
        <div className="blog-category">{blog.category}</div>

        {featured && (
          <div className="featured-badge">
            <Star size={14} />
            Featured
          </div>
        )}
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        <h3 className="blog-title">{blog.title}</h3>
        
        <p className="blog-excerpt">
          {blog.excerpt || (blog.content && blog.content.length > 120 
            ? `${blog.content.substring(0, 120)}...` 
            : blog.content || 'No content available')
          }
        </p>

        <div className="blog-meta">
          <div className="meta-item">
            <User size={14} />
            <span>{blog.author}</span>
          </div>
          <div className="meta-item">
            <Calendar size={14} />
            <span>{formatDate(blog.created_at)}</span>
          </div>
          <div className="meta-item">
            <Clock size={14} />
            <span>{blog.read_time} min read</span>
          </div>
          <div className="meta-item">
            <Eye size={14} />
            <span>{blog.views_count} views</span>
          </div>
        </div>

        {blog.tags && (
          <div className="blog-tags">
            {blog.tags.slice(0, 3).map((tag, tagIndex) => (
              <span key={tagIndex} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};


// Blog Modal Component
const BlogModal = ({ blog, isOpen, onClose }) => {
  if (!blog) return null;

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Date TBD';
    }
  };

  const getImageUrl = (imageUrl) => {
    return imageUrl || '/blogs/default-blog.jpg';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="blog-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="blog-modal"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Modal Header */}
            <div className="modal-header">
              <button className="close-btn" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              {/* Blog Image */}
              <div className="modal-image">
                <img 
                  src={getImageUrl(blog.image)} 
                  alt={blog.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="image-overlay">
                  <div className="blog-category">{blog.category}</div>
                  {blog.is_featured && (
                    <div className="featured-badge">
                      <Star size={14} />
                      Featured
                    </div>
                  )}
                </div>
              </div>

              {/* Blog Details */}
              <div className="modal-body">
                <h1 className="modal-title">{blog.title}</h1>
                
                <div className="modal-meta">
                  <div className="meta-row">
                    <div className="meta-item">
                      <User size={16} />
                      <span>{blog.author}</span>
                    </div>
                    <div className="meta-item">
                      <Calendar size={16} />
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={16} />
                      <span>{blog.read_time} min read</span>
                    </div>
                  </div>
                  
                  <div className="meta-row">
                    <div className="meta-item">
                      <Eye size={16} />
                      <span>{blog.views_count.toLocaleString()} views</span>
                    </div>
                    <div className="meta-item">
                      <Heart size={16} />
                      <span>{blog.likes_count} likes</span>
                    </div>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="modal-text">
                  <p className="excerpt">{blog.excerpt}</p>
                  <div className="content">
                    {blog.content.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                {blog.tags && (
                  <div className="modal-tags">
                    <h4>Tags</h4>
                    <div className="tags-list">
                      {blog.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="modal-actions">
                  <button className="action-btn like-btn">
                    <Heart size={18} />
                    Like ({blog.likes_count})
                  </button>
                  <button className="action-btn share-btn">
                    <Share2 size={18} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Blogs;
