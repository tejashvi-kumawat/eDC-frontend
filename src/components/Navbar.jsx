import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/initiatives', label: 'Initiatives' },
    { path: '/team', label: 'About Us' },
    { path: '/events', label: 'Events' },
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
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">
            <span>eDC</span>
          </div>
          <span className="logo-text">IITD</span>
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
