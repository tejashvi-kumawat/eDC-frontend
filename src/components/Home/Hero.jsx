import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});

  const slides = [
    {
      title: "Entrepreneurship Development Cell",
      subtitle: "IIT Delhi",
      description: "Fostering innovation and entrepreneurial spirit among students, connecting them with industry leaders, mentors, and resources.",
      image: "/images/hero-1.jpg",
      cta: "Explore Opportunities",
      alt: "Innovation and technology workspace"
    },
    {
      title: "Innovation Meets Excellence",
      subtitle: "Where Ideas Come to Life",
      description: "Join a community of forward-thinking individuals who are passionate about creating solutions for tomorrow's challenges.",
      image: "/images/hero-2.jpg",
      cta: "Join Our Community",
      alt: "Collaborative team working together"
    },
    {
      title: "Build the Future",
      subtitle: "Start Your Journey",
      description: "Access mentorship, funding opportunities, and resources to transform your innovative ideas into successful ventures.",
      image: "/images/hero-3.jpg",
      cta: "Get Started Today",
      alt: "Startup business environment"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Preload images
  useEffect(() => {
    slides.forEach((slide, index) => {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(prev => ({ ...prev, [index]: true }));
      };
      img.src = slide.image;
    });
  }, [slides]);

  const handleImageError = (e, slideIndex) => {
    console.warn(`Failed to load image for slide ${slideIndex}, using default`);
    e.target.src = '/images/hero-default.jpg';
  };

  const scrollToNext = () => {
    const nextSection = document.querySelector('.features-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            {/* Background Image */}
            <div className="hero-bg">
              <img 
                src={slide.image} 
                alt={slide.alt}
                loading={index === 0 ? "eager" : "lazy"} // Eager load first image
                onError={(e) => handleImageError(e, index)}
                className={imageLoaded[index] ? 'loaded' : 'loading'}
              />
              <div className="hero-overlay"></div>
            </div>

            {/* Content */}
            <div className="hero-content">
              <motion.div
                className="hero-text"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {slide.title}
                </motion.h1>
                
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  {slide.subtitle}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  className="hero-buttons"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  <Link to="/opportunities" className="btn btn-primary">
                    {slide.cta}
                    <ArrowRight size={20} />
                  </Link>
                  
                  <button className="btn btn-secondary">
                    <Play size={20} />
                    Watch Video
                  </button>
                </motion.div>
              </motion.div>

              {/* Stats Preview */}
              <motion.div
                className="hero-stats"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.8 }}
              >
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Active Members</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Events</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Startups</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        className="scroll-indicator"
        onClick={scrollToNext}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={24} />
        <span>Explore More</span>
      </motion.button>
    </section>
  );
};

export default Hero;
