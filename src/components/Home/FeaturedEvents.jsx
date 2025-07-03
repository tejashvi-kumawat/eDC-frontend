import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import EventCard from '../Events/EventCard';

const FeaturedEvents = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <section className="featured-events-section">
        <div className="container">
          <div className="section-header">
            <h2>
              <Calendar size={24} />
              Featured Events
            </h2>
          </div>
          <div className="no-events">
            <p>No featured events available at the moment.</p>
            <Link to="/events" className="btn btn-primary">
              View All Events
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-events-section">
      <div className="container">
        <div className="section-header">
          <h2>
            <Calendar size={24} />
            Featured Events
          </h2>
          <p>Don't miss out on these exciting upcoming events</p>
        </div>
        
        <div className="featured-events-grid">
          {events.slice(0, 3).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>

        <div className="section-cta">
          <Link to="/events" className="btn btn-outline">
            View All Events
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
