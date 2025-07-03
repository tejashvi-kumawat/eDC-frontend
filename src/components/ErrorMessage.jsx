import React from 'react';
import { AlertCircle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ 
  title = 'Oops! Something went wrong',
  message = 'We encountered an unexpected error. Please try again.',
  onRetry,
  showRetry = true,
  showHome = false,
  showBack = false,
  type = 'error', // error, warning, info
  fullPage = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertCircle size={fullPage ? 64 : 48} className="warning-icon" />;
      case 'info':
        return <AlertCircle size={fullPage ? 64 : 48} className="info-icon" />;
      default:
        return <AlertCircle size={fullPage ? 64 : 48} className="error-icon" />;
    }
  };

  return (
    <div className={`error-message ${type} ${fullPage ? 'full-page' : ''}`}>
      <div className="error-content">
        <div className="error-icon-wrapper">
          {getIcon()}
          <div className="error-glow"></div>
        </div>
        
        <div className="error-text">
          <h3 className="error-title">{title}</h3>
          <p className="error-description">{message}</p>
        </div>

        <div className="error-actions">
          {showRetry && onRetry && (
            <button 
              className="btn btn-primary"
              onClick={onRetry}
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          )}
          
          {showHome && (
            <Link to="/" className="btn btn-outline">
              <Home size={18} />
              Go Home
            </Link>
          )}
          
          {showBack && (
            <button 
              className="btn btn-outline"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          )}
        </div>

        {fullPage && (
          <div className="error-suggestions">
            <h4>What you can do:</h4>
            <ul>
              <li>Check your internet connection</li>
              <li>Refresh the page</li>
              <li>Try again in a few minutes</li>
              <li>Contact support if the problem persists</li>
            </ul>
          </div>
        )}
      </div>
      
      {fullPage && (
        <div className="error-background">
          <div className="error-pattern"></div>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
