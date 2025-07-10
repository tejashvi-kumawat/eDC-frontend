import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Plus, 
  Filter,
  Grid,
  List,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  startOfWeek,
  endOfWeek,
  getDay
} from 'date-fns';

// Hooks - COMMENTED OUT
// import { useEvents } from '../hooks/useApi';

// Components - COMMENTED OUT
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';

// Local Data
import { localEventsData } from '../data/eventsData';

// Styles
import '../styles/Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedEventType, setSelectedEventType] = useState('all');

  // API Hook - COMMENTED OUT
  // const { data: eventsData, isLoading, error } = useEvents();
  
  // Use only local data
  const events = localEventsData;

  const eventTypes = [
    { value: 'all', label: 'All Events', color: '#007aff' },
    { value: 'Competition', label: 'Competitions', color: '#ff453a' },
    { value: 'Seminar', label: 'Seminars', color: '#007aff' },
    { value: 'Mentorship', label: 'Mentorship', color: '#32d74b' },
    { value: 'Hackathon', label: 'Hackathons', color: '#af52de' },
    { value: 'Investment Session', label: 'Investment Sessions', color: '#ff9f0a' },
    { value: 'Launch Event', label: 'Launch Events', color: '#5856d6' },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter(event => 
      selectedEventType === 'all' || event.event_type === selectedEventType
    );
  }, [events, selectedEventType]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDate = (date) => {
    return filteredEvents.filter(event => {
      const eventStart = new Date(event.start_datetime);
      return isSameDay(eventStart, date);
    });
  };

  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find(et => et.value === type);
    return eventType ? eventType.color : '#007aff';
  };

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Loading and Error states - COMMENTED OUT
  // if (isLoading) return <LoadingSpinner message="Loading calendar..." />;
  // if (error) return <ErrorMessage message="Failed to load calendar" />;

  return (
    <div className="calendar-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <motion.div
            className="header-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Event Calendar</h1>
            <p>Stay updated with all upcoming events and activities</p>
          </motion.div>
        </div>
      </section>

      {/* Calendar Controls */}
      <section className="calendar-controls">
        <div className="container">
          <div className="controls-header">
            <div className="calendar-navigation">
              <button
                className="nav-btn"
                onClick={previousMonth}
                aria-label="Previous month"
              >
                <ChevronLeft size={20} />
              </button>
              
              <h2 className="current-month">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              
              <button
                className="nav-btn"
                onClick={nextMonth}
                aria-label="Next month"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="calendar-actions">
              <button
                className="btn btn-outline"
                onClick={goToToday}
              >
                Today
              </button>

              <div className="view-controls">
                <button
                  className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
                  onClick={() => setViewMode('month')}
                >
                  <Grid size={18} />
                  Month
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                  List
                </button>
              </div>
            </div>
          </div>

          <div className="event-filters">
            <div className="filter-label">
              <Filter size={16} />
              Filter by type:
            </div>
            <div className="event-type-filters">
              {eventTypes.map(type => (
                <button
                  key={type.value}
                  className={`event-type-filter ${selectedEventType === type.value ? 'active' : ''}`}
                  onClick={() => setSelectedEventType(type.value)}
                  style={{ '--type-color': type.color }}
                >
                  <span className="type-indicator"></span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Content */}
      <section className="calendar-content">
        <div className="container">
          <AnimatePresence mode="wait">
            {viewMode === 'month' ? (
              <motion.div
                key="month-view"
                className="calendar-month-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="calendar-grid">
                  {/* Day Headers */}
                  {dayNames.map(day => (
                    <div key={day} className="day-header">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar Days */}
                  {calendarDays.map((day, index) => {
                    const dayEvents = getEventsForDate(day);
                    const isToday = isSameDay(day, new Date());
                    const isSelected = isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    
                    return (
                      <motion.div
                        key={day.toString()}
                        className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${!isCurrentMonth ? 'other-month' : ''}`}
                        onClick={() => setSelectedDate(day)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.01, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="day-number">
                          {format(day, 'd')}
                        </div>
                        
                        <div className="day-events">
                          {dayEvents.slice(0, 3).map((event, eventIndex) => (
                            <motion.div
                              key={event.id}
                              className="event-dot"
                              style={{ backgroundColor: getEventTypeColor(event.event_type) }}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: eventIndex * 0.1 }}
                              title={event.title}
                            />
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="more-events">
                              +{dayEvents.length - 3}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="list-view"
                className="calendar-list-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <EventsList events={filteredEvents} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Selected Date Events */}
      {viewMode === 'month' && (
        <section className="selected-date-events">
          <div className="container">
            <SelectedDateEvents 
              selectedDate={selectedDate} 
              events={getEventsForDate(selectedDate)} 
            />
          </div>
        </section>
      )}
    </div>
  );
};

// Events List Component
const EventsList = ({ events }) => {
  const groupedEvents = useMemo(() => {
    const groups = {};
    events.forEach(event => {
      const dateKey = format(new Date(event.start_datetime), 'yyyy-MM-dd');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(event);
    });
    return groups;
  }, [events]);

  return (
    <div className="events-list">
      {Object.entries(groupedEvents).map(([date, dayEvents]) => (
        <motion.div
          key={date}
          className="events-day-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="day-group-header">
            <h3>{format(new Date(date), 'EEEE, MMMM d, yyyy')}</h3>
            <span className="events-count">{dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="day-events-list">
            {dayEvents.map((event, index) => (
              <EventListItem key={event.id} event={event} index={index} />
            ))}
          </div>
        </motion.div>
      ))}
      
      {events.length === 0 && (
        <div className="no-events">
          <CalendarIcon size={48} />
          <h3>No events found</h3>
          <p>Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  );
};

// Event List Item Component
const EventListItem = ({ event, index }) => {
  const navigate = useNavigate();
  
  const formatTime = (dateString) => {
    return format(new Date(dateString), 'h:mm a');
  };

  const getEventTypeColor = (type) => {
    const colors = {
      Competition: '#ff453a',
      Seminar: '#007aff',
      Mentorship: '#32d74b',
      Hackathon: '#af52de',
      'Investment Session': '#ff9f0a',
      'Launch Event': '#5856d6'
    };
    return colors[type] || '#007aff';
  };

  const handleViewDetails = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <motion.div
      className="event-list-item"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ x: 10 }}
    >
      <div 
        className="event-type-indicator"
        style={{ backgroundColor: getEventTypeColor(event.event_type) }}
      />
      
      <div className="event-info">
        <h4 className="event-title">{event.title}</h4>
        <div className="event-details">
          <div className="detail-item">
            <Clock size={14} />
            <span>{formatTime(event.start_datetime)} - {formatTime(event.end_datetime)}</span>
          </div>
          <div className="detail-item">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>
          {event.max_participants && (
            <div className="detail-item">
              <Users size={14} />
              <span>{event.max_participants} participants</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="event-actions">
        <button 
          className="btn btn-outline"
          onClick={handleViewDetails}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

// Selected Date Events Component
const SelectedDateEvents = ({ selectedDate, events }) => {
  return (
    <motion.div
      className="selected-date-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="panel-header">
        <h3>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h3>
        <span className="events-count">
          {events.length} event{events.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="panel-content">
        {events.length > 0 ? (
          <div className="selected-events-list">
            {events.map((event, index) => (
              <EventListItem key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : (
          <div className="no-events-selected">
            <CalendarIcon size={32} />
            <p>No events scheduled for this date</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Calendar;
