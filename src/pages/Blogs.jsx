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
  Share2,
  Bookmark
} from 'lucide-react';

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
  const [blogViews, setBlogViews] = useState({});

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
          return (blogViews[b.id] || 0) - (blogViews[a.id] || 0);
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
  }, [blogs, searchTerm, categoryFilter, sortBy, blogViews]);

  const featuredBlogs = blogs.filter(blog => blog.is_featured);
  const totalViews = Object.values(blogViews).reduce((sum, views) => sum + views, 0);

  // Handle blog click
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    // Increment view count
    setBlogViews(prev => ({
      ...prev,
      [blog.id]: (prev[blog.id] || 0) + 1
    }));
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedBlog(null);
    document.body.style.overflow = 'unset'; // Restore scroll
  };

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
                    views={blogViews[blog.id] || 0}
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
                {categoryFilters.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
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

            {/* View Controls */}
            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <Grid size={18} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="results-count">
            Showing {filteredBlogs.length} of {blogs.length} articles
          </div>
        </div>
      </section>

      {/* Blogs Content */}
      <section className="blogs-content">
        <div className="container">
          {filteredBlogs.length > 0 ? (
            <div className={`blogs-grid ${viewMode === 'list' ? 'blogs-list' : ''}`}>
              <AnimatePresence>
                {filteredBlogs.map((blog, index) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <BlogCard 
                      blog={blog} 
                      viewMode={viewMode}
                      isLocalData={true}
                      onBlogClick={handleBlogClick}
                      views={blogViews[blog.id] || 0}
                      index={index}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="no-blogs">
              <BookOpen size={64} />
              <h3>No articles found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <BlogModal 
            blog={selectedBlog} 
            isOpen={!!selectedBlog} 
            onClose={handleCloseModal}
            views={blogViews[selectedBlog.id] || 0}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// BlogCard Component
const BlogCard = ({ blog, featured = false, viewMode = 'grid', index = 0, isLocalData = false, onBlogClick, views = 0 }) => {
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
      return 'Date unknown';
    }
  };

  const getImageUrl = (imageUrl) => {
    if (isLocalData) {
      // Use placeholder images for local data
      const placeholderImages = [
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ];
      
      const placeholderIndex = (blog.id - 1) % placeholderImages.length;
      return imageUrl || placeholderImages[placeholderIndex];
    }
    return imageUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (e) => {
    setImageError(true);
    setImageLoaded(true);
    e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  return (
    <div 
      className={`blog-card ${viewMode} ${featured ? 'featured' : ''}`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onClick={() => onBlogClick(blog)}
    >
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
            display: 'block'
          }}
        />
        <div className="image-overlay"></div>
        
        {/* Featured Badge */}
        {(blog.is_featured || featured) && (
          <div className="featured-badge">
            <Star size={14} />
            Featured
          </div>
        )}

        {/* Category Badge */}
        {blog.category && (
          <div className="category-badge">
            {blog.category}
          </div>
        )}
      </div>

      <div className="blog-content">
        <div className="blog-meta">
          <div className="meta-item">
            <Calendar size={14} />
            <span>{formatDate(blog.created_at)}</span>
          </div>
          <div className="meta-item">
            <User size={14} />
            <span>{blog.author}</span>
          </div>
          <div className="meta-item">
            <Eye size={14} />
            <span>{views} views</span>
          </div>
        </div>

        <h3 className="blog-title">{blog.title}</h3>
        
        <p className="blog-excerpt">
          {blog.excerpt || blog.content.substring(0, 150) + '...'}
        </p>

        <div className="blog-footer">
          <div className="read-time">
            <Clock size={14} />
            <span>{blog.read_time || 5} min read</span>
          </div>
          
          <button className="read-more-btn">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

// BlogModal Component
const BlogModal = ({ blog, isOpen, onClose, views = 0 }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Date unknown';
    }
  };

  const getImageUrl = (imageUrl) => {
    const placeholderImages = [
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    
    const placeholderIndex = (blog.id - 1) % placeholderImages.length;
    return imageUrl || placeholderImages[placeholderIndex];
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt || blog.content.substring(0, 200),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.div
      className="blog-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="blog-modal"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-content">
          <div className="modal-image">
            <img src={getImageUrl(blog.image)} alt={blog.title} />
            <div className="image-overlay"></div>
          </div>

          <div className="modal-body">
            <div className="modal-meta">
              <div className="meta-row">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>{formatDate(blog.created_at)}</span>
                </div>
                <div className="meta-item">
                  <User size={16} />
                  <span>{blog.author}</span>
                </div>
                <div className="meta-item">
                  <Eye size={16} />
                  <span>{views} views</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{blog.read_time || 5} min read</span>
                </div>
              </div>
            </div>

            <h2 className="modal-title">{blog.title}</h2>

            <div className="modal-text">
              <p className="excerpt">{blog.excerpt || blog.content.substring(0, 200)}</p>
              <div className="content">
                {blog.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="modal-tags">
                <h4>Tags</h4>
                <div className="tags-list">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      <Tag size={14} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-actions">
              <button 
                className={`action-btn like-btn ${isLiked ? 'active' : ''}`}
                onClick={handleLike}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                {isLiked ? 'Liked' : 'Like'}
              </button>
              
              <button 
                className={`action-btn bookmark-btn ${isBookmarked ? 'active' : ''}`}
                onClick={handleBookmark}
              >
                <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
              
              <button 
                className="action-btn share-btn"
                onClick={handleShare}
              >
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Blogs;
