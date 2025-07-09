import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from 'react-intersection-observer';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  TrendingUp,
  Lightbulb,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Rocket,
  Zap
} from 'lucide-react';

// Hooks
import { useDashboardStats } from '../hooks/useApi';
import { localTeamData } from '../data/teamData';

// Components
import LoadingSpinner from '../components/LoadingSpinner';
import TeamMemberCard from '../components/Team/TeamMemberCard';

// Styles
import '../styles/About.css';

const About = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  const teamGroups = localTeamData;

  const [missionRef, missionInView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [valuesRef, valuesInView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [timelineRef, timelineInView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const values = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We believe in pushing boundaries and creating solutions that make a real difference in the world.',
      color: '#4CAF50'
    },
    {
      icon: Users,
      title: 'Collaborative Spirit',
      description: 'We foster an environment where diverse minds come together to create something extraordinary.',
      color: '#2196F3'
    },
    {
      icon: TrendingUp,
      title: 'Growth Mindset',
      description: 'We embrace challenges as opportunities to learn, grow, and become better versions of ourselves.',
      color: '#FF9800'
    },
    {
      icon: Heart,
      title: 'Impact Driven',
      description: 'Every initiative we undertake is designed to create meaningful impact for our community and beyond.',
      color: '#E91E63'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Recognition',
      items: [
        'Best Entrepreneurship Cell - IIT Delhi 2023',
        'Outstanding Innovation Award 2022',
        'Excellence in Student Engagement 2021'
      ]
    },
    {
      icon: Globe,
      title: 'Global Reach',
      items: [
        'Partnerships with 15+ international universities',
        'Global startup accelerator programs',
        'International mentorship network'
      ]
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      items: [
        '50+ successful startup launches',
        '100+ innovation projects supported',
        '200+ patents filed by members'
      ]
    }
  ];

  const milestones = [
    { year: '2015', event: 'eDC IITD Founded', description: 'Established with a vision to foster entrepreneurship' },
    { year: '2017', event: 'First Startup Incubated', description: 'Successfully launched our first startup venture' },
    { year: '2019', event: 'International Partnerships', description: 'Formed partnerships with global universities' },
    { year: '2021', event: 'Innovation Lab Launch', description: 'Opened state-of-the-art innovation laboratory' },
    { year: '2023', event: 'Alumni Network of 1000+', description: 'Built a strong network of successful entrepreneurs' },
    { year: '2025', event: 'AI & Tech Focus', description: 'Expanded focus to emerging technologies and AI' }
  ];

  if (statsLoading) {
    return <LoadingSpinner message="Loading about information..." />;
  }

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-background"></div>
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>About eDC IITD</h1>
            <p className="hero-subtitle">
              Empowering the next generation of entrepreneurs and innovators at IIT Delhi
            </p>
            <p className="hero-description">
              We are more than just an entrepreneurship cell. We are a community of dreamers, 
              innovators, and changemakers who believe in the power of ideas to transform the world. 
              Since our inception, we have been at the forefront of fostering entrepreneurial 
              thinking and supporting budding entrepreneurs in their journey from ideation to implementation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="mission-vision-section" ref={missionRef}>
        <div className="container">
          <div className="mvv-grid">
            <motion.div
              className="mvv-card mission"
              initial={{ opacity: 0, x: -30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="mvv-icon">
                <Target size={48} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To cultivate an ecosystem of innovation and entrepreneurship at IIT Delhi, 
                providing students with the resources, mentorship, and opportunities needed 
                to transform their ideas into impactful ventures that address real-world challenges.
              </p>
            </motion.div>

            <motion.div
              className="mvv-card vision"
              initial={{ opacity: 0, y: 30 }}
              animate={missionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mvv-icon">
                <Eye size={48} />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the leading entrepreneurship hub that bridges the gap between academic 
                excellence and industry innovation, creating a generation of entrepreneurs 
                who drive positive change in society through technology and innovation.
              </p>
            </motion.div>

            <motion.div
              className="mvv-card values"
              initial={{ opacity: 0, x: 30 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mvv-icon">
                <Heart size={48} />
              </div>
              <h3>Our Values</h3>
              <p>
                We believe in integrity, innovation, collaboration, and excellence. 
                Our commitment to these values drives everything we do, from supporting 
                startups to organizing events that inspire and educate our community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Detail */}
      <section className="values-detail-section" ref={valuesRef}>
        <div className="container">
          <div className="section-header">
            <h2>What Drives Us</h2>
            <p>The core values that shape our culture and guide our actions</p>
          </div>
          
          <div className="values-grid">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="value-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ y: -10 }}
                >
                  <div 
                    className="value-icon"
                    style={{ backgroundColor: `${value.color}20`, color: value.color }}
                  >
                    <IconComponent size={32} />
                  </div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics */}
      {stats?.data && (
        <section className="stats-section">
          <div className="container">
            <motion.div
              className="stats-grid"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="stat-card">
                <Rocket size={32} />
                <div className="stat-number">{stats.data.teamMembers || 50}+</div>
                <div className="stat-label">Active Members</div>
              </div>
              <div className="stat-card">
                <Zap size={32} />
                <div className="stat-number">{stats.data.activeInitiatives || 25}+</div>
                <div className="stat-label">Active Initiatives</div>
              </div>
              <div className="stat-card">
                <Star size={32} />
                <div className="stat-number">{stats.data.upcomingEvents || 15}+</div>
                <div className="stat-label">Annual Events</div>
              </div>
              <div className="stat-card">
                <Globe size={32} />
                <div className="stat-number">1000+</div>
                <div className="stat-label">Alumni Network</div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Timeline */}
      <section className="timeline-section" ref={timelineRef}>
        <div className="container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Milestones that mark our growth and evolution</p>
          </div>
          
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h4>{milestone.event}</h4>
                  <p>{milestone.description}</p>
                </div>
                <div className="timeline-marker">
                  <Star size={20} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Achievements</h2>
            <p>Recognition and milestones that showcase our impact</p>
          </div>
          
          <div className="achievements-grid">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={achievement.title}
                  className="achievement-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="achievement-icon">
                    <IconComponent size={32} />
                  </div>
                  <h4>{achievement.title}</h4>
                  <ul>
                    {achievement.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <CheckCircle size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section - Grouped by Vertical */}
      <section className="team-section-grouped">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate coordinators driving eDC IITD</p>
          </div>
          {teamGroups.map((group, groupIdx) => (
            <div key={group.vertical} className="team-vertical-group">
              <h3 className="vertical-heading">{group.vertical}</h3>
              <div className="team-grid">
                {group.coordinators.map((member, idx) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Join Our Community?</h2>
            <p>
              Whether you're an aspiring entrepreneur, an innovator with an idea, 
              or someone passionate about creating change, there's a place for you at eDC IITD.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get in Touch
                <ArrowRight size={20} />
              </Link>
              <Link to="/events" className="btn btn-outline btn-lg">
                Explore Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
