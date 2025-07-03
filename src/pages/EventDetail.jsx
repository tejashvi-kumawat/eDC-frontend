import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ExternalLink, 
  ArrowLeft,
  Share2,
  Bookmark,
  User,
  Phone,
  Mail,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import { format } from 'date-fns';

// Hooks
import { useEvent, useEvents } from '../hooks/useApi';

// Components
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import EventCard from '../components/Events/EventCard';
import { getMediaUrl } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const { data: event, isLoading, error } = useEvent(id);
  const { data: relatedEventsData } = useEvents({ limit: 3 });

  const eventData = event?.data;
  const relatedEvents = relatedEventsData?.data?.results || relatedEventsData?.data || [];
  const filteredRelatedEvents = relatedEvents
    .filter(relatedEvent => relatedEvent.id !== parseInt(id))
    .slice(0, 3);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getEventStatus = () => {
    if (!eventData) return 'unknown';
    const now = new Date();
    const startDate = new Date(eventData.start_datetime);
    const endDate = new Date(eventData.end_datetime);

    if (now < startDate) return 'upcoming';
    if (now > endDate) return 'past';
    return 'ongoing';
  };

  const formatDateTime = (dateString) => {
    try {
      return format(new Date(dateString), 'EEEE, MMMM dd, yyyy \'at\' h:mm a');
    } catch {
      return 'Date TBD';
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Date TBD';
    }
  };

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: eventData.title,
        text: eventData.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const saveEvent = () => {
    // Implement save/bookmark functionality
    console.log('Event saved');
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || !eventData) return <ErrorMessage message="Event not found" />;

  const status = getEventStatus();
  const isPast = status === 'past';
  const isUpcoming = status === 'upcoming';
  const isOngoing = status === 'ongoing';

  return (
    <div className="event-detail-page">
      {/* Back Navigation */}
      <div className="container">
        <motion.div
          className="back-navigation"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/events" className="back-link">
            <ArrowLeft size={20} />
            Back to Events
          </Link>
        </motion.div>
      </div>

      {/* Event Header */}
      <section className="event-header">
        <div className="container">
          <div className="event-header-content">
            {/* Event Image */}
            <motion.div
              className="event-image-section"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={getMediaUrl(eventData.image) || '/images/default-event.jpg'} 
                alt={eventData.title}
                className={isPast ? 'grayscale' : ''}
              />
              <div className="event-overlay">
                <div className={`event-status ${status}`}>
                  {isOngoing && <><CheckCircle size={16} /> Live Now</>}
                  {isUpcoming && <><Clock size={16} /> Upcoming</>}
                  {isPast && <><AlertCircle size={16} /> Past Event</>}
                </div>
                {eventData.is_featured && (
                  <div className="featured-badge">Featured</div>
                )}
              </div>
            </motion.div>

            {/* Event Info */}
            <motion.div
              className="event-info-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Event Type */}
              <div className="event-type-badge">
                {eventData.event_type}
              </div>

              {/* Event Title */}
              <h1 className="event-title">{eventData.title}</h1>

              {/* Event Meta */}
              <div className="event-meta">
                <div className="meta-item">
                  <Calendar size={20} />
                  <div>
                    <strong>Date & Time</strong>
                    <p>{formatDateTime(eventData.start_datetime)}</p>
                    {eventData.end_datetime && eventData.start_datetime !== eventData.end_datetime && (
                      <p>Ends: {formatDateTime(eventData.end_datetime)}</p>
                    )}
                  </div>
                </div>

                <div className="meta-item">
                  <MapPin size={20} />
                  <div>
                    <strong>Location</strong>
                    <p>{eventData.location}</p>
                    {eventData.venue_details && (
                      <p className="venue-details">{eventData.venue_details}</p>
                    )}
                  </div>
                </div>

                {eventData.max_participants && (
                  <div className="meta-item">
                    <Users size={20} />
                    <div>
                      <strong>Capacity</strong>
                      <p>{eventData.max_participants} participants</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Registration Info */}
              {eventData.registration_deadline && isUpcoming && (
                <div className="registration-info">
                  <Clock size={16} />
                  <span>Register by {formatDate(eventData.registration_deadline)}</span>
                </div>
              )}

              {/* Event Actions */}
              <div className="event-actions">
                {eventData.registration_link && isUpcoming && (
                  <a
                    href={eventData.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                  >
                    Register Now
                    <ExternalLink size={20} />
                  </a>
                )}

                <button 
                  className="btn btn-outline"
                  onClick={shareEvent}
                >
                  <Share2 size={18} />
                  Share
                </button>

                <button 
                  className="btn btn-outline"
                  onClick={saveEvent}
                >
                  <Bookmark size={18} />
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Description */}
      <section className="event-description-section">
        <div className="container">
          <motion.div
            className="event-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2>About This Event</h2>
            <div className="description-content">
              <p>{eventData.description}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Details Grid */}
      <section className="event-details-section">
        <div className="container">
          <div className="details-grid">
            {/* Event Information */}
            <motion.div
              className="details-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>
                <Info size={24} />
                Event Information
              </h3>
              <div className="info-list">
                <div className="info-item">
                  <strong>Type:</strong>
                  <span>{eventData.event_type}</span>
                </div>
                <div className="info-item">
                  <strong>Duration:</strong>
                  <span>
                    {(() => {
                      try {
                        const start = new Date(eventData.start_datetime);
                        const end = new Date(eventData.end_datetime);
                        const duration = Math.ceil((end - start) / (1000 * 60 * 60));
                        return `${duration} hour${duration !== 1 ? 's' : ''}`;
                      } catch {
                        return 'TBD';
                      }
                    })()}
                  </span>
                </div>
                {eventData.max_participants && (
                  <div className="info-item">
                    <strong>Max Participants:</strong>
                    <span>{eventData.max_participants}</span>
                  </div>
                )}
                <div className="info-item">
                  <strong>Status:</strong>
                  <span className={`status-text ${status}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="details-card"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3>
                <User size={24} />
                Contact & Support
              </h3>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={18} />
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:events@edciitd.com">events@edciitd.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <div>
                    <strong>Phone</strong>
                    <a href="tel:+911234567890">+91 12345 67890</a>
                  </div>
                </div>
                <div className="contact-item">
                  <MapPin size={18} />
                  <div>
                    <strong>Address</strong>
                    <span>IIT Delhi, Hauz Khas, New Delhi</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Events */}
      {filteredRelatedEvents.length > 0 && (
        <section className="related-events-section">
          <div className="container">
            <div className="section-header">
              <h2>More Events You Might Like</h2>
            </div>
            
            <div className="related-events-grid">
              {filteredRelatedEvents.map((relatedEvent, index) => (
                <EventCard
                  key={relatedEvent.id}
                  event={relatedEvent}
                  index={index}
                />
              ))}
            </div>

            <div className="view-all-events">
              <Link to="/events" className="btn btn-outline">
                View All Events
                <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EventDetail;
