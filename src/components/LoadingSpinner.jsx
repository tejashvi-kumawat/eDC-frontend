import React from 'react';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  overlay = false,
  color = 'primary' 
}) => {
  const Component = overlay ? 'div' : React.Fragment;
  const wrapperProps = overlay ? { className: 'loading-overlay' } : {};

  return (
    <Component {...wrapperProps}>
      <div className={`loading-spinner ${size}`}>
        <div className={`spinner ${color}`}>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        {message && (
          <div className="loading-message">
            <span>{message}</span>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
    </Component>
  );
};

export default LoadingSpinner;
