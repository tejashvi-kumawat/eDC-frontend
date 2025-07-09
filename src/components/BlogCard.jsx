import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, Eye, Tag, User } from 'lucide-react';
import { format } from 'date-fns';
import { getMediaUrl } from '../services/api';
import Modal from './Modal';
import '../styles/BlogCard.css';

const BlogCard = ({ 
  blog, 
  featured = false, 
  viewMode = 'grid', 
  index = 0,
  isLocalData = false
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  const getTags = () => {
    if (Array.isArray(blog.tags)) {
      return blog.tags;
    } else if (typeof blog.tags === 'string' && blog.tags.length > 0) {
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

  // Full content modal
  const handleCardClick = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  // SEO: Use BlogPosting schema.org microdata
  return (
    <>
      <article 
        className={`blog-card ${viewMode} ${featured ? 'featured' : ''}`}
        data-aos="fade-up"
        data-aos-delay={index * 100}
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <a href="#" className="blog-link" onClick={handleCardClick} itemProp="url" aria-label={`Read full article: ${blog.title}`}> 
          <header>
            <div className="blog-image">
              <img 
                src={getImageUrl(blog.image || blog.featured_image)} 
                alt={blog.title ? `Cover image for ${blog.title}` : 'Blog post cover'}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                }}
                className={imageLoaded ? 'loaded' : ''}
                itemProp="image"
              />
              <div className="image-overlay"></div>
              <div className="blog-badges">
                {(blog.is_featured || featured) && (
                  <div className="featured-badge">Featured</div>
                )}
                {blog.category && (
                  <div className="category-badge">
                    <Tag size={12} />
                    <span itemProp="articleSection">{blog.category}</span>
                  </div>
                )}
              </div>
              <div className="reading-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${Math.random() * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="blog-meta">
              <div className="meta-left">
                <div className="meta-item">
                  <User size={14} />
                  <span itemProp="author" itemScope itemType="https://schema.org/Person">
                    <span itemProp="name">{blog.author_name || blog.author || 'eDC Team'}</span>
                  </span>
                </div>
                <div className="meta-item">
                  <Calendar size={14} />
                  <time itemProp="datePublished" dateTime={blog.created_at || blog.published_at}>
                    {formatDate(blog.created_at || blog.published_at)}
                  </time>
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
          </header>
          <h3 className="blog-title" itemProp="headline">{blog.title || 'Untitled Post'}</h3>
          <p className="blog-excerpt" itemProp="description">
            {blog.excerpt || 
              (blog.content && blog.content.length > 140 
                ? `${blog.content.substring(0, 140)}...` 
                : blog.content || 'No content available'
              )
            }
          </p>
          {tags.length > 0 && (
            <div className="blog-tags">
              {tags.slice(0, 3).map((tag, tagIndex) => (
                <span key={tagIndex} className="tag" itemProp="keywords">
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="tag more">+{tags.length - 3}</span>
              )}
            </div>
          )}
          <div className="read-more">
            <span>Read Article</span>
            <ArrowRight size={16} />
          </div>
          <meta itemProp="mainEntityOfPage" content={blog.link || ''} />
        </a>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="modal-blog-header">
            <h2>{blog.title}</h2>
            <div className="modal-blog-meta">
              <span><User size={14} /> {blog.author_name || blog.author || 'eDC Team'}</span>
              <span><Calendar size={14} /> {formatDate(blog.created_at || blog.published_at)}</span>
              <span><Clock size={14} /> {blog.read_time ? `${blog.read_time} min read` : getReadingTime(blog.content)}</span>
            </div>
          </div>
          <div className="modal-blog-image" style={{ margin: '1rem 0' }}>
            <img 
              src={getImageUrl(blog.image || blog.featured_image)} 
              alt={blog.title || 'Blog post'}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
          <div className="modal-blog-content" style={{ marginBottom: '1rem' }}>
            <div style={{ whiteSpace: 'pre-line' }}>
              {blog.content}
            </div>
          </div>
          {tags.length > 0 && (
            <div className="modal-blog-tags" style={{ marginBottom: '1rem' }}>
              {tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="tag" style={{ marginRight: 6 }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Modal>
      </article>
    </>
  );
};

export default BlogCard;
