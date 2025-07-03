// services.js - Updated with debugging and fixes

import api, { handleApiError } from './api';

// Team Services
export const teamAPI = {
  getAll: async (params = {}) => {
    try {
      console.log('🔍 Fetching team data with params:', params);
      const response = await api.get('/team/', { params });
      console.log('✅ Team API Response:', response);
      console.log('📊 Team Data Structure:', response.data);
      
      // Log the actual data to understand the structure
      if (response.data) {
        console.log('🔢 Team data type:', typeof response.data);
        console.log('📋 Team data keys:', Object.keys(response.data));
        if (response.data.results) {
          console.log('👥 Number of team members:', response.data.results.length);
        } else if (Array.isArray(response.data)) {
          console.log('👥 Number of team members (direct array):', response.data.length);
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Team API Error:', error);
      console.error('📋 Error Response:', error.response);
      handleApiError(error, 'Failed to fetch team members');
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      console.log('🔍 Fetching team member by ID:', id);
      const response = await api.get(`/team/${id}/`);
      console.log('✅ Single Team Member Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Team Member by ID Error:', error);
      handleApiError(error, 'Failed to fetch team member');
      throw error;
    }
  },
  
  // ... other methods remain the same
  create: async (data) => {
    try {
      const response = await api.post('/team/', data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create team member');
      throw error;
    }
  },
  
  update: async (id, data) => {
    try {
      const response = await api.put(`/team/${id}/`, data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to update team member');
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await api.delete(`/team/${id}/`);
    } catch (error) {
      handleApiError(error, 'Failed to delete team member');
      throw error;
    }
  }
};

// Events Services
export const eventsAPI = {
  getAll: async (params = {}) => {
    try {
      console.log('🔍 Fetching events data with params:', params);
      const response = await api.get('/events/', { params });
      console.log('✅ Events API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Events API Error:', error);
      handleApiError(error, 'Failed to fetch events');
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/events/${id}/`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch event');
      throw error;
    }
  },
  
  getFeatured: async () => {
    try {
      const response = await api.get('/events/?is_featured=true');
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch featured events');
      throw error;
    }
  },
  
  getUpcoming: async () => {
    try {
      const now = new Date().toISOString();
      const response = await api.get(`/events/?start_datetime__gt=${now}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch upcoming events');
      throw error;
    }
  },
  
  create: async (data) => {
    try {
      const response = await api.post('/events/', data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create event');
      throw error;
    }
  },
  
  update: async (id, data) => {
    try {
      const response = await api.put(`/events/${id}/`, data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to update event');
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await api.delete(`/events/${id}/`);
    } catch (error) {
      handleApiError(error, 'Failed to delete event');
      throw error;
    }
  }
};

// Opportunities Services - FIX INCONSISTENT ENDPOINTS
export const opportunitiesAPI = {
  getAll: async (params = {}) => {
    try {
      console.log('🔍 Fetching opportunities data with params:', params);
      // FIXED: Inconsistent endpoint - was '/opportunity/' now '/opportunities/'
      const response = await api.get('/opportunity/', { params });
      console.log('✅ Opportunities API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Opportunities API Error:', error);
      handleApiError(error, 'Failed to fetch opportunities');
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      // FIXED: Missing leading slash and inconsistent endpoint
      const response = await api.get(`/opportunity/${id}/`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch opportunity');
      throw error;
    }
  },
  
  getActive: async () => {
    try {
      // FIXED: Inconsistent endpoint path
      const response = await api.get('/opportunity/?is_active=true');
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch active opportunities');
      throw error;
    }
  },
  
  create: async (data) => {
    try {
      const response = await api.post('/opportunity/', data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create opportunity');
      throw error;
    }
  },
  
  update: async (id, data) => {
    try {
      const response = await api.put(`/opportunity/${id}/`, data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to update opportunity');
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await api.delete(`/opportunity/${id}/`);
    } catch (error) {
      handleApiError(error, 'Failed to delete opportunity');
      throw error;
    }
  }
};

// ... rest of the services remain the same but with consistent logging

// Statistics Services - IMPROVED ERROR HANDLING
export const statsAPI = {
  getDashboard: async () => {
    try {
      console.log('🔍 Fetching dashboard statistics...');
      
      const [team, events, blogs, initiatives, opportunities] = await Promise.allSettled([
        teamAPI.getAll(),
        eventsAPI.getAll(),
        blogsAPI.getAll(),
        initiativesAPI.getAll(),
        opportunitiesAPI.getAll(),
      ]);

      console.log('📊 Promise results:', {
        team: team.status,
        events: events.status,
        blogs: blogs.status,
        initiatives: initiatives.status,
        opportunities: opportunities.status
      });

      const getCount = (result) => {
        if (result.status === 'fulfilled') {
          const data = result.value;
          console.log('📈 Getting count for data:', data);
          
          // Handle different response structures
          if (data?.results && Array.isArray(data.results)) {
            return data.results.length;
          } else if (data?.data && Array.isArray(data.data)) {
            return data.data.length;
          } else if (Array.isArray(data)) {
            return data.length;
          } else if (typeof data === 'object' && data?.count) {
            return data.count;
          }
          
          console.warn('⚠️ Unexpected data structure:', data);
          return 0;
        }
        console.warn('⚠️ Promise rejected:', result.reason);
        return 0;
      };

      const getActiveCount = (result, filterFn) => {
        if (result.status === 'fulfilled') {
          const data = result.value;
          let items = [];
          
          if (data?.results && Array.isArray(data.results)) {
            items = data.results;
          } else if (data?.data && Array.isArray(data.data)) {
            items = data.data;
          } else if (Array.isArray(data)) {
            items = data;
          }
          
          return items.filter(filterFn).length;
        }
        return 0;
      };

      const dashboardData = {
        teamMembers: getCount(team),
        totalEvents: getCount(events),
        upcomingEvents: getActiveCount(events, e => new Date(e.start_datetime) > new Date()),
        publishedBlogs: getCount(blogs),
        activeInitiatives: getActiveCount(initiatives, i => i.is_ongoing),
        totalOpportunities: getCount(opportunities),
        activeOpportunities: getActiveCount(opportunities, o => o.is_active),
      };

      console.log('📊 Final dashboard data:', dashboardData);
      
      return { data: dashboardData };
    } catch (error) {
      console.error('❌ Dashboard stats error:', error);
      return { 
        data: {
          teamMembers: 0,
          totalEvents: 0,
          upcomingEvents: 0,
          publishedBlogs: 0,
          activeInitiatives: 0,
          totalOpportunities: 0,
          activeOpportunities: 0,
        }
      };
    }
  },
  
  getAnalytics: async (period = '30d') => {
    try {
      const response = await api.get(`/analytics/?period=${period}`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch analytics');
      throw error;
    }
  }
};

// Blogs Services
export const blogsAPI = {
  getAll: async (params = {}) => {
    try {
      console.log('🔍 Fetching blogs data with params:', params);
      const response = await api.get('/blogs/', { params });
      console.log('✅ Blogs API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Blogs API Error:', error);
      handleApiError(error, 'Failed to fetch blogs');
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/blogs/${id}/`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch blog');
      throw error;
    }
  },
  
  getBySlug: async (slug) => {
    try {
      const response = await api.get(`/blogs/${slug}/`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch blog');
      throw error;
    }
  },
  
  getFeatured: async () => {
    try {
      const response = await api.get('/blogs/?is_featured=true');
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch featured blogs');
      throw error;
    }
  },
  
  create: async (data) => {
    try {
      const response = await api.post('/blogs/', data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create blog');
      throw error;
    }
  },
  
  update: async (id, data) => {
    try {
      const response = await api.put(`/blogs/${id}/`, data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to update blog');
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await api.delete(`/blogs/${id}/`);
    } catch (error) {
      handleApiError(error, 'Failed to delete blog');
      throw error;
    }
  },
  
  incrementViews: async (slug) => {
    try {
      await api.post(`/blogs/${slug}/increment-views/`);
    } catch (error) {
      // Silently fail for view increments
      console.warn('Failed to increment blog views:', error);
    }
  }
};

// Initiatives Services
export const initiativesAPI = {
  getAll: async (params = {}) => {
    try {
      console.log('🔍 Fetching initiatives data with params:', params);
      const response = await api.get('/initiatives/', { params });
      console.log('✅ Initiatives API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Initiatives API Error:', error);
      handleApiError(error, 'Failed to fetch initiatives');
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/initiatives/${id}/`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch initiative');
      throw error;
    }
  },
  
  create: async (data) => {
    try {
      const response = await api.post('/initiatives/', data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to create initiative');
      throw error;
    }
  },
  
  update: async (id, data) => {
    try {
      const response = await api.put(`/initiatives/${id}/`, data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to update initiative');
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await api.delete(`/initiatives/${id}/`);
    } catch (error) {
      handleApiError(error, 'Failed to delete initiative');
      throw error;
    }
  }
};

// Contact Services
export const contactAPI = {
  submit: async (data) => {
    try {
      const response = await api.post('/contact/', data);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to submit contact form');
      throw error;
    }
  },
  
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/contact/', { params });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch contact queries');
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/contact/${id}/`);
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch contact query');
      throw error;
    }
  },
  
  markAsRead: async (id) => {
    try {
      const response = await api.patch(`/contact/${id}/`, { is_read: true });
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to mark query as read');
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await api.delete(`/contact/${id}/`);
    } catch (error) {
      handleApiError(error, 'Failed to delete contact query');
      throw error;
    }
  }
};

// Auth Services
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login/', credentials);
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data;
    } catch (error) {
      handleApiError(error, 'Login failed');
      throw error;
    }
  },
  
  logout: async () => {
    try {
      await api.post('/auth/logout/');
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/user/');
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to fetch user data');
      throw error;
    }
  },
  
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh/');
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      return response.data;
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      throw error;
    }
  }
};

// File Upload Services
export const uploadAPI = {
  uploadImage: async (file, folder = 'general') => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      
      const response = await api.post('/upload/image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      handleApiError(error, 'Failed to upload image');
      throw error;
    }
  },
  
  deleteImage: async (imageUrl) => {
    try {
      await api.delete('/upload/image/', { data: { url: imageUrl } });
    } catch (error) {
      handleApiError(error, 'Failed to delete image');
      throw error;
    }
  }
};