import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Eye, 
  Clock,
  Star
} from 'lucide-react';

const BlogCard = ({ blog, featured = false, onBlogClick }) => {
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

  const handleCardClick = () => {
    if (onBlogClick) {
      onBlogClick(blog);
    }
  };

  const handleReadMoreClick = (e) => {
    e.stopPropagation();
    if (onBlogClick) {
      onBlogClick(blog);
    }
  };

  return (
    <div 
      className={`blog-card ${featured ? 'featured' : ''}`}
      onClick={handleCardClick}
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
            <span>{blog.views_count || 0} views</span>
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
          
          <button 
            className="read-more-btn"
            onClick={handleReadMoreClick}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
