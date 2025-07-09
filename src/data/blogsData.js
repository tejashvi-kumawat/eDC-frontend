// src/data/blogsData.js

import blogs from '/edc_full_blogs.json';

export const localBlogsData = blogs.map((blog, idx) => ({
  id: idx + 1,
  title: blog.title,
  content: blog.content,
  excerpt: blog.content.slice(0, 180) + (blog.content.length > 180 ? '...' : ''),
  category: 'General',
  author: 'eDC IIT Delhi',
  created_at: new Date(blog.published).toISOString(),
  views_count: 0,
  read_time: Math.max(3, Math.round((blog.content.split(' ').length || 0) / 200)),
  // is_featured: false,
  // image: '',
  // tags: [],
  likes_count: 0,
  link: blog.link
}));
