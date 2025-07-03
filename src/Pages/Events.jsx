import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Grid,
  List,
  Star,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

// Local Data
import { localEventsData } from '../data/eventsData';

// Styles
import '../styles/Events.css';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');

  // Use only local data
  const events = localEventsData;

  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'workshop', label: 'Workshops' },
    { value: 'seminar', label: 'Seminars' },
    { value: 'competition', label: 'Competitions' },
    { value: 'meetup', label: 'Meetups' },
    { value: 'conference', label: 'Conferences' },
  ];

  const statusFilters = [
    { value: 'all', label: 'All Status' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'past', label: 'Past' },
  ];

  const sortOptions = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'title', label: 'Sort by Title' },
    { value: 'type', label: 'Sort by Type' },
    { value: 'popularity', label: 'Sort by Popularity' },
  ];

  const getEventStatus = (event) => {
    const now = new Date();
    const startDate = new Date(event.start_datetime);
    const endDate = new Date(event.end_datetime);

    if (now < startDate) return 'upcoming';
    if (now > endDate) return 'past';
    return 'ongoing';
  };

  const filteredEvents = useMemo(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'all' || event.event_type === selectedType;
      
      const eventStatus = getEventStatus(event);
      const matchesStatus = selectedStatus === 'all' || eventStatus === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.start_datetime) - new Date(b.start_datetime);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'type':
          return a.event_type.localeCompare(b.event_type);
        case 'popularity':
          return (b.max_participants || 0) - (a.max_participants || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, searchTerm, selectedType, selectedStatus, sortBy]);

  const featuredEvents = events.filter(event => event.is_featured);
  const upcomingEvents = events.filter(event => getEventStatus(event) === 'upcoming');
  const ongoingEvents = events.filter(event => getEventStatus(event) === 'ongoing');

  return (
    <div className="events-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="header-background"></div>
        <div className="container">
          <motion.div
            className="header-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Events</h1>
            <p>Discover workshops, seminars, competitions, and networking opportunities</p>
            <div className="header-stats">
              <div className="stat-item">
                <TrendingUp size={20} />
                <span>{events.length} Total Events</span>
              </div>
              <div className="stat-item">
                <Calendar size={20} />
                <span>{upcomingEvents.length} Upcoming</span>
              </div>
              <div className="stat-item">
                <Clock size={20} />
                <span>{ongoingEvents.length} Ongoing</span>
              </div>
              <div className="stat-item">
                <Star size={20} />
                <span>{featuredEvents.length} Featured</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <section className="featured-events-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>
                <Star size={32} />
                Featured Events
              </h2>
              <p>Don't miss these highlighted events</p>
            </div>
            
            <div className="featured-events-grid">
              {featuredEvents.slice(0, 3).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard event={event} featured={true} isLocalData={true} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filters and Search */}
      <section className="events-controls">
        <div className="container">
          <div className="controls-grid">
            {/* Search Bar */}
            <div className="search-section">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="filter-select"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter-select"
              >
                {statusFilters.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
              >
                <Grid size={20} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="results-count">
            <span>{filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found</span>
          </div>
        </div>
      </section>

      {/* Events Grid/List */}
      <section className="events-content">
        <div className="container">
          <AnimatePresence mode="wait">
            {filteredEvents.length === 0 ? (
              <motion.div
                className="no-events"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Calendar size={64} />
                <h3>No events found</h3>
                <p>Try adjusting your filters or search terms.</p>
              </motion.div>
            ) : (
              <motion.div
                className={`events-${viewMode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                {filteredEvents.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    viewMode={viewMode}
                    index={index}
                    isLocalData={true}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

// Event Card Component (Registration Removed)
const EventCard = ({ event, featured = false, viewMode = 'grid', index = 0, isLocalData = false }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Date TBD';
    }
  };

  const getEventStatus = (event) => {
    const now = new Date();
    const startDate = new Date(event.start_datetime);
    const endDate = new Date(event.end_datetime);

    if (now < startDate) return 'upcoming';
    if (now > endDate) return 'past';
    return 'ongoing';
  };

  const getImageUrl = (imageUrl) => {
    if (isLocalData) {
      return imageUrl || '/events/default-event.jpg';
    }
    return imageUrl;
  };

  const eventStatus = getEventStatus(event);

  return (
    <motion.div
      className={`event-card ${featured ? 'featured' : ''} ${viewMode} ${eventStatus}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      layout
    >
      {/* Event Image */}
      <div className="event-image">
        <img 
          src={getImageUrl(event.image)} 
          alt={event.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="image-overlay"></div>
        
        <div className={`event-status ${eventStatus}`}>
          {eventStatus === 'upcoming' && <Clock size={14} />}
          {eventStatus === 'ongoing' && <AlertCircle size={14} />}
          {eventStatus === 'past' && <Calendar size={14} />}
          {eventStatus.charAt(0).toUpperCase() + eventStatus.slice(1)}
        </div>

        {featured && (
          <div className="featured-badge">
            <Star size={14} />
            Featured
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="event-content">
        <div className="event-type">{event.event_type}</div>
        <h3 className="event-title">{event.title}</h3>
        
        <p className="event-description">
          {event.description.length > 120 
            ? `${event.description.substring(0, 120)}...` 
            : event.description
          }
        </p>

        <div className="event-details">
          <div className="detail-item">
            <Calendar size={16} />
            <span>{formatDate(event.start_datetime)}</span>
          </div>
          <div className="detail-item">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
          <div className="detail-item">
            <Users size={16} />
            <span>{event.max_participants} participants</span>
          </div>
        </div>

        {/* Entry fee information (kept for display only) */}
        {event.entry_fee !== undefined && (
          <div className="event-fee">
            <strong>
              {event.entry_fee === 0 ? 'Free Event' : `Entry Fee: ₹${event.entry_fee}`}
            </strong>
          </div>
        )}

        {/* Registration actions removed */}
        {/* Event organizer info */}
        {/* <div className="event-organizer">
          <span>Organized by: {event.organizer}</span>
        </div> */}
      </div>
    </motion.div>
  );
};

export default Events;
