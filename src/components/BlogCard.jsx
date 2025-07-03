import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
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
  index = 0,
  isLocalData = false
}) => {
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

  const getImageUrl = (imageUrl) => {
    if (isLocalData) {
      return imageUrl || '/blogs/default-blog.jpg';
    }
    return getMediaUrl(imageUrl) || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
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
            src={getImageUrl(blog.image || blog.featured_image)} 
            alt={blog.title || 'Blog post'}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
            }}
            className={imageLoaded ? 'loaded' : ''}
          />
          <div className="image-overlay"></div>
          
          {/* Blog Badges */}
          <div className="blog-badges">
            {(blog.is_featured || featured) && (
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
                <span>{blog.read_time ? `${blog.read_time} min read` : getReadingTime(blog.content)}</span>
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

          {/* Blog Tags */}
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
