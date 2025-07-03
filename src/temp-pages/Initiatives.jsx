import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  TrendingUp, 
  CheckCircle,
  Clock,
  Users,
  Target,
  Lightbulb,
  Award,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

// Hooks - COMMENTED OUT
// import { useInitiatives } from '../hooks/useApi';

// Components - COMMENTED OUT
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';
// import { getMediaUrl } from '../services/api';

// Local Data
import { localInitiativesData } from '../data/initiativesData';

// Styles
import '../styles/Initiatives.css';

const Initiatives = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  
  // API Hook - COMMENTED OUT
  // const { data: initiativesData, isLoading, error } = useInitiatives();
  
  // Use only local data
  const initiatives = localInitiativesData;

  const statusFilters = [
    { value: 'all', label: 'All Initiatives' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'title', label: 'Alphabetical' },
    { value: 'impact', label: 'By Impact' },
  ];

  const filteredInitiatives = useMemo(() => {
    let filtered = initiatives.filter(initiative => {
      const matchesSearch = initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           initiative.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'ongoing' && initiative.is_ongoing) ||
                           (statusFilter === 'completed' && !initiative.is_ongoing);

      return matchesSearch && matchesStatus;
    });

    // Sort initiatives
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'impact':
          return (b.impact_metrics?.length || 0) - (a.impact_metrics?.length || 0);
        case 'recent':
        default:
          return new Date(b.start_date) - new Date(a.start_date);
      }
    });

    return filtered;
  }, [initiatives, searchTerm, statusFilter, sortBy]);

  const ongoingCount = initiatives.filter(i => i.is_ongoing).length;
  const completedCount = initiatives.filter(i => !i.is_ongoing).length;
  const featuredInitiatives = initiatives.filter(i => i.is_featured);

  // Loading state - COMMENTED OUT
  // if (isLoading && !error) {
  //   return <LoadingSpinner message="Loading initiatives..." />;
  // }

  return (
    <div className="initiatives-page">
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
            <h1>Our Initiatives</h1>
            <p>Discover the impactful projects and programs driving innovation at eDC IITD</p>
            <div className="header-stats">
              <div className="stat-item">
                <TrendingUp size={20} />
                <span>{initiatives.length} Total Initiatives</span>
              </div>
              <div className="stat-item">
                <Clock size={20} />
                <span>{ongoingCount} Ongoing</span>
              </div>
              <div className="stat-item">
                <CheckCircle size={20} />
                <span>{completedCount} Completed</span>
              </div>
              <div className="stat-item">
                <Star size={20} />
                <span>{featuredInitiatives.length} Featured</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Initiatives */}
      {featuredInitiatives.length > 0 && (
        <section className="featured-initiatives-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>
                <Star size={32} />
                Featured Initiatives
              </h2>
              <p>Highlighting our most impactful and innovative projects</p>
            </div>
            
            <div className="featured-initiatives-grid">
              {featuredInitiatives.slice(0, 3).map((initiative, index) => (
                <motion.div
                  key={initiative.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <InitiativeCard initiative={initiative} featured={true} isLocalData={true} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Controls */}
      <section className="initiatives-controls">
        <div className="container">
          <div className="controls-grid">
            {/* Search */}
            <div className="search-section">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search initiatives..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                {statusFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
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
          </div>

          <div className="results-count">
            <span>{filteredInitiatives.length} initiative{filteredInitiatives.length !== 1 ? 's' : ''} found</span>
          </div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="initiatives-content">
        <div className="container">
          <AnimatePresence mode="wait">
            {filteredInitiatives.length === 0 ? (
              <motion.div
                className="no-initiatives"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Lightbulb size={64} />
                <h3>No initiatives found</h3>
                <p>Try adjusting your search terms or filters.</p>
              </motion.div>
            ) : (
              <motion.div
                className="initiatives-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                {filteredInitiatives.map((initiative, index) => (
                  <InitiativeCard
                    key={initiative.id}
                    initiative={initiative}
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

// Updated Initiative Card Component
const InitiativeCard = ({ initiative, featured = false, index = 0, isLocalData = false }) => {
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Date TBD';
    }
  };

  // Simplified image URL handling - only local data
  const getImageUrl = (imageUrl) => {
    return imageUrl || '/initiatives/default-initiative.jpg';
  };

  return (
    <motion.div
      className={`initiative-card ${initiative.is_ongoing ? 'ongoing' : 'completed'} ${featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, rotateY: 2, rotateX: 2 }}
      layout
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Initiative Image */}
      <div className="initiative-image">
        <img 
          src={getImageUrl(initiative.image)} 
          alt={initiative.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="image-overlay"></div>
        
        <div className={`initiative-status ${initiative.is_ongoing ? 'ongoing' : 'completed'}`}>
          {initiative.is_ongoing ? (
            <>
              <Zap size={16} />
              Ongoing
            </>
          ) : (
            <>
              <CheckCircle size={16} />
              Completed
            </>
          )}
        </div>

        {featured && (
          <div className="featured-badge">
            <Star size={14} />
            Featured
          </div>
        )}
      </div>

      {/* Initiative Content */}
      <div className="initiative-content">
        <h3 className="initiative-title">{initiative.title}</h3>
        
        <p className="initiative-description">
          {initiative.description.length > 150 
            ? `${initiative.description.substring(0, 150)}...` 
            : initiative.description
          }
        </p>

        {/* Initiative Details */}
        <div className="initiative-details">
          <div className="detail-item">
            <Calendar size={16} />
            <span>Started: {formatDate(initiative.start_date)}</span>
          </div>
          {initiative.end_date && (
            <div className="detail-item">
              <CheckCircle size={16} />
              <span>Ended: {formatDate(initiative.end_date)}</span>
            </div>
          )}
        </div>

        {/* Impact Metrics */}
        {initiative.impact_metrics && (
          <div className="impact-metrics">
            <h4>
              <Award size={16} />
              Impact
            </h4>
            <p>{initiative.impact_metrics}</p>
          </div>
        )}

        {/* Detailed Description */}
        {initiative.detailed_description && (
          <div className="detailed-description">
            <p>{initiative.detailed_description}</p>
          </div>
        )}

        {/* Learn More Button */}
        <div className="initiative-actions">
          <button className="btn btn-outline">
            <span>Learn More</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Card Glow Effect */}
      <div className="card-glow"></div>
    </motion.div>
  );
};

export default Initiatives;
