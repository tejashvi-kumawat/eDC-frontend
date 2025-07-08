// src/data/eventsData.js
export const localEventsData = [
  {
    "id": 1,
    "title": "Shipathon",
    "description": "Innovative startup-building competition designed to nurture entrepreneurial talent from the ground up. Learn and build your startup from scratch without any prerequisites with comprehensive mentorship from eDC IITD team members.",
    "event_type": "Competition",
    "start_datetime": "2025-03-01",
    "end_datetime": "2025-03-14",
    "location": "IIT Delhi Campus",
    "max_participants": 200,
    "is_featured": true,
    "tags": ["startup", "competition", "mentorship", "learning"],
    "requirements": "1st & 2nd-year B.Tech, 1st-year M.Tech, PG, B.Des students",
    "organizer": "eDC IIT Delhi x ARIES",
    "entry_fee": 0,
    "status": "upcoming"
  },
  {
    "id": 2,
    "title": "Board Room Battle",
    "description": "Exclusive competition providing students with the opportunity to showcase their entrepreneurial potential in front of industry stalwarts. High-stakes event simulating real boardroom scenarios.",
    "event_type": "Competition",
    "start_datetime": "2024-10-27T15:00:00Z",
    "end_datetime": "2024-10-27T18:00:00Z",
    "location": "LH 325, IIT Delhi",
    "max_participants": 50,
    "is_featured": true,
    "tags": ["boardroom", "presentation", "industry", "networking"],
    "requirements": "Open to all students, particularly beneficial for freshers",
    "organizer": "eDC IIT Delhi",
    "entry_fee": 0,
    "status": "completed",
    "speakers": [
      {
        "name": "Deepak Bajaj",
        "designation": "Value-Seller Mentor & TEDx Partner"
      },
      {
        "name": "Preetisha Bora",
        "designation": "COO of Zarp Labs"
      }
    ]
  },
  {
    "id": 3,
    "title": "Founder ka Jigra",
    "description": "Inspiring session featuring successful entrepreneurs who share their journey of building unicorn companies. Learn invaluable lessons and insights into managing thriving companies.",
    "event_type": "Seminar",
    "start_datetime": "2024-10-26T17:00:00Z",
    "end_datetime": "2024-10-26T19:00:00Z",
    "location": "Seminar Hall, IIT Delhi",
    "max_participants": 150,
    "is_featured": true,
    "tags": ["entrepreneur", "unicorn", "inspiration", "journey"],
    "requirements": "Open to all aspiring entrepreneurs",
    "organizer": "eDC IIT Delhi",
    "entry_fee": 0,
    "status": "completed",
    "speakers": [
      {
        "name": "Nitin Jain",
        "designation": "Founder and CEO of O'Agrifarm (Builder of 2 successful unicorns)"
      }
    ]
  },
  {
    "id": 4,
    "title": "Chai with Titan Capital",
    "description": "Exclusive mentorship and pitching opportunity with experienced investors. 25-minute one-on-one sessions with Titan Capital, known for investing up to 4Cr in early-stage companies.",
    "event_type": "Mentorship",
    "start_datetime": "2024-08-07T10:00:00Z",
    "end_datetime": "2024-08-07T18:00:00Z",
    "location": "IIT Delhi Campus",
    "max_participants": 30,
    "is_featured": true,
    "tags": ["mentorship", "pitching", "investment", "funding"],
    "requirements": "Early-stage startups and entrepreneurs",
    "organizer": "eDC IIT Delhi x Titan Capital",
    "entry_fee": 0,
    "status": "completed",
    "investment_range": "Up to 4Cr for early-stage companies",
    "portfolio": ["Ola", "Urbanclap", "Shadowfax"]
  },
  {
    "id": 5,
    "title": "Research Quest",
    "description": "Ultimate research hackathon held at BECON, IIT Delhi's prestigious entrepreneurial summit. Dynamic arena where brilliant minds converge to transform innovative ideas into significant breakthroughs.",
    "event_type": "Hackathon",
    "start_datetime": "2025-02-03T09:00:00Z",
    "end_datetime": "2025-02-03T20:00:00Z",
    "location": "BECON, IIT Delhi",
    "max_participants": 200,
    "is_featured": true,
    "tags": ["research", "hackathon", "innovation", "breakthrough"],
    "requirements": "Open to experienced researchers and budding innovators",
    "organizer": "eDC IIT Delhi (BECON)",
    "entry_fee": 0,
    "status": "upcoming",
    "features": ["Funding Opportunities", "Industry Partnerships", "R&D Collaborations"]
  },
  {
    "id": 6,
    "title": "Elevation Capital Session",
    "description": "Specialized event targeting student builders and entrepreneurs. Elevation Capital visits IIT Delhi to meet the next wave of student founders, providing feedback, mentorship, and potential investment opportunities.",
    "event_type": "Investment Session",
    "start_datetime": "2024-05-09T14:00:00Z",
    "end_datetime": "2024-05-09T18:00:00Z",
    "location": "IIT Delhi Campus",
    "max_participants": 40,
    "is_featured": true,
    "tags": ["investment", "mentorship", "student founders", "venture capital"],
    "requirements": "Students building or exploring ambitious startup ideas",
    "organizer": "eDC IIT Delhi x Elevation Capital",
    "entry_fee": 0,
    "status": "completed",
    "sectors": ["Consumer tech", "Fintech", "SaaS", "Healthcare", "Frontier tech"],
    "portfolio": ["Snapchat", "Reddit", "Razorpay", "Unacademy", "ShareChat"]
  },
  {
    "id": 7,
    "title": "Musketeers",
    "description": "Exciting finale event bringing together entrepreneurial minds to pitch innovative ideas and invest in each other's startup dreams. Dynamic competition encouraging pitch-perfect presentations.",
    "event_type": "Competition",
    "start_datetime": "2024-04-10T17:00:00Z",
    "end_datetime": "2024-04-10T20:00:00Z",
    "location": "Seminar Hall, IIT Delhi",
    "max_participants": 80,
    "is_featured": false,
    "tags": ["pitching", "investment", "competition", "collaboration"],
    "requirements": "Entrepreneurial mindset and innovative ideas",
    "organizer": "eDC IIT Delhi",
    "entry_fee": 0,
    "status": "completed"
  },
  {
    "id": 8,
    "title": "Mad for Ad",
    "description": "Energetic inter-hostel advertising competition showcasing the creative spirit of IIT Delhi students. Challenges participants to unleash their creativity and create compelling advertisements.",
    "event_type": "Competition",
    "start_datetime": "2024-11-15T16:00:00Z",
    "end_datetime": "2024-11-15T19:00:00Z",
    "location": "IIT Delhi Campus",
    "max_participants": 120,
    "is_featured": false,
    "tags": ["advertising", "creativity", "inter-hostel", "competition"],
    "requirements": "IIT Delhi hostel residents",
    "organizer": "eDC IIT Delhi x Rendezvous",
    "entry_fee": 0,
    "status": "completed"
  },
  {
    "id": 9,
    "title": "Global Student Entrepreneurs Awards (GSEA)",
    "description": "Prestigious international competition providing student entrepreneurs with the opportunity to showcase their innovation and compete on a global stage. Multi-tier competition with substantial prizes.",
    "event_type": "Competition",
    "start_datetime": "2024-06-01",
    "end_datetime": "2024-09-15",
    "location": "Multiple Cities (Global)",
    "max_participants": 500,
    "is_featured": true,
    "tags": ["global", "competition", "student entrepreneurs", "innovation"],
    "requirements": "Student entrepreneurs with innovative ventures",
    "organizer": "eDC IIT Delhi x EO GSEA",
    "entry_fee": 0,
    "status": "completed",
    "prizes": {
      "regional": "INR 1,50,000 (plus in-kind prizes worth INR 3,50,000)",
      "south_asia": "₹5,00,000",
      "global": "$100,000 (plus paid trip to Cape Town for all finalists)"
    }
  },
  {
    "id": 10,
    "title": "Founder's Club Launch",
    "description": "Prestigious event featuring fireside chats, startup pitches, and extensive networking opportunities with the IIT Delhi alumni community. Substantial Google Cloud credits and support for IIT Delhi founders.",
    "event_type": "Launch Event",
    "start_datetime": "2024-11-30T18:00:00Z",
    "end_datetime": "2024-11-30T21:00:00Z",
    "location": "Seminar Hall, IIT Delhi",
    "max_participants": 50,
    "is_featured": true,
    "tags": ["founders", "alumni", "networking", "google cloud"],
    "requirements": "IIT Delhi students and founders (first-come, first-served)",
    "organizer": "Google Cloud x IIT Delhi Alumni Association x eDC",
    "entry_fee": 0,
    "status": "completed",
    "speakers": [
      {
        "name": "Priyank Garg",
        "designation": "Managing Partner, Indian Angel Network Alpha Fund"
      }
    ],
    "benefits": {
      "bootstrapped_startups": "$25,000 USD Google Cloud credits",
      "funded_startups": "Up to $250,000 USD credits",
      "ai_startups": "Up to $350,000 USD credits",
      "workspace": "Google Workspace Business Plus for 1 year",
      "skills_boost": "$500 USD Google Cloud Skills Boost credits"
    }
  }
];