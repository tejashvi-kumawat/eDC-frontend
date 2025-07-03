import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, BookOpen, Target } from 'lucide-react';

const StatsSection = ({ stats }) => {
  const statsData = [
    {
      icon: Users,
      value: stats?.teamMembers || 50,
      label: 'Active Members',
      color: '#4CAF50'
    },
    {
      icon: Target,
      value: stats?.activeInitiatives || 25,
      label: 'Active Initiatives', 
      color: '#2196F3'
    },
    {
      icon: Calendar,
      value: stats?.upcomingEvents || 15,
      label: 'Upcoming Events',
      color: '#FF9800'
    },
    {
      icon: BookOpen,
      value: stats?.publishedBlogs || 30,
      label: 'Published Blogs',
      color: '#E91E63'
    }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div 
                  className="stat-icon"
                  style={{ color: stat.color }}
                >
                  <IconComponent size={32} />
                </div>
                <div className="stat-number">{stat.value}+</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
