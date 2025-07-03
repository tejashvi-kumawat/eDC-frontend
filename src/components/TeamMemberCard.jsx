import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Linkedin, 
  Github, 
  Mail, 
  Calendar,
  MapPin,
  User
} from 'lucide-react';
import { getMediaUrl } from '../services/api';

const TeamMemberCard = ({ member, index = 0 }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatJoinDate = (dateString) => {
    try {
      return new Date(dateString).getFullYear();
    } catch {
      return 'Unknown';
    }
  };

  return (
    <motion.div
      className="team-member-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      layout
    >
      {/* Member Image */}
      <div className="member-image">
        {imageError || !member.image ? (
          <div className="image-placeholder">
            <User size={48} />
          </div>
        ) : (
          <img 
            src={getMediaUrl(member.image)} 
            alt={member.name}
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        {/* Position Badge */}
        <div className="position-badge">
          {member.position}
        </div>
      </div>

      {/* Member Content */}
      <div className="member-content">
        {/* Name and Basic Info */}
        <h3 className="member-name">{member.name}</h3>
        
        {/* Bio */}
        {member.bio && (
          <p className="member-bio">
            {member.bio.length > 100 
              ? `${member.bio.substring(0, 100)}...` 
              : member.bio
            }
          </p>
        )}

        {/* Member Details */}
        <div className="member-details">
          {member.joined_date && (
            <div className="detail-item">
              <Calendar size={14} />
              <span>Joined {formatJoinDate(member.joined_date)}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="member-social">
          {member.email && (
            <a 
              href={`mailto:${member.email}`}
              className="social-link email"
              title="Email"
            >
              <Mail size={18} />
            </a>
          )}
          {member.linkedin_url && (
            <a 
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          )}
          {member.github_url && (
            <a 
              href={member.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
              title="GitHub"
            >
              <Github size={18} />
            </a>
          )}
        </div>

        {/* Contact Button */}
        {member.email && (
          <motion.a
            href={`mailto:${member.email}`}
            className="contact-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
        )}
      </div>

      {/* Hover Overlay */}
      <div className="member-overlay">
        <div className="overlay-content">
          <h4>{member.name}</h4>
          <p>{member.position}</p>
          {member.bio && (
            <p className="overlay-bio">{member.bio}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
