// src/data/initiativesData.js
export const localInitiativesData = [
  {
    id: 1,
    title: "Venture Studio",
    description: "A comprehensive full-semester course designed to teach entrepreneurship through hands-on experience. Learn from distinguished alumni who are successful founders themselves through bi-weekly sessions and active mentoring.",
    detailed_description: "IIT Delhi has always been renowned for its students building one unicorn after another. The Entrepreneurship Development Cell (eDC) IIT Delhi presents Venture Studio - a comprehensive program that teaches entrepreneurship through hands-on experience. Through bi-weekly sessions and active mentoring from our distinguished alumni who are successful founders themselves, participants will learn key entrepreneurship concepts while gaining real-world insights. Now in its third edition, Venture Studio promises to be an enhanced learning platform for budding entrepreneurs and IIT Delhi students.",
    // image: "/initiatives/venture-studio.jpg",
    // start_date: "2024-01-15",
    // end_date: null,
    // is_ongoing: true,
    // is_featured: true,
    impact_metrics: "3 successful cohorts completed, 12+ industry mentors, 50+ students trained in entrepreneurship fundamentals",
    mentors: [
      "Pawan Raj Kumar",
      "Alok Mittal", 
      "Vivek Srivastava",
      "Shivani Singh-Kapoor",
      "Priyank Garg",
      "Pankaj Vermani",
      "Tejinderpal Miglani",
      "Dipinder Sekhon",
      "Gaurav Agarwal",
      "Hitesh Oberoi",
      "Gaurav Bhatnagar",
      "Ganesh Sahai"
    ],
    learning_outcomes: [
      "Fundamental entrepreneurship concepts",
      "Startup building methodologies", 
      "Business strategy and execution",
      "Real-world problem-solving approaches",
      "Networking and mentorship opportunities"
    ]
  },
  {
    id: 2,
    title: "Industrial Visits",
    description: "Providing students with invaluable real-world exposure to how startups and established companies operate beyond theoretical classroom learning through carefully curated industry visits.",
    detailed_description: "Industrial Visits is a flagship initiative by eDC designed to provide students with invaluable real-world exposure to how startups and established companies operate beyond theoretical classroom learning. These carefully curated visits help participants observe business processes, product development cycles, manufacturing workflows, and organizational culture across various industries. Students gain deeper understanding of how innovative ideas translate into functioning enterprises through direct interaction with founders, engineers, and industry professionals.",
    // image: "/initiatives/industrial-visits.jpg",
    // start_date: "2023-08-01",
    // end_date: null,
    // is_ongoing: true,
    // is_featured: true,
    impact_metrics: "25+ company visits organized, 200+ students participated, 15+ industry partnerships established",
    key_benefits: [
      "Bridge the gap between theoretical learning and practical execution",
      "Gain insights into entrepreneurial and industrial ecosystems",
      "Understand manufacturing processes and product development",
      "Network with industry professionals and founders",
      "Explore cutting-edge technologies and innovations"
    ],
    recent_highlights: [
      {
        company: "TSUYO MANUFACTURING PVT LTD",
        focus: "EV powertrains manufacturing processes",
        description: "Students explored cutting-edge manufacturing processes with special focus on EV powertrains, gaining hands-on experience in design, production, and testing of electric vehicle powertrains."
      }
    ]
  },
  {
    id: 3,
    title: "Founder's Club",
    description: "A prestigious initiative jointly organized by Google Cloud, IIT Delhi Alumni Association, and eDC featuring fireside chats, startup pitches, and extensive networking opportunities with the IIT Delhi alumni community.",
    detailed_description: "The Founder's Club Launch is a prestigious initiative jointly organized by Google Cloud, IIT Delhi Alumni Association, and eDC. This exclusive platform features fireside chats, startup pitches, and extensive networking opportunities with the IIT Delhi alumni community. The event provides unprecedented access to Google Cloud resources and the IIT Delhi alumni network, offering both technical support and strategic guidance for aspiring entrepreneurs.",
    // image: "/initiatives/founders-club.jpg",
    // start_date: "2024-11-30",
    // end_date: "2024-11-30",
    // is_ongoing: false,
    // is_featured: true,
    impact_metrics: "50 students participated, $25K-$350K Google Cloud credits distributed, 20+ alumni mentors engaged",
    event_details: {
      date: "Saturday, November 30, 2024",
      venue: "Seminar Hall, IIT Delhi",
      capacity: "50 students (first-come, first-served basis)",
      organizers: "Google Cloud × IIT Delhi Alumni Association × eDC"
    },
    schedule: [
      {
        time: "6:00 PM - 8:00 PM",
        activity: "Fireside chats and startup pitches"
      },
      {
        time: "8:00 PM onwards", 
        activity: "Networking High Tea"
      }
    ],
    key_speaker: {
      name: "Priyank Garg",
      designation: "Managing Partner, Indian Angel Network Alpha Fund"
    },
    benefits: [
      {
        category: "Bootstrapped Startups",
        benefit: "Google Cloud credits worth $25,000 USD"
      },
      {
        category: "Funded Startups", 
        benefit: "Up to $250,000 USD in credits"
      },
      {
        category: "AI Startups",
        benefit: "Up to $350,000 USD in credits"
      },
      {
        category: "Additional Benefits",
        benefit: "Google Workspace Business Plus for 1 year, technical support and mentorship, $500 USD Google Cloud Skills Boost credits"
      }
    ]
  },
  {
    id: 4,
    title: "eDC Bootcamp",
    description: "An exclusive initiative designed specifically for eDC executives, focusing on upskilling, collaboration, and leadership development with deep dives into high-value domains like hardware design, PCB coding, and startup strategy.",
    detailed_description: "The eDC Internal Bootcamp is an exclusive initiative designed specifically for eDC executives, focusing on upskilling, collaboration, and leadership development. This comprehensive program goes beyond surface-level skills to offer deep dives into high-value domains. The bootcamp is tailored to individual learning goals, whether technical or non-technical, providing specialized knowledge in areas such as hardware design, PCB coding, startup strategy, and other cutting-edge domains.",
    // // image: "/initiatives/edc-bootcamp.jpg",
    // start_date: "2024-02-01",
    // end_date: null,
    // is_ongoing: true,
    // is_featured: false,
    impact_metrics: "40+ executives trained, 25+ projects completed, 95% skill improvement rate, 15+ portfolio enhancements",
    program_philosophy: "Learn. Build. Lead.",
    program_features: [
      {
        feature: "Curated Learning Sessions",
        description: "Customized based on your interests and career goals"
      },
      {
        feature: "Hands-on Projects",
        description: "Real-world projects with actual deadlines post-bootcamp"
      },
      {
        feature: "Mentorship & Guidance", 
        description: "Access to internal resources and experienced mentors"
      },
      {
        feature: "Leadership Opportunities",
        description: "Chance to lead and contribute to meaningful initiatives"
      }
    ],
    specialization_areas: [
      "Hardware design",
      "PCB coding", 
      "Startup strategy",
      "Technical leadership",
      "Project management",
      "Innovation methodologies"
    ],
    program_impact: "Every executive will be assigned a project after completing the bootcamp. This serves as your runway to grow professionally, contribute meaningfully to the organization, and build an outstanding portfolio before the semester ends.",
    mission_statement: "At eDC, we don't just execute—we excel. This bootcamp represents our commitment to developing leaders who can drive innovation and create lasting impact in the entrepreneurial ecosystem."
  }
];