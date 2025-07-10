import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowRight, 
  Rocket, 
  Target, 
  Lightbulb, 
  TrendingUp,
  Users,
  Calendar,
  BookOpen,
  Award,
  Globe,
  Zap,
  CheckCircle,
  Play,
  ChevronDown,
  Star,
  Sparkles
} from 'lucide-react';

// Hooks - COMMENTED OUT
// import { 
//   useFeaturedEvents, 
//   useFeaturedBlogs, 
//   useDashboardStats 
// } from '../hooks/useApi';

// Components - COMMENTED OUT
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';
import EventCard from '../components/EventCard';
import BlogCard from '../components/BlogCard';

// Local Data
import { localEventsData } from '../data/eventsData';
import { localBlogsData } from '../data/blogsData';

// Styles
import '../styles/Home.css';

const HomePage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  
  // API Hooks - COMMENTED OUT
  // const { data: featuredEvents, isLoading: eventsLoading } = useFeaturedEvents();
  // const { data: featuredBlogs, isLoading: blogsLoading } = useFeaturedBlogs();
  // const { data: stats, isLoading: statsLoading } = useDashboardStats();

  // Use local data
  const featuredEvents = localEventsData.filter(event => event.is_featured);
  const featuredBlogs = localBlogsData.filter(blog => blog.is_featured);

  const [featuresRef, featuresInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [statsRef, statsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [benefitsRef, benefitsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: Target,
      title: 'Innovation Hub',
      description: 'Connecting brilliant minds to create groundbreaking solutions for tomorrow\'s challenges.',
      gradient: 'linear-gradient(135deg, #32d74b 0%, #28a745 100%)',
      delay: 0.1
    },
    
  ];

  const achievements = [
    { icon: Award, number: '50+', label: 'Successful Startups', color: '#32d74b' },
    { icon: Users, number: '500+', label: 'Alumni Network', color: '#007aff' },
    { icon: Globe, number: '15+', label: 'Global Partners', color: '#ff9f0a' },
    { icon: Zap, number: '100+', label: 'Innovation Projects', color: '#af52de' }
  ];

  const benefits = [
    'Access to industry mentors and experts',
    'Funding opportunities and investor connections',
    'State-of-the-art incubation facilities',
    'Comprehensive entrepreneurship curriculum',
    'Global networking and partnership opportunities',
    'Technical and business development support'
  ];

  // Loading states - COMMENTED OUT
  // if (eventsLoading || blogsLoading || statsLoading) {
  //   return <LoadingSpinner message="Loading awesome content..." />;
  // }

  const scrollToNext = () => {
    const nextSection = document.querySelector('.features-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-background"
          style={{ y: y1 }}
        />
        
        <div className="floating-elements">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-element"
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            />
          ))}
        </div>

        <div className="hero-particles">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles size={16} />
                <span>Welcome to the Future</span>
              </motion.div>

              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Entrepreneurship Development Cell
              </motion.h1>
              
              <motion.h2
                className="hero-subtitle"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                IIT Delhi
              </motion.h2>
              
              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Fostering innovation and entrepreneurial spirit among students, 
                connecting them with industry leaders, mentors, and resources to 
                build tomorrow's startups.
              </motion.p>

              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link to="/opportunities" className="btn btn-primary btn-lg hero-cta">
                  <span>Explore Opportunities</span>
                  <ArrowRight size={20} />
                </Link>
                
                <button className="btn btn-outline btn-lg hero-video">
                  <Play size={20} />
                  <span>Watch Video</span>
                </button>
              </motion.div>

              <motion.div
                className="hero-social-proof"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="social-proof-item">
                  <Star className="star-icon" />
                  <span>Rated #1 Entrepreneurship Cell</span>
                </div>
                <div className="social-proof-item">
                  <Users className="users-icon" />
                  <span>500+ Active Members</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{ y: y2, opacity, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: 'min(440px, 80vw)',
                  height: 'min(440px, 80vw)',
                  borderRadius: '50%',
                  background: 'rgba(30, 30, 30, 0.92)',
                  boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  border: '4px solid #ffd700',
                  transition: 'box-shadow 0.2s',
                  padding: '0',
                }}
              >
                <img src="/custom-logo.png" alt="eDC IIT Delhi Logo" style={{ width: '80%', height: '80%', objectFit: 'contain', display: 'block' }} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="scroll-indicator"
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ opacity }}
        >
          <ChevronDown size={24} />
          <span>Scroll to explore</span>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="gradient-text">About eDC</h2>
            <p> </p>
          </motion.div>
          {/* Description placeholder, remove the features grid */}
          <div className="about-description" style={{ marginTop: '2rem', textAlign: 'center', fontSize: '1.2rem' }}>
            <p>
              {/* TODO: Replace this with your actual description */}
              The Entrepreneurship Development Cell (eDC) of IIT Delhi, established in January 2007, is committed to fostering a culture of innovation and entrepreneurship within the student community. With a focus on providing the right resources, mentorship, and support, EDC aims to bridge the gap between innovative ideas and the real-world startup ecosystem.eDC also focuses on cultivating a startup-friendly environment on campus, where creativity, critical thinking, and collaborative efforts thrive. Through a combination of hands-on experiences and expert guidance, eDC empowers students to become change-makers, driving the future of innovation and business.


            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="stats-background"></div>
        <div className="container">
          <div className="achievements-content">
            <motion.div
              className="achievements-text"
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="gradient-text">Our Impact</h2>
              <p>Numbers that speak to our commitment to excellence and innovation</p>
            </motion.div>
            <div className="achievements-grid">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <motion.div
                    key={achievement.label}
                    className="achievement-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 10,
                      rotateX: 5 
                    }}
                    style={{ '--accent-color': achievement.color }}
                  >
                    <div className="achievement-glow"></div>
                    <div className="achievement-icon">
                      <IconComponent size={32} />
                    </div>
                    <span className="achievement-number">{achievement.number}</span>
                    <span className="achievement-label">{achievement.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="featured-events-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="gradient-text">
              <Calendar size={32} />
              Featured Events
            </h2>
            <p>Don't miss out on these exciting upcoming events</p>
          </div>
          
          {featuredEvents?.length > 0 ? (
            <>
              <div className="events-grid">
                {featuredEvents.slice(0, 3).map((event, index) => (
                  <div key={event.id} data-aos="fade-up" data-aos-delay={index * 100}>
                    <EventCard event={event} index={index} isLocalData={true} />
                  </div>
                ))}
              </div>
              <div className="section-cta" data-aos="fade-up">
                <Link to="/events" className="btn btn-outline btn-lg">
                  View All Events
                  <ArrowRight size={20} />
                </Link>
              </div>
            </>
          ) : (
            <div className="no-content" data-aos="fade-up">
              <Calendar size={64} />
              <h3>No featured events available</h3>
              <p>Check back soon for exciting upcoming events!</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="featured-blogs-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="gradient-text">
              <BookOpen size={32} />
              Featured Blogs
            </h2>
            <p>Insights and stories from our community</p>
          </div>
          
          {featuredBlogs?.length > 0 ? (
            <>
              <div className="blogs-grid">
                {featuredBlogs.slice(0, 3).map((blog, index) => (
                  <div key={blog.id} data-aos="fade-up" data-aos-delay={index * 100}>
                    <BlogCard 
                      blog={blog} 
                      index={index} 
                      isLocalData={true} 
                      featured={true} 
                      viewMode="grid"
                      onBlogClick={(blog) => {
                        // Navigate to blogs page with the specific blog
                        window.location.href = `/blogs?blog=${blog.id}`;
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="section-cta" data-aos="fade-up">
                <Link to="/blogs" className="btn btn-outline btn-lg">
                  Read More Blogs
                  <ArrowRight size={20} />
                </Link>
              </div>
            </>
          ) : (
            <div className="no-content" data-aos="fade-up">
              <BookOpen size={64} />
              <h3>No featured blogs available</h3>
              <p>Stay tuned for inspiring stories and insights!</p>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section" ref={benefitsRef}>
        <div className="container">
          <div className="benefits-content">
            <motion.div
              className="benefits-text"
              initial={{ opacity: 0, x: -30 }}
              animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="gradient-text">Why Choose eDC IITD?</h2>
              <p>Join India's premier entrepreneurship community and get access to world-class resources.</p>
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <CheckCircle size={20} />
                    <span>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="benefits-visual"
              initial={{ opacity: 0, x: 30 }}
              animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="benefits-image">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Benefits" 
                />
                <div className="image-overlay"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="cta-text">
              <h2>Ready to Start Your Entrepreneurial Journey?</h2>
              <p>
                Join eDC IITD and be part of a vibrant community of innovators, 
                entrepreneurs, and change-makers who are shaping the future.
              </p>
            </div>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                <Rocket size={20} />
                Get Started
                <ArrowRight size={20} />
              </Link>
              <Link to="/events" className="btn btn-outline btn-lg">
                <Calendar size={20} />
                Explore Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
