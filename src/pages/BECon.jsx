import React from 'react';
import './BECon.css';

const BECon = () => {
  return (
    <div className="becon-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">BECon'25</h1>
          <h2 className="subtitle">Business & Entrepreneurship Conclave</h2>
          <p className="hero-description">
            India's premier E-Summit bringing together the brightest minds in entrepreneurship, 
            innovation, and business strategy under the theme "Inquisition of Sustainable Innovation"
          </p>
          <div className="event-details">
            <span className="date">February 1-2, 2025</span>
            <span className="venue">IIT Delhi, Hauz Khas</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">About BECon'25</h2>
          <p className="about-description">
            The Business & Entrepreneurship Conclave (BECon) 2025 is a landmark event that brings 
            together the brightest minds in entrepreneurship, innovation, and business strategy. 
            Organized by the Entrepreneurship Development Cell (eDC) at IIT Delhi, this three-day 
            extravaganza showcases the critical role of entrepreneurship in driving economic growth 
            and fostering a culture of innovation.
          </p>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>15,000+</h3>
              <p>Attendees</p>
            </div>
            <div className="stat-item">
              <h3>1,000+</h3>
              <p>Startups</p>
            </div>
            <div className="stat-item">
              <h3>150+</h3>
              <p>Industry Leaders</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Pitch Sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="highlights-section">
        <div className="container">
          <h2 className="section-title">Event Highlights</h2>
          <div className="highlights-grid">
            <div className="highlight-card">
              <h3>Moonshot Competition</h3>
              <div className="highlight-features">
                <p><strong>₹1 Cr+ prize pool</strong> comprising seed capital and platform credits</p>
                <p><strong>5 competition tracks</strong> covering all major industries</p>
                <p><strong>Multi-city approach</strong> with regional semifinals</p>
                <p><strong>Grand finale</strong> at IIT Delhi with top VCs and investors</p>
              </div>
            </div>
            
            <div className="highlight-card">
              <h3>City Highlights</h3>
              <ul className="city-list">
                <li><strong>Delhi:</strong> 250+ registrations, top 10 startups selected</li>
                <li><strong>Bangalore:</strong> Partnership with E-cell MIT Bangalore</li>
                <li><strong>Mumbai:</strong> Collaboration with NMIMS Mumbai</li>
                <li><strong>Hyderabad:</strong> Strong community of innovators</li>
              </ul>
            </div>

            <div className="highlight-card">
              <h3>DEBUGON Hackathon</h3>
              <div className="highlight-features">
                <p><strong>1,629 registrations</strong> with 57,000 impressions</p>
                <p><strong>Winners awarded</strong> ₹1,10,000 each</p>
                <p><strong>Collaboration opportunities</strong> with ONDC</p>
                <p><strong>Solutions focus:</strong> Kirana stores and local markets</p>
              </div>
            </div>

            <div className="highlight-card">
              <h3>Startup Exhibition</h3>
              <div className="highlight-features">
                <p><strong>45 startups participated</strong> over 2 days</p>
                <p><strong>Expert mentors</strong> from diverse industries</p>
                <p><strong>Pitch refinement</strong> and strategy sessions</p>
                <p><strong>Networking opportunities</strong> with VCs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Events */}
      <section className="flagship-section">
        <div className="container">
          <h2 className="section-title">Flagship Events</h2>
          <div className="events-grid">
            <div className="event-card">
              <h3>Fireside Chats</h3>
              <p>Engaging conversations with industry stalwarts including Kunal Bahl, Prashanth Prakash, and other unicorn founders sharing insights on scaling startups and navigating the entrepreneurial landscape.</p>
            </div>
            
            <div className="event-card">
              <h3>Panel Discussions</h3>
              <p>Thought-provoking sessions on sustainability, innovation, AI-driven transformation, blockchain innovations, and venture capital trends with experts from technology, finance, and sustainability sectors.</p>
            </div>
            
            <div className="event-card">
              <h3>Startup Showcase</h3>
              <p>Launchpad exhibition featuring 50+ pioneering ventures in sustainability and emerging technologies, fostering invaluable investor-startup interactions with over 20,000 attendees.</p>
            </div>
            
            <div className="event-card">
              <h3>Competitions & Hackathons</h3>
              <p>Multiple competition tracks including the DEBUGON Hackathon, business plan competitions, and pitch sessions with substantial prize pools and funding opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="speakers-section">
        <div className="container">
          <h2 className="section-title">Notable Speakers</h2>
          <div className="speakers-grid">
            <div className="speaker-card">
              <h4>Kunal Bahl & Rohit Bansal</h4>
              <p>Co-founders, Snapdeal | AceVector Group</p>
            </div>
            <div className="speaker-card">
              <h4>Prashanth Prakash</h4>
              <p>Partner, Accel</p>
            </div>
            <div className="speaker-card">
              <h4>Shradha Sharma</h4>
              <p>Founder, YourStory Media</p>
            </div>
            <div className="speaker-card">
              <h4>Punit K Goyal</h4>
              <p>Co-founder, BluSmart</p>
            </div>
            <div className="speaker-card">
              <h4>Azhar Iqbal</h4>
              <p>Founder, Inshorts</p>
            </div>
            <div className="speaker-card">
              <h4>Jayant Sinha</h4>
              <p>Policy Leader</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <h2 className="section-title">Impact & Legacy</h2>
          <div className="impact-content">
            <p>
              BECon has solidified its reputation as India's premier E-Summit, catalyzing innovation, 
              investment, and impactful collaborations. The event creates a robust ecosystem for 
              emerging startups to scale their visions into tangible solutions, with several startups 
              securing funding exceeding one crore rupees.
            </p>
            <div className="impact-highlights">
              <div className="impact-item">
                <h4>Sustainable Innovation Focus</h4>
                <p>Redefining the intersection of sustainability and entrepreneurship through dedicated sessions and showcases.</p>
              </div>
              <div className="impact-item">
                <h4>Ecosystem Building</h4>
                <p>Creating connections between startups, investors, mentors, and industry leaders for long-term collaboration.</p>
              </div>
              <div className="impact-item">
                <h4>Knowledge Transfer</h4>
                <p>Facilitating learning through workshops, mentorship sessions, and expert-led discussions on emerging trends.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>BECon'25</h3>
              <p>Organized by eDC (Entrepreneurship Development Cell), IIT Delhi</p>
              <p>Theme: "Inquisition of Sustainable Innovation"</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#speakers">Speakers</a></li>
                <li><a href="#register">Register</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Contact</h4>
              <p>Website: becon.edciitd.com</p>
              <p>Venue: IIT Delhi, Hauz Khas</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BECon;
