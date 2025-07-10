import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowLeft,
  Share2,
  Bookmark,
  Star,
  AlertCircle,
  ExternalLink,
  Tag,
  User,
  DollarSign
} from 'lucide-react';
import { format } from 'date-fns';
import { localEventsData } from '../data/eventsData';
import '../styles/EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const foundEvent = localEventsData.find(e => e.id === parseInt(id));
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [id]);

  const getEventStatus = (event) => {
    const now = new Date();
    const startDate = new Date(event.start_datetime);
    const endDate = new Date(event.end_datetime);

    if (now < startDate) return 'upcoming';
    if (now > endDate) return 'past';
    return 'ongoing';
  };

  const formatDateTime = (dateString) => {
    try {
      return format(new Date(dateString), 'EEEE, MMMM dd, yyyy • h:mm a');
    } catch {
      return 'Date TBD';
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
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
    const placeholderImages = [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ];
    
    const placeholderIndex = (event.id - 1) % placeholderImages.length;
    return imageUrl || placeholderImages[placeholderIndex];
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You can add a toast notification here
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

  if (!event) {
    return (
      <div className="event-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Event Not Found</h2>
            <p>The event you're looking for doesn't exist.</p>
            <Link to="/events" className="btn btn-primary">
              <ArrowLeft size={20} />
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const status = getEventStatus(event);
  const daysUntil = getDaysUntil();

  return (
    <div className="event-detail-page">
      {/* Back Button */}
      <div className="back-button-container">
        <div className="container">
          <button 
            className="back-button"
            onClick={() => navigate('/events')}
          >
            <ArrowLeft size={20} />
            Back to Events
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="event-hero">
        <div className="hero-background">
          {!imageLoaded && !imageError && (
            <div className="image-placeholder">
              <Calendar size={48} />
            </div>
          )}
          <img 
            src={getImageUrl(event.image)} 
            alt={event.title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ 
              opacity: imageLoaded ? 1 : 0,
              display: 'block'
            }}
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <motion.div
              className="hero-badges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`status-badge ${status}`}>
                {status === 'ongoing' && <><div className="live-dot"></div>Live</>}
                {status === 'upcoming' && <><Clock size={16} />Upcoming</>}
                {status === 'past' && <><AlertCircle size={16} />Past</>}
              </div>
              
              {event.is_featured && (
                <div className="featured-badge">
                  <Star size={16} />
                  Featured
                </div>
              )}
              
              <div className="type-badge">
                {event.event_type}
              </div>
            </motion.div>

            <motion.h1
              className="event-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {event.title}
            </motion.h1>

            <motion.p
              className="event-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {event.description}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                className={`action-btn bookmark-btn ${isBookmarked ? 'active' : ''}`}
                onClick={handleBookmark}
              >
                <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
              
              <button 
                className="action-btn share-btn"
                onClick={handleShare}
              >
                <Share2 size={20} />
                Share
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="event-details">
        <div className="container">
          <div className="details-grid">
            {/* Main Content */}
            <div className="main-content">
              <motion.div
                className="content-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2>About This Event</h2>
                <p className="event-description">{event.description}</p>
              </motion.div>

              {/* Event Information */}
              <motion.div
                className="content-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2>Event Information</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <Calendar size={20} />
                    <div>
                      <h4>Date & Time</h4>
                      <p>{formatDateTime(event.start_datetime)}</p>
                      {event.end_datetime && event.end_datetime !== event.start_datetime && (
                        <p className="end-time">Ends: {formatDateTime(event.end_datetime)}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <MapPin size={20} />
                    <div>
                      <h4>Location</h4>
                      <p>{event.location}</p>
                    </div>
                  </div>
                  
                  {event.max_participants && (
                    <div className="info-item">
                      <Users size={20} />
                      <div>
                        <h4>Capacity</h4>
                        <p>{event.max_participants} participants</p>
                      </div>
                    </div>
                  )}
                  
                  {event.organizer && (
                    <div className="info-item">
                      <User size={20} />
                      <div>
                        <h4>Organizer</h4>
                        <p>{event.organizer}</p>
                      </div>
                    </div>
                  )}
                  
                  {event.entry_fee !== undefined && (
                    <div className="info-item">
                      <DollarSign size={20} />
                      <div>
                        <h4>Entry Fee</h4>
                        <p>{event.entry_fee === 0 ? 'Free' : `₹${event.entry_fee}`}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Requirements */}
              {event.requirements && (
                <motion.div
                  className="content-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <h2>Requirements</h2>
                  <p>{event.requirements}</p>
                </motion.div>
              )}

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <motion.div
                  className="content-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <h2>Tags</h2>
                  <div className="tags-container">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        <Tag size={14} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="sidebar">
              <motion.div
                className="sidebar-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3>Event Status</h3>
                <div className={`status-indicator ${status}`}>
                  <div className="status-dot"></div>
                  <span className="status-text">
                    {status === 'ongoing' && 'Live Now'}
                    {status === 'upcoming' && 'Upcoming'}
                    {status === 'past' && 'Completed'}
                  </span>
                </div>
                
                {daysUntil && status === 'upcoming' && (
                  <div className="countdown">
                    <Clock size={16} />
                    <span>{daysUntil} until event</span>
                  </div>
                )}
              </motion.div>

              {event.speakers && event.speakers.length > 0 && (
                <motion.div
                  className="sidebar-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <h3>Speakers</h3>
                  <div className="speakers-list">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="speaker-item">
                        <div className="speaker-avatar">
                          <User size={20} />
                        </div>
                        <div className="speaker-info">
                          <h4>{speaker.name}</h4>
                          <p>{speaker.designation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {event.prizes && (
                <motion.div
                  className="sidebar-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <h3>Prizes</h3>
                  <div className="prizes-list">
                    {Object.entries(event.prizes).map(([key, value]) => (
                      <div key={key} className="prize-item">
                        <h4>{key.replace('_', ' ').toUpperCase()}</h4>
                        <p>{value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;
