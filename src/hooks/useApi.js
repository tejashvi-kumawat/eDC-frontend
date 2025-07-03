import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  teamAPI,
  eventsAPI,
  blogsAPI,
  initiativesAPI,
  opportunitiesAPI,
  contactAPI,
  statsAPI,
  authAPI,
  uploadAPI,
} from '../services/apiServices';
import toast from 'react-hot-toast';

// Query Keys
export const QUERY_KEYS = {
  TEAM: 'team',
  EVENTS: 'events',
  BLOGS: 'blogs',
  INITIATIVES: 'initiatives',
  OPPORTUNITIES: 'opportunities',
  CONTACT: 'contact',
  STATS: 'stats',
  AUTH: 'auth',
};

// Team Hooks
export const useTeam = (params = {}) => {
  return useQuery(
    [QUERY_KEYS.TEAM, params],
    () => teamAPI.getAll(params),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

export const useTeamMember = (id) => {
  return useQuery(
    [QUERY_KEYS.TEAM, id],
    () => teamAPI.getById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation(teamAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TEAM);
      toast.success('Team member created successfully!');
    },
    onError: () => {
      toast.error('Failed to create team member');
    },
  });
};

export const useUpdateTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ id, data }) => teamAPI.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.TEAM);
        toast.success('Team member updated successfully!');
      },
      onError: () => {
        toast.error('Failed to update team member');
      },
    }
  );
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation(teamAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TEAM);
      toast.success('Team member deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete team member');
    },
  });
};

// Events Hooks
export const useEvents = (params = {}) => {
  return useQuery(
    [QUERY_KEYS.EVENTS, params],
    () => eventsAPI.getAll(params),
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
};

export const useEvent = (id) => {
  return useQuery(
    [QUERY_KEYS.EVENTS, id],
    () => eventsAPI.getById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useFeaturedEvents = () => {
  return useQuery(
    [QUERY_KEYS.EVENTS, 'featured'],
    eventsAPI.getFeatured,
    {
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useUpcomingEvents = () => {
  return useQuery(
    [QUERY_KEYS.EVENTS, 'upcoming'],
    eventsAPI.getUpcoming,
    {
      staleTime: 2 * 60 * 1000,
    }
  );
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation(eventsAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.EVENTS);
      toast.success('Event created successfully!');
    },
    onError: () => {
      toast.error('Failed to create event');
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ id, data }) => eventsAPI.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.EVENTS);
        toast.success('Event updated successfully!');
      },
      onError: () => {
        toast.error('Failed to update event');
      },
    }
  );
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation(eventsAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.EVENTS);
      toast.success('Event deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete event');
    },
  });
};

// Blogs Hooks
export const useBlogs = (params = {}) => {
  return useQuery(
    [QUERY_KEYS.BLOGS, params],
    () => blogsAPI.getAll(params),
    {
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useBlog = (id) => {
  return useQuery(
    [QUERY_KEYS.BLOGS, id],
    () => blogsAPI.getById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useBlogBySlug = (slug) => {
  return useQuery(
    [QUERY_KEYS.BLOGS, 'slug', slug],
    () => blogsAPI.getBySlug(slug),
    {
      enabled: !!slug,
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useFeaturedBlogs = () => {
  return useQuery(
    [QUERY_KEYS.BLOGS, 'featured'],
    blogsAPI.getFeatured,
    {
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation(blogsAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.BLOGS);
      toast.success('Blog created successfully!');
    },
    onError: () => {
      toast.error('Failed to create blog');
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ id, data }) => blogsAPI.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.BLOGS);
        toast.success('Blog updated successfully!');
      },
      onError: () => {
        toast.error('Failed to update blog');
      },
    }
  );
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  
  return useMutation(blogsAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.BLOGS);
      toast.success('Blog deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete blog');
    },
  });
};

export const useIncrementBlogViews = () => {
  return useMutation(blogsAPI.incrementViews, {
    // Silent mutation - no toast notifications
  });
};

// Initiatives Hooks
export const useInitiatives = (params = {}) => {
  return useQuery(
    [QUERY_KEYS.INITIATIVES, params],
    () => initiativesAPI.getAll(params),
    {
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useInitiative = (id) => {
  return useQuery(
    [QUERY_KEYS.INITIATIVES, id],
    () => initiativesAPI.getById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useCreateInitiative = () => {
  const queryClient = useQueryClient();
  
  return useMutation(initiativesAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.INITIATIVES);
      toast.success('Initiative created successfully!');
    },
    onError: () => {
      toast.error('Failed to create initiative');
    },
  });
};

export const useUpdateInitiative = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ id, data }) => initiativesAPI.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.INITIATIVES);
        toast.success('Initiative updated successfully!');
      },
      onError: () => {
        toast.error('Failed to update initiative');
      },
    }
  );
};

export const useDeleteInitiative = () => {
  const queryClient = useQueryClient();
  
  return useMutation(initiativesAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.INITIATIVES);
      toast.success('Initiative deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete initiative');
    },
  });
};

// Opportunities Hooks
export const useOpportunities = (params = {}) => {
  return useQuery(
    [QUERY_KEYS.OPPORTUNITIES, params],
    () => opportunitiesAPI.getAll(params),
    {
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useOpportunity = (id) => {
  return useQuery(
    [QUERY_KEYS.OPPORTUNITIES, id],
    () => opportunitiesAPI.getById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useActiveOpportunities = () => {
  return useQuery(
    [QUERY_KEYS.OPPORTUNITIES, 'active'],
    opportunitiesAPI.getActive,
    {
      staleTime: 2 * 60 * 1000,
    }
  );
};

export const useCreateOpportunity = () => {
  const queryClient = useQueryClient();
  
  return useMutation(opportunitiesAPI.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.OPPORTUNITIES);
      toast.success('Opportunity created successfully!');
    },
    onError: () => {
      toast.error('Failed to create opportunity');
    },
  });
};

export const useUpdateOpportunity = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ id, data }) => opportunitiesAPI.update(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.OPPORTUNITIES);
        toast.success('Opportunity updated successfully!');
      },
      onError: () => {
        toast.error('Failed to update opportunity');
      },
    }
  );
};

export const useDeleteOpportunity = () => {
  const queryClient = useQueryClient();
  
  return useMutation(opportunitiesAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.OPPORTUNITIES);
      toast.success('Opportunity deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete opportunity');
    },
  });
};

// Contact Hooks
export const useContactQueries = (params = {}) => {
  return useQuery(
    [QUERY_KEYS.CONTACT, params],
    () => contactAPI.getAll(params),
    {
      staleTime: 2 * 60 * 1000,
    }
  );
};

export const useContactQuery = (id) => {
  return useQuery(
    [QUERY_KEYS.CONTACT, id],
    () => contactAPI.getById(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    }
  );
};

export const useSubmitContact = () => {
  const queryClient = useQueryClient();
  
  return useMutation(contactAPI.submit, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.CONTACT);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
    },
    onError: () => {
      toast.error('Failed to send message. Please try again.');
    },
  });
};

export const useMarkContactAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation(contactAPI.markAsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.CONTACT);
      toast.success('Query marked as read');
    },
    onError: () => {
      toast.error('Failed to mark query as read');
    },
  });
};

export const useDeleteContactQuery = () => {
  const queryClient = useQueryClient();
  
  return useMutation(contactAPI.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.CONTACT);
      toast.success('Query deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete query');
    },
  });
};

// Dashboard Stats
export const useDashboardStats = () => {
  return useQuery(
    [QUERY_KEYS.STATS, 'dashboard'],
    statsAPI.getDashboard,
    {
      staleTime: 2 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    }
  );
};

export const useAnalytics = (period = '30d') => {
  return useQuery(
    [QUERY_KEYS.STATS, 'analytics', period],
    () => statsAPI.getAnalytics(period),
    {
      staleTime: 5 * 60 * 1000,
    }
  );
};

// Auth Hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation(authAPI.login, {
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEYS.AUTH, 'user'], data.user);
      toast.success('Login successful!');
    },
    onError: () => {
      toast.error('Login failed. Please check your credentials.');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation(authAPI.logout, {
    onSuccess: () => {
      queryClient.clear();
      toast.success('Logged out successfully');
    },
  });
};

export const useCurrentUser = () => {
  return useQuery(
    [QUERY_KEYS.AUTH, 'user'],
    authAPI.getCurrentUser,
    {
      staleTime: 10 * 60 * 1000,
      retry: false,
    }
  );
};

// Upload Hooks
export const useUploadImage = () => {
  return useMutation(
    ({ file, folder }) => uploadAPI.uploadImage(file, folder),
    {
      onSuccess: () => {
        toast.success('Image uploaded successfully!');
      },
      onError: () => {
        toast.error('Failed to upload image');
      },
    }
  );
};

export const useDeleteImage = () => {
  return useMutation(uploadAPI.deleteImage, {
    onSuccess: () => {
      toast.success('Image deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete image');
    },
  });
};

// Custom hooks for common patterns
export const useInfiniteScroll = (queryKey, queryFn, options = {}) => {
  return useQuery(
    queryKey,
    queryFn,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export const useDebounceQuery = (queryKey, queryFn, searchTerm, delay = 500) => {
  const [debouncedTerm, setDebouncedTerm] = React.useState(searchTerm);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return useQuery(
    [...queryKey, debouncedTerm],
    () => queryFn(debouncedTerm),
    {
      enabled: !!debouncedTerm,
      staleTime: 5 * 60 * 1000,
    }
  );
};
