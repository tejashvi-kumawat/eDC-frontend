import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Users, 
  Award, 
  Star,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ExternalLink
} from 'lucide-react';

// Hooks - COMMENTED OUT
// import { useTeam } from '../hooks/useApi';

// Components - COMMENTED OUT
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';
// import { getMediaUrl } from '../services/api';

// Local Data
import { localTeamData } from '../data/teamData';

// Styles
import '../styles/Team.css';

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  
  // API Hook - COMMENTED OUT
  // const { data: teamData, isLoading, error } = useTeam();
  
  // Use only local data
  const validTeamMembers = localTeamData;

  const positions = [...new Set(validTeamMembers.map(member => member.position).filter(Boolean))];
  const departments = [...new Set(validTeamMembers.map(member => member.department).filter(Boolean))];

  const positionFilters = [
    { value: 'all', label: 'All Positions' },
    ...positions.map(position => ({ value: position, label: position }))
  ];

  const departmentFilters = [
    { value: 'all', label: 'All Departments' },
    ...departments.map(dept => ({ value: dept, label: dept }))
  ];

  const filteredMembers = useMemo(() => {
    return validTeamMembers.filter(member => {
      const matchesSearch = (member.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (member.position || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (member.bio && member.bio.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesPosition = positionFilter === 'all' || member.position === positionFilter;
      const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;

      return matchesSearch && matchesPosition && matchesDepartment;
    });
  }, [validTeamMembers, searchTerm, positionFilter, departmentFilter]);

  // Group members by hierarchy
  const groupedMembers = useMemo(() => {
    const hierarchy = {
      leadership: [],
      core: [],
      members: []
    };

    filteredMembers.forEach(member => {
      if (['President', 'Vice President', 'Secretary', 'Treasurer'].includes(member.position)) {
        hierarchy.leadership.push(member);
      } else if (['Head', 'Lead', 'Coordinator', 'Manager'].some(title => 
        member.position && member.position.includes(title)
      )) {
        hierarchy.core.push(member);
      } else {
        hierarchy.members.push(member);
      }
    });

    return hierarchy;
  }, [filteredMembers]);

  // Loading and Error states - COMMENTED OUT
  // if (isLoading) return <LoadingSpinner message="Loading team members..." />;
  // if (error) return <ErrorMessage message="Failed to load team members" />;

  return (
    <div className="team-page">
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
            <h1>Our Team</h1>
            <p>Meet the passionate individuals driving innovation and entrepreneurship at eDC IITD</p>
            <div className="header-stats">
              <div className="stat-item">
                <Users size={20} />
                <span>{validTeamMembers.length} Team Members</span>
              </div>
              <div className="stat-item">
                <Award size={20} />
                <span>{groupedMembers.leadership.length} Leadership</span>
              </div>
              <div className="stat-item">
                <Star size={20} />
                <span>{groupedMembers.core.length} Core Team</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="team-controls">
        <div className="container">
          <div className="controls-grid">
            {/* Search */}
            <div className="search-section">
              <div className="search-bar">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="filters-section">
              <select
                value={positionFilter}
                onChange={(e) => setPositionFilter(e.target.value)}
                className="filter-select"
              >
                {positionFilters.map(filter => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              {departments.length > 0 && (
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="filter-select"
                >
                  {departmentFilters.map(filter => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          <div className="results-count">
            <span>{filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''} found</span>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      {groupedMembers.leadership.length > 0 && (
        <section className="team-section leadership-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>
                <Award size={32} />
                Leadership Team
              </h2>
              <p>The visionary leaders guiding eDC IITD towards excellence</p>
            </div>
            
            <div className="team-grid leadership-grid">
              {groupedMembers.leadership.map((member, index) => (
                <TeamMemberCard
                  key={member.id || index}
                  member={member}
                  index={index}
                  featured={true}
                  isLocalData={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Core Team */}
      {groupedMembers.core.length > 0 && (
        <section className="team-section core-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>
                <Star size={32} />
                Core Team
              </h2>
              <p>The dedicated professionals driving our initiatives forward</p>
            </div>
            
            <div className="team-grid core-grid">
              {groupedMembers.core.map((member, index) => (
                <TeamMemberCard
                  key={member.id || index}
                  member={member}
                  index={index}
                  isLocalData={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Members */}
      {groupedMembers.members.length > 0 && (
        <section className="team-section members-section">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <h2>
                <Users size={32} />
                Team Members
              </h2>
              <p>The talented individuals contributing to our success</p>
            </div>
            
            <div className="team-grid members-grid">
              {groupedMembers.members.map((member, index) => (
                <TeamMemberCard
                  key={member.id || index}
                  member={member}
                  index={index}
                  isLocalData={true}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No Members Found */}
      {filteredMembers.length === 0 && validTeamMembers.length > 0 && (
        <section className="no-members">
          <div className="container">
            <div className="no-members-content">
              <Users size={64} />
              <h3>No team members found</h3>
              <p>Try adjusting your search terms or filters.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

// Team Member Card Component
const TeamMemberCard = ({ member, featured = false, index = 0, isLocalData = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Ensure member object has required properties
  if (!member || !member.name) {
    return null;
  }

  // Handle image URL for local data
  const getImageUrl = (imageUrl) => {
    if (isLocalData) {
      return imageUrl || `/team/default-avatar.jpg`;
    }
    return imageUrl;
  };

  const socialLinks = [
    { platform: 'linkedin', icon: Linkedin, url: member.linkedin_url },
    { platform: 'twitter', icon: Twitter, url: member.twitter_url },
    { platform: 'instagram', icon: Instagram, url: member.instagram_url },
  ].filter(link => link.url);

  return (
    <motion.div
      className={`team-member-card ${featured ? 'featured' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10, rotateY: 5, rotateX: 5 }}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Member Image */}
      <div className="member-image">
        <img 
          src={getImageUrl(member.photo) || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=300&background=007aff&color=ffffff`} 
          alt={member.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=300&background=007aff&color=ffffff`;
          }}
          className={imageLoaded ? 'loaded' : ''}
        />
        <div className="image-overlay"></div>
        
        {featured && (
          <div className="featured-badge">
            <Star size={14} />
            Leadership
          </div>
        )}

        {/* Social Links */}
        <div className="social-links">
          {socialLinks.map(({ platform, icon: Icon, url }) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon size={16} />
            </a>
          ))}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="social-link"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Member Content */}
      <div className="member-content">
        <h3 className="member-name">{member.name}</h3>
        <p className="member-position">{member.position || 'Team Member'}</p>
        
        {member.department && (
          <p className="member-department">{member.department}</p>
        )}

        {member.bio && (
          <p className="member-bio">
            {member.bio.length > 120 
              ? `${member.bio.substring(0, 120)}...` 
              : member.bio
            }
          </p>
        )}

        {member.achievements && member.achievements.length > 0 && (
          <div className="member-achievements">
            <h4>Achievements</h4>
            <ul>
              {member.achievements.slice(0, 2).map((achievement, achIndex) => (
                <li key={achIndex}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Card Glow Effect */}
      <div className="card-glow"></div>
    </motion.div>
  );
};

export default Team;
