import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for background changes
      setIsScrolled(currentScrollY > 50);
      
      // Hide/show navbar based on scroll direction (Fueled-style behavior)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      // Always show navbar at the top
      if (currentScrollY <= 100) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);
  useEffect(() => {
  document.body.style.overflow = isOpen ? 'hidden' : 'auto';
}, [isOpen]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/initiatives', label: 'Initiatives' },
    { path: '/team', label: 'About Us' },
    { path: '/events', label: 'Events' },
    { path: '/becon', label: 'BECon' },
    { path: '/opportunities', label: 'Opportunities' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/calendar', label: 'Calendar' },
    { path: '/contact', label: 'Contact' },
  ];

  const adminItems = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/blogs', label: 'Manage Blogs' },
    { path: '/admin/team', label: 'Manage Team' },
    { path: '/admin/events', label: 'Manage Events' },
    { path: '/admin/initiatives', label: 'Manage Initiatives' },
    { path: '/admin/queries', label: 'Contact Queries' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isVisible ? 'visible' : 'hidden'} ${isOpen ? 'blur-on-menu' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/custom-logo.png" alt="Custom Logo" style={{ height: '40px', width: 'auto' }} />
        </Link>

        <div className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          
          {/* <div 
            className="nav-dropdown"
            onMouseEnter={() => setActiveDropdown('admin')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="nav-link dropdown-trigger">
              Admin
              <ChevronDown size={16} className={activeDropdown === 'admin' ? 'rotated' : ''} />
            </button>
            <div className={`dropdown-menu ${activeDropdown === 'admin' ? 'active' : ''}`}>
              {adminItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="dropdown-link"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div> */}
        </div>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <div className={`hamburger ${isOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          

          
          {/* <div className="mobile-admin-section">
            <h4>Admin Panel</h4>
            {adminItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="mobile-nav-link admin"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
