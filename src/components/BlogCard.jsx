import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  BookmarkPlus,
  ArrowRight,
  Tag
} from 'lucide-react';
import { format } from 'date-fns';
import { getMediaUrl } from '../services/api';
import '../styles/BlogCard.css';

const BlogCard = ({ 
  blog, 
  featured = false, 
  viewMode = 'grid', 
  index = 0 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Safely handle blog object
  if (!blog || typeof blog !== 'object') {
    return null;
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Date unknown';
    }
  };

  const getReadingTime = (content) => {
    if (!content || typeof content !== 'string') return '1 min read';
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  // Safely handle tags - convert to array if needed
  const getTags = () => {
    if (Array.isArray(blog.tags)) {
      return blog.tags;
    } else if (typeof blog.tags === 'string' && blog.tags.length > 0) {
      // Handle comma-separated string tags
      return blog.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    } else {
      return [];
    }
  };

  const tags = getTags();

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: blog.title || 'Blog Post',
        text: blog.excerpt || blog.content?.substring(0, 160) || 'Check out this blog post',
        url: window.location.origin + `/blogs/${blog.slug || blog.id}`,
      });
    }
  };

  return (
    <article 
      className={`blog-card ${viewMode} ${featured ? 'featured' : ''}`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <Link to={`/blogs/${blog.slug || blog.id}`} className="blog-link">
        {/* Blog Image */}
        <div className="blog-image">
          <img 
            src={getMediaUrl(blog.featured_image) || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
            alt={blog.title || 'Blog post'}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={imageLoaded ? 'loaded' : ''}
          />
          <div className="image-overlay"></div>
          
          {/* Blog Badges */}
          <div className="blog-badges">
            {blog.is_featured && (
              <div className="featured-badge">
                Featured
              </div>
            )}
            {blog.category && (
              <div className="category-badge">
                <Tag size={12} />
                {blog.category}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button 
              className={`action-btn ${isLiked ? 'active' : ''}`}
              onClick={handleLike}
              title="Like"
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button 
              className={`action-btn ${isBookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
              title="Bookmark"
            >
              <BookmarkPlus size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button 
              className="action-btn"
              onClick={handleShare}
              title="Share"
            >
              <Share2 size={16} />
            </button>
          </div>

          {/* Reading Progress */}
          <div className="reading-progress">
            <div 
              className="progress-bar"
              style={{ width: `${Math.random() * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="blog-content">
          {/* Blog Meta */}
          <div className="blog-meta">
            <div className="meta-left">
              <div className="meta-item">
                <User size={14} />
                <span>{blog.author_name || blog.author || 'eDC Team'}</span>
              </div>
              <div className="meta-item">
                <Calendar size={14} />
                <span>{formatDate(blog.created_at || blog.published_at)}</span>
              </div>
            </div>
            <div className="meta-right">
              <div className="meta-item">
                <Clock size={14} />
                <span>{getReadingTime(blog.content)}</span>
              </div>
              {blog.views_count && (
                <div className="meta-item">
                  <Eye size={14} />
                  <span>{blog.views_count}</span>
                </div>
              )}
            </div>
          </div>

          {/* Blog Title */}
          <h3 className="blog-title">{blog.title || 'Untitled Post'}</h3>

          {/* Blog Excerpt */}
          <p className="blog-excerpt">
            {blog.excerpt || 
             (blog.content && blog.content.length > 140 
               ? `${blog.content.substring(0, 140)}...` 
               : blog.content || 'No content available'
             )
            }
          </p>

          {/* Blog Tags - FIXED */}
          {tags.length > 0 && (
            <div className="blog-tags">
              {tags.slice(0, 3).map((tag, tagIndex) => (
                <span key={tagIndex} className="tag">
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="tag more">+{tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Read More */}
          <div className="read-more">
            <span>Read Article</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Hover Effect */}
        <div className="card-glow"></div>
      </Link>
    </article>
  );
};

export default BlogCard;
