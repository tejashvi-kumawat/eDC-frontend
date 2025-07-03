import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  AlertCircle,
  MapPin,
  Compass
} from 'lucide-react';

const NotFound = () => {
  const suggestions = [
    { icon: Home, label: 'Go to Homepage', path: '/', description: 'Start from the beginning' },
    { icon: Search, label: 'Browse Events', path: '/events', description: 'Check out our latest events' },
    { icon: MapPin, label: 'View Team', path: '/team', description: 'Meet our amazing team' },
    { icon: Compass, label: 'Explore Opportunities', path: '/opportunities', description: 'Find your next opportunity' },
  ];

  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div
          className="not-found-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Illustration */}
          <motion.div
            className="error-illustration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="error-number">404</div>
            <div className="error-icon">
              <AlertCircle size={80} />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1>Oops! Page Not Found</h1>
            <p>
              We're sorry, but the page you're looking for doesn't exist. 
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="quick-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/" className="btn btn-primary">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-outline"
            >
              Go Back
            </button>
          </motion.div>

          {/* Helpful Suggestions */}
          <motion.div
            className="suggestions-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3>Where would you like to go?</h3>
            <div className="suggestions-grid">
              {suggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon;
                return (
                  <motion.div
                    key={suggestion.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  >
                    <Link to={suggestion.path} className="suggestion-card">
                      <div className="suggestion-icon">
                        <IconComponent size={24} />
                      </div>
                      <div className="suggestion-content">
                        <h4>{suggestion.label}</h4>
                        <p>{suggestion.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Search Alternative */}
          <motion.div
            className="search-alternative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h3>Still can't find what you're looking for?</h3>
            <p>
              Try searching our site or contact us directly. We're here to help!
            </p>
            <div className="search-actions">
              <Link to="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
              <Link to="/blogs" className="btn btn-outline">
                Browse Articles
              </Link>
            </div>
          </motion.div>

          {/* Fun Animation */}
          <motion.div
            className="floating-elements"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-element"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
