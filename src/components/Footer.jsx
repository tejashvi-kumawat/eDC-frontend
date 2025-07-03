import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ExternalLink,
  Heart,
  ArrowUp
} from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/initiatives' },
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Opportunities', path: '/opportunities' },
  ];

  const resources = [
    { name: 'Blogs', path: '/blogs' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://facebook.com/edciitd',
      color: '#1877F2' 
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      url: 'https://twitter.com/edciitd',
      color: '#1DA1F2' 
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://instagram.com/edciitd',
      color: '#E4405F' 
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://linkedin.com/company/edciitd',
      color: '#0A66C2' 
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-pattern"></div>
      </div>
      
      <div className="footer-content">
        <div className="footer-grid">
          {/* Logo and Description */}
          <div className="footer-section" data-aos="fade-up">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">
                <span>eDC</span>
              </div>
              <span className="footer-logo-text">IITD</span>
            </Link>
            <p className="footer-description">
              Fostering innovation and entrepreneurial spirit among students at 
              IIT Delhi, connecting them with industry leaders, mentors, and resources 
              to build tomorrow's startups.
            </p>
            <div className="social-links">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ '--hover-color': social.color }}
                    aria-label={social.name}
                    data-tooltip={social.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section" data-aos="fade-up" data-aos-delay="100">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link">
                    <span>{link.name}</span>
                    <ArrowUp size={14} className="link-arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section" data-aos="fade-up" data-aos-delay="200">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-links">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="footer-link">
                    <span>{link.name}</span>
                    <ArrowUp size={14} className="link-arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section" data-aos="fade-up" data-aos-delay="300">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={18} />
                </div>
                <span>IIT Delhi, Hauz Khas, New Delhi - 110016</span>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={18} />
                </div>
                <a href="mailto:contact@edciitd.com">contact@edciitd.com</a>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={18} />
                </div>
                <a href="tel:+911234567890">+91 12345 67890</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} eDC IITD. All rights reserved.</p>
            <p className="footer-love">
              Made with <Heart size={16} className="heart-icon" /> by eDC Tech Team
            </p>
          </div>
          
          <button 
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
