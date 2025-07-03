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
import { getMediaUrl } from '../services/api';
import '../styles/EventCard.css';

const EventCard = ({ 
  event, 
  featured = false, 
  viewMode = 'grid', 
  index = 0 
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.origin + `/events/${event.id}`,
      });
    }
  };

  const status = getEventStatus();
  const daysUntil = getDaysUntil();

  return (
    <div 
      className={`event-card ${status} ${viewMode} ${featured ? 'featured' : ''}`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <Link to={`/events/${event.id}`} className="event-link">
        {/* Event Image */}
        <div className="event-image">
          <img 
            src={getMediaUrl(event.image) || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
            alt={event.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={imageLoaded ? 'loaded' : ''}
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

          {/* Registration Deadline */}
          {event.registration_deadline && status === 'upcoming' && (
            <div className="registration-deadline">
              <Clock size={14} />
              <span>Register by {formatDate(event.registration_deadline)}</span>
            </div>
          )}

          {/* Event Actions */}
          <div className="event-actions">
            {event.registration_link && status === 'upcoming' ? (
              <a
                href={event.registration_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                onClick={(e) => e.stopPropagation()}
              >
                Register Now
                <ExternalLink size={16} />
              </a>
            ) : (
              <div className="btn btn-outline disabled">
                {status === 'past' ? 'Event Ended' : 'Registration Closed'}
              </div>
            )}
          </div>
        </div>

        {/* Hover Effect */}
        <div className="card-glow"></div>
      </Link>
    </div>
  );
};

export default EventCard;
