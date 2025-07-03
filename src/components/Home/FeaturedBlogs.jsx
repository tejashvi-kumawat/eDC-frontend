import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import BlogCard from '../Blogs/BlogCard';

const FeaturedBlogs = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return (
      <section className="featured-blogs-section">
        <div className="container">
          <div className="section-header">
            <h2>
              <BookOpen size={24} />
              Featured Articles
            </h2>
          </div>
          <div className="no-blogs">
            <p>No featured articles available at the moment.</p>
            <Link to="/blogs" className="btn btn-primary">
              View All Articles
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-blogs-section">
      <div className="container">
        <div className="section-header">
          <h2>
            <BookOpen size={24} />
            Featured Articles
          </h2>
          <p>Insights and stories from our community</p>
        </div>
        
        <div className="featured-blogs-grid">
          {blogs.slice(0, 3).map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>

        <div className="section-cta">
          <Link to="/blogs" className="btn btn-outline">
            Read More Articles
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
