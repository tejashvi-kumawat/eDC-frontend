import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ExternalLink, 
  Bookmark,
  Share2,
  Star,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';
import '../styles/EventCard.css';

const EventCard = ({ 
  event, 
  featured = false, 
  viewMode = 'grid', 
  index = 0,
  isLocalData = false
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getEventStatus = () => {
    const now = new Date();
    const startDate = new Date(event.start_datetime);
    const endDate = new Date(event.end_datetime);

    if (now < startDate) return 'upcoming';
    if (now > endDate) return 'past';
    return 'ongoing';
  };

  const formatDateTime = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy • h:mm a');
    } catch {
      return 'Date TBD';
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd');
    } catch {
      return 'TBD';
    }
  };

  const getDaysUntil = () => {
    const now = new Date();
    const eventDate = new Date(event.start_datetime);
    const diffTime = eventDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return null;
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const getImageUrl = (imageUrl) => {
    if (isLocalData) {
      // Use placeholder images for local data
      const placeholderImages = [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ];
      
      // Use a different placeholder for each event based on its ID
      const placeholderIndex = (event.id - 1) % placeholderImages.length;
      return imageUrl || placeholderImages[placeholderIndex];
    }
    return imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.origin + `/events/${event.id}`,
      });
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = (e) => {
    setImageError(true);
    setImageLoaded(true);
    e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  };

  const status = getEventStatus();
  const daysUntil = getDaysUntil();

  return (
    <div 
      className={`event-card ${status} ${viewMode} ${featured ? 'featured' : ''}`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="event-link">
        {/* Event Image */}
        <div className="event-image">
          {!imageLoaded && !imageError && (
            <div className="image-placeholder">
              <Calendar size={32} />
            </div>
          )}
          <img 
            src={getImageUrl(event.image)} 
            alt={event.title}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ 
              opacity: imageLoaded ? 1 : 0,
              display: 'block'
            }}
          />
          <div className="image-overlay"></div>
          
          {/* Status Badge */}
          <div className={`event-status ${status}`}>
            {status === 'ongoing' && <><div className="live-dot"></div>Live</>}
            {status === 'upcoming' && <><Clock size={14} />Upcoming</>}
            {status === 'past' && <><AlertCircle size={14} />Past</>}
          </div>

          {/* Featured Badge */}
          {(event.is_featured || featured) && (
            <div className="featured-badge">
              <Star size={14} />
              Featured
            </div>
          )}

          {/* Days Until */}
          {daysUntil && status === 'upcoming' && (
            <div className="days-until">
              {daysUntil}
            </div>
          )}

          {/* Quick Actions */}
          <div className="quick-actions">
            <button 
              className={`action-btn ${isBookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
              title="Bookmark"
            >
              <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button 
              className="action-btn"
              onClick={handleShare}
              title="Share"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Event Content */}
        <div className="event-content">
          {/* Event Meta */}
          <div className="event-meta">
            <span className={`event-type ${event.event_type}`}>
              {event.event_type}
            </span>
            {event.max_participants && (
              <div className="capacity">
                <Users size={14} />
                <span>{event.max_participants}</span>
              </div>
            )}
          </div>

          {/* Event Title */}
          <h3 className="event-title">{event.title}</h3>

          {/* Event Description */}
          <p className="event-description">
            {event.description.length > 120 
              ? `${event.description.substring(0, 120)}...` 
              : event.description
            }
          </p>

          {/* Event Details */}
          <div className="event-details">
            <div className="detail-item">
              <Calendar size={16} />
              <span>{formatDateTime(event.start_datetime)}</span>
            </div>
            <div className="detail-item">
              <MapPin size={16} />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Event Actions - Removed registration */}
          <div className="event-actions">
            <div className="btn btn-outline">
              View Details
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="card-glow"></div>
      </div>
    </div>
  );
};

export default EventCard;
