import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  BookOpen, 
  Briefcase,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Eye,
  Plus,
  Settings,
  Bell,
  Download,
  Filter
} from 'lucide-react';

// Hooks
import { 
  useDashboardStats, 
  useTeam, 
  useEvents, 
  useBlogs,
  useContactQueries 
} from '../../hooks/useApi';

// Components
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

// Styles
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: teamData } = useTeam();
  const { data: eventsData } = useEvents();
  const { data: blogsData } = useBlogs();
  const { data: queriesData } = useContactQueries();

  const team = teamData?.data?.results || teamData?.data || [];
  const events = eventsData?.data?.results || eventsData?.data || [];
  const blogs = blogsData?.data?.results || blogsData?.data || [];
  const queries = queriesData?.data?.results || queriesData?.data || [];

  const dashboardStats = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const recentEvents = events.filter(event => 
      new Date(event.created_at) > thirtyDaysAgo
    );
    
    const recentBlogs = blogs.filter(blog => 
      new Date(blog.created_at) > thirtyDaysAgo
    );
    
    const unreadQueries = queries.filter(query => !query.is_read);
    
    return {
      totalTeam: team.length,
      totalEvents: events.length,
      recentEvents: recentEvents.length,
      totalBlogs: blogs.length,
      recentBlogs: recentBlogs.length,
      totalQueries: queries.length,
      unreadQueries: unreadQueries.length,
      totalViews: blogs.reduce((sum, blog) => sum + (blog.views_count || 0), 0)
    };
  }, [team, events, blogs, queries]);

  const statCards = [
    {
      title: 'Team Members',
      value: dashboardStats.totalTeam,
      change: '+2',
      changeType: 'positive',
      icon: Users,
      color: '#007aff',
      link: '/admin/team'
    },
    {
      title: 'Total Events',
      value: dashboardStats.totalEvents,
      change: `+${dashboardStats.recentEvents}`,
      changeType: 'positive',
      icon: Calendar,
      color: '#32d74b',
      link: '/admin/events'
    },
    {
      title: 'Published Blogs',
      value: dashboardStats.totalBlogs,
      change: `+${dashboardStats.recentBlogs}`,
      changeType: 'positive',
      icon: BookOpen,
      color: '#ff9f0a',
      link: '/admin/blogs'
    },
    {
      title: 'Contact Queries',
      value: dashboardStats.totalQueries,
      change: `${dashboardStats.unreadQueries} unread`,
      changeType: dashboardStats.unreadQueries > 0 ? 'warning' : 'neutral',
      icon: MessageSquare,
      color: '#af52de',
      link: '/admin/queries'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Blog',
      description: 'Create a new blog post',
      icon: BookOpen,
      color: '#007aff',
      link: '/admin/blogs/new'
    },
    {
      title: 'Create Event',
      description: 'Schedule a new event',
      icon: Calendar,
      color: '#32d74b',
      link: '/admin/events/new'
    },
    {
      title: 'Add Team Member',
      description: 'Add new team member',
      icon: Users,
      color: '#ff9f0a',
      link: '/admin/team/new'
    },
    {
      title: 'Manage Opportunities',
      description: 'Post new opportunities',
      icon: Briefcase,
      color: '#af52de',
      link: '/admin/opportunities'
    }
  ];

  const recentActivities = [
    {
      type: 'blog',
      title: 'New blog post published',
      description: 'The Future of Entrepreneurship',
      time: '2 hours ago',
      icon: BookOpen
    },
    {
      type: 'event',
      title: 'Event created',
      description: 'Startup Pitch Competition 2025',
      time: '5 hours ago',
      icon: Calendar
    },
    {
      type: 'query',
      title: 'New contact query',
      description: 'Partnership inquiry from TechCorp',
      time: '1 day ago',
      icon: MessageSquare
    },
    {
      type: 'team',
      title: 'Team member added',
      description: 'John Doe joined as Marketing Lead',
      time: '2 days ago',
      icon: Users
    }
  ];

  if (statsLoading) return <LoadingSpinner message="Loading dashboard..." />;

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <section className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Admin Dashboard</h1>
              <p>Welcome back! Here's what's happening with eDC IITD.</p>
            </div>
            
            <div className="header-actions">
              <div className="time-range-selector">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="time-select"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 3 months</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
              
              <button className="btn btn-outline">
                <Download size={18} />
                Export Report
              </button>
              
              <button className="btn btn-primary">
                <Settings size={18} />
                Settings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {statCards.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Link to={stat.link} className="stat-link">
                    <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                      <IconComponent size={24} />
                    </div>
                    
                    <div className="stat-content">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-title">{stat.title}</div>
                      <div className={`stat-change ${stat.changeType}`}>
                        {stat.changeType === 'positive' && <TrendingUp size={14} />}
                        {stat.changeType === 'negative' && <TrendingDown size={14} />}
                        {stat.changeType === 'warning' && <Bell size={14} />}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="dashboard-content">
        <div className="container">
          <div className="dashboard-grid">
            {/* Quick Actions */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Quick Actions</h3>
                <p>Common tasks and shortcuts</p>
              </div>
              
              <div className="quick-actions-grid">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <motion.div
                      key={action.title}
                      className="quick-action-item"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Link to={action.link} className="action-link">
                        <div className="action-icon" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
                          <IconComponent size={20} />
                        </div>
                        <div className="action-content">
                          <h4>{action.title}</h4>
                          <p>{action.description}</p>
                        </div>
                        <Plus size={16} className="action-arrow" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>Recent Activities</h3>
                <p>Latest updates and changes</p>
              </div>
              
              <div className="activities-list">
                {recentActivities.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <motion.div
                      key={index}
                      className="activity-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className={`activity-icon ${activity.type}`}>
                        <IconComponent size={16} />
                      </div>
                      <div className="activity-content">
                        <h4>{activity.title}</h4>
                        <p>{activity.description}</p>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="card-footer">
                <Link to="/admin/activities" className="view-all-link">
                  View all activities
                </Link>
              </div>
            </div>

            {/* Analytics Overview */}
            <div className="dashboard-card analytics-card">
              <div className="card-header">
                <h3>Analytics Overview</h3>
                <p>Key metrics and insights</p>
              </div>
              
              <div className="analytics-content">
                <div className="metric-item">
                  <div className="metric-label">Total Page Views</div>
                  <div className="metric-value">{dashboardStats.totalViews.toLocaleString()}</div>
                  <div className="metric-change positive">
                    <TrendingUp size={14} />
                    +12.5%
                  </div>
                </div>
                
                <div className="metric-item">
                  <div className="metric-label">Event Registrations</div>
                  <div className="metric-value">1,234</div>
                  <div className="metric-change positive">
                    <TrendingUp size={14} />
                    +8.3%
                  </div>
                </div>
                
                <div className="metric-item">
                  <div className="metric-label">Blog Engagement</div>
                  <div className="metric-value">89.2%</div>
                  <div className="metric-change negative">
                    <TrendingDown size={14} />
                    -2.1%
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="dashboard-card">
              <div className="card-header">
                <h3>System Status</h3>
                <p>Current system health</p>
              </div>
              
              <div className="status-list">
                <div className="status-item">
                  <div className="status-indicator online"></div>
                  <span>Website Status</span>
                  <span className="status-value">Online</span>
                </div>
                
                <div className="status-item">
                  <div className="status-indicator online"></div>
                  <span>Database</span>
                  <span className="status-value">Healthy</span>
                </div>
                
                <div className="status-item">
                  <div className="status-indicator warning"></div>
                  <span>Email Service</span>
                  <span className="status-value">Slow</span>
                </div>
                
                <div className="status-item">
                  <div className="status-indicator online"></div>
                  <span>File Storage</span>
                  <span className="status-value">98% Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
