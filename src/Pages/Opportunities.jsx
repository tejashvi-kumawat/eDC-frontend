import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  ExternalLink,
  Calendar,
  Star,
  TrendingUp,
  Building,
  GraduationCap,
  Users,
  Award
} from 'lucide-react';

// Hooks - COMMENTED OUT
// import { useOpportunities } from '../hooks/useApi';

// Components - COMMENTED OUT
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';
// import { getMediaUrl } from '../services/api';

// Local Data
import { localOpportunitiesData } from '../data/opportunitiesData';

// Styles
import '../styles/Opportunities.css';

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // API Hook - COMMENTED OUT
  // const { data: opportunitiesData, isLoading, error } = useOpportunities();
  
  // Use only local data
  const opportunities = localOpportunitiesData;

  const typeFilters = [
    { value: 'all', label: 'All Types' },
    { value: 'internship', label: 'Internships' },
    { value: 'job', label: 'Jobs' },
    { value: 'fellowship', label: 'Fellowships' },
    { value: 'scholarship', label: 'Scholarships' },
    { value: 'competition', label: 'Competitions' },
  ];

  const locations = [...new Set(opportunities.map(opp => opp.location).filter(Boolean))];
  const locationFilters = [
    { value: 'all', label: 'All Locations' },
    ...locations.map(location => ({ value: location, label: location }))
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'deadline', label: 'By Deadline' },
    { value: 'title', label: 'Alphabetical' },
    { value: 'company', label: 'By Company' },
  ];

  const filteredOpportunities = useMemo(() => {
    let filtered = opportunities.filter(opportunity => {
      const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           opportunity.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || opportunity.opportunity_type === typeFilter;
      const matchesLocation = locationFilter === 'all' || opportunity.location === locationFilter;

      return matchesSearch && matchesType && matchesLocation;
    });

    // Sort opportunities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'company':
          return a.company.localeCompare(b.company);
        case 'recent':
        default:
          return new Date(b.posted_date) - new Date(a.posted_date);
      }
    });

    return filtered;
  }, [opportunities, searchTerm, typeFilter, locationFilter, sortBy]);

  const activeOpportunities = opportunities.filter(opp => opp.is_active);
  const featuredOpportunities = opportunities.filter(opp => opp.is_featured);

  // Loading and Error states - COMMENTED OUT
  // if (isLoading) return <LoadingSpinner message="Loading opportunities..." />;
  // if (error) return <ErrorMessage message="Failed to load opportunities" />;

  return (
    <div className="opportunities-page">
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
            <h1>Opportunities</h1>
            <p>Discover internships, jobs, fellowships, and more to advance your career</p>
            <div className="header-stats">
              <div className="stat-item">
                <TrendingUp size={20} />
                <span>{opportunities.length} Total Opportunities</span>
              </div>
              <div className="stat-item">
                <Briefcase size={20} />
                <span>{activeOpportunities.length} Active</span>
              </div>
              <div className="stat-item">
                <Star size={20} />
                <span>{featuredOpportunities.length} Featured</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Opportunities */}
      {featuredOpportunities.length > 0 && (
        <section className="featured-opportunities-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>
                <Star size={32} />
                Featured Opportunities
              </h2>
              <p>Hand-picked opportunities you shouldn't miss</p>
            </div>
            
            <div className="featured-opportunities-grid">
              {featuredOpportunities.slice(0, 3).map((opportunity, index) => (
                <motion.div
                  key={opportunity.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <OpportunityCard opportunity={opportunity} featured={true} isLocalData={true} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Controls */}
      <section className="opportunities-controls">
        <div className="container">
          <div className="controls-grid">
            {/* Search */}
            <div className="search-section">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="filter-select"
              >
                {typeFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              {locations.length > 0 && (
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="filter-select"
                >
                  {locationFilters.map(filter => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
              )}

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
            <span>{filteredOpportunities.length} opportunit{filteredOpportunities.length !== 1 ? 'ies' : 'y'} found</span>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="opportunities-content">
        <div className="container">
          <AnimatePresence mode="wait">
            {filteredOpportunities.length === 0 ? (
              <motion.div
                className="no-opportunities"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Briefcase size={64} />
                <h3>No opportunities found</h3>
                <p>Try adjusting your search terms or filters.</p>
              </motion.div>
            ) : (
              <motion.div
                className="opportunities-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                {filteredOpportunities.map((opportunity, index) => (
                  <OpportunityCard
                    key={opportunity.id}
                    opportunity={opportunity}
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

// Opportunity Card Component
const OpportunityCard = ({ opportunity, featured = false, index = 0, isLocalData = false }) => {
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

  const getDaysLeft = () => {
    const now = new Date();
    const deadline = new Date(opportunity.deadline);
    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const getTypeIcon = () => {
    switch (opportunity.opportunity_type) {
      case 'internship': return <GraduationCap size={20} />;
      case 'job': return <Briefcase size={20} />;
      case 'fellowship': return <Award size={20} />;
      case 'scholarship': return <Star size={20} />;
      case 'competition': return <TrendingUp size={20} />;
      default: return <Briefcase size={20} />;
    }
  };

  // Handle image URL for local data
  const getImageUrl = (imageUrl) => {
    if (isLocalData) {
      return imageUrl || '/companies/default-company.png';
    }
    return imageUrl;
  };

  const daysLeft = getDaysLeft();
  const isExpired = daysLeft === 'Expired';

  return (
    <motion.div
      className={`opportunity-card ${opportunity.opportunity_type} ${featured ? 'featured' : ''} ${isExpired ? 'expired' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, rotateY: 2, rotateX: 2 }}
      layout
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Company Logo */}
      <div className="company-logo">
        {opportunity.company_logo ? (
          <img 
            src={getImageUrl(opportunity.company_logo)} 
            alt={opportunity.company}
            onError={(e) => {
              e.target.src = '/companies/default-company.png';
            }}
          />
        ) : (
          <div className="logo-placeholder">
            <Building size={24} />
          </div>
        )}
      </div>

      {/* Opportunity Header */}
      <div className="opportunity-header">
        <div className="opportunity-meta">
          <div className={`opportunity-type ${opportunity.opportunity_type}`}>
            {getTypeIcon()}
            {opportunity.opportunity_type}
          </div>
          {featured && (
            <div className="featured-badge">
              <Star size={14} />
              Featured
            </div>
          )}
        </div>

        <h3 className="opportunity-title">{opportunity.title}</h3>
        <p className="company-name">{opportunity.company}</p>
      </div>

      {/* Opportunity Details */}
      <div className="opportunity-details">
        <div className="detail-item">
          <MapPin size={16} />
          <span>{opportunity.location}</span>
        </div>
        
        {opportunity.salary && (
          <div className="detail-item">
            <DollarSign size={16} />
            <span>{opportunity.salary}</span>
          </div>
        )}
        
        <div className="detail-item">
          <Calendar size={16} />
          <span>Deadline: {formatDate(opportunity.deadline)}</span>
        </div>
        
        <div className="detail-item">
          <Clock size={16} />
          <span>Posted: {formatDate(opportunity.posted_date)}</span>
        </div>
      </div>

      {/* Description */}
      <div className="opportunity-description">
        <p>
          {opportunity.description.length > 120 
            ? `${opportunity.description.substring(0, 120)}...` 
            : opportunity.description
          }
        </p>
      </div>

      {/* Requirements */}
      {opportunity.requirements && (
        <div className="opportunity-requirements">
          <h4>Requirements</h4>
          <p>
            {opportunity.requirements.length > 100 
              ? `${opportunity.requirements.substring(0, 100)}...` 
              : opportunity.requirements
            }
          </p>
        </div>
      )}

      {/* Deadline Warning */}
      <div className={`deadline-warning ${isExpired ? 'expired' : ''}`}>
        <Clock size={14} />
        <span>{daysLeft}</span>
      </div>

      {/* Actions - REMOVED APPLICATION LINKS */}
      <div className="opportunity-actions">
        <div className="btn btn-outline disabled">
          View Details
        </div>
      </div>

      {/* Card Glow Effect */}
      <div className="card-glow"></div>
    </motion.div>
  );
};

export default Opportunities;
