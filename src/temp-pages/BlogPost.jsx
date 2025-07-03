import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Tag, 
  ArrowLeft,
  Share2,
  Heart,
  BookOpen
} from 'lucide-react';
import { format } from 'date-fns';

// Hooks
import { useBlog, useIncrementBlogViews, useBlogs } from '../hooks/useApi';

// Components
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import BlogCard from '../components/Blogs/BlogCard';
import { getMediaUrl } from '../services/api';

const BlogPost = () => {
  const { slug } = useParams();
  const { data: blog, isLoading, error } = useBlog(slug);
  const { data: relatedBlogsData } = useBlogs({ category: blog?.data?.category, limit: 3 });
  const incrementViews = useIncrementBlogViews();

  // Increment views when blog loads
  useEffect(() => {
    if (blog?.data?.slug) {
      incrementViews.mutate(blog.data.slug);
    }
  }, [blog?.data?.slug, incrementViews]);

  const blogData = blog?.data;
  const relatedBlogs = relatedBlogsData?.data?.results || relatedBlogsData?.data || [];
  const filteredRelatedBlogs = relatedBlogs
    .filter(relatedBlog => relatedBlog.slug !== slug)
    .slice(0, 3);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch {
      return 'Date unknown';
    }
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  const getTags = () => {
    if (!blogData?.tags) return [];
    return blogData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: blogData.title,
        text: blogData.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || !blogData) return <ErrorMessage message="Blog post not found" />;

  return (
    <div className="blog-post-page">
      {/* Back Navigation */}
      <div className="container">
        <motion.div
          className="back-navigation"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/blogs" className="back-link">
            <ArrowLeft size={20} />
            Back to Blogs
          </Link>
        </motion.div>
      </div>

      {/* Blog Header */}
      <section className="blog-header">
        <div className="container">
          <motion.div
            className="blog-header-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Category Badge */}
            <div className="blog-category-badge">
              {blogData.category}
            </div>

            {/* Blog Title */}
            <h1 className="blog-title">{blogData.title}</h1>

            {/* Blog Meta */}
            <div className="blog-meta">
              <div className="meta-item">
                <User size={16} />
                <span>{blogData.author_name || 'eDC Team'}</span>
              </div>
              <div className="meta-item">
                <Calendar size={16} />
                <span>{formatDate(blogData.created_at)}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} />
                <span>{getReadingTime(blogData.content)}</span>
              </div>
              {blogData.views_count && (
                <div className="meta-item">
                  <Eye size={16} />
                  <span>{blogData.views_count} views</span>
                </div>
              )}
            </div>

            {/* Blog Actions */}
            <div className="blog-actions">
              <button 
                className="action-btn share-btn"
                onClick={sharePost}
              >
                <Share2 size={18} />
                Share
              </button>
              <button className="action-btn like-btn">
                <Heart size={18} />
                Like
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {blogData.featured_image && (
        <section className="blog-featured-image">
          <div className="container">
            <motion.div
              className="image-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src={getMediaUrl(blogData.featured_image)} 
                alt={blogData.title}
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Content */}
      <section className="blog-content-section">
        <div className="container">
          <div className="blog-layout">
            {/* Main Content */}
            <motion.article
              className="blog-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Excerpt */}
              {blogData.excerpt && (
                <div className="blog-excerpt">
                  <p>{blogData.excerpt}</p>
                </div>
              )}

              {/* Content */}
              <div 
                className="blog-text"
                dangerouslySetInnerHTML={{ __html: blogData.content }}
              />

              {/* Tags */}
              {getTags().length > 0 && (
                <div className="blog-tags-section">
                  <h4>
                    <Tag size={18} />
                    Tags
                  </h4>
                  <div className="tags-list">
                    {getTags().map((tag, index) => (
                      <span key={index} className="tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="author-section">
                <div className="author-info">
                  <div className="author-avatar">
                    <User size={24} />
                  </div>
                  <div className="author-details">
                    <h4>{blogData.author_name || 'eDC Team'}</h4>
                    <p>Content Creator at eDC IITD</p>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="blog-sidebar">
              {/* Table of Contents (if needed) */}
              <div className="sidebar-widget">
                <h4>Quick Links</h4>
                <ul>
                  <li><Link to="/blogs">← All Blogs</Link></li>
                  <li><Link to="/events">Upcoming Events</Link></li>
                  <li><Link to="/opportunities">Opportunities</Link></li>
                </ul>
              </div>

              {/* Share Widget */}
              <div className="sidebar-widget">
                <h4>Share This Post</h4>
                <div className="share-buttons">
                  <button onClick={sharePost} className="share-btn">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Blogs */}
      {filteredRelatedBlogs.length > 0 && (
        <section className="related-blogs-section">
          <div className="container">
            <div className="section-header">
              <h2>
                <BookOpen size={24} />
                Related Articles
              </h2>
            </div>
            
            <div className="related-blogs-grid">
              {filteredRelatedBlogs.map((relatedBlog, index) => (
                <BlogCard
                  key={relatedBlog.id}
                  blog={relatedBlog}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
