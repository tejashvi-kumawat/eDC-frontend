import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Eye, Heart, Share2, BookmarkPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { getMediaUrl } from '../../services/api';

const BlogCardContainer = styled(motion.article)`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  border: 1px solid ${props => props.theme.colors.surfaceLight};
  transition: all ${props => props.theme.transitions.base};
  position: relative;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.accent};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;
  background: ${props => props.theme.colors.gradients.dark};
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${props => props.theme.transitions.slow};
  
  ${BlogCardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.7) 100%
  );
  opacity: 0;
  transition: opacity ${props => props.theme.transitions.base};
  
  ${BlogCardContainer}:hover & {
    opacity: 1;
  }
`;

const BadgeContainer = styled.div`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  left: ${props => props.theme.spacing.md};
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const Badge = styled.span`
  background: ${props => {
    if (props.featured) return props.theme.colors.gradients.primary;
    return 'rgba(0, 0, 0, 0.7)';
  }};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ContentContainer = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const CategoryTag = styled.span`
  background: ${props => props.theme.colors.accent}20;
  color: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BlogTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin: ${props => props.theme.spacing.md} 0;
  line-height: 1.3;
  transition: color ${props => props.theme.transitions.base};
  
  ${BlogCardContainer}:hover & {
    color: ${props => props.theme.colors.accent};
  }
`;

const BlogExcerpt = styled.p`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.surfaceLight};
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  font-size: 0.85rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ActionButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: ${props => props.theme.colors.text.secondary};
  width: 36px;
  height: 36px;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    background: ${props => props.theme.colors.accent}20;
    color: ${props => props.theme.colors.accent};
    transform: scale(1.1);
  }
  
  ${props => props.active && `
    background: ${props.theme.colors.accent}20;
    color: ${props.theme.colors.accent};
  `}
`;

const ReadingProgress = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${props => props.theme.colors.accent};
  width: ${props => props.progress}%;
  transition: width ${props => props.theme.transitions.base};
`;

const ModernBlogCard = ({ blog, index = 0 }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'Date unknown';
    }
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href + `/blogs/${blog.slug}`,
      });
    }
  };

  return (
    <BlogCardContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -12 }}
    >
      <Link to={`/blogs/${blog.slug}`}>
        <ImageContainer>
          <BlogImage 
            src={getMediaUrl(blog.featured_image) || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
            alt={blog.title}
            loading="lazy"
          />
          <ImageOverlay />
          
          <BadgeContainer>
            {blog.is_featured && (
              <Badge featured>Featured</Badge>
            )}
            <Badge>{blog.category}</Badge>
          </BadgeContainer>
        </ImageContainer>

        <ContentContainer>
          <CategoryTag>{blog.category}</CategoryTag>
          
          <BlogTitle>{blog.title}</BlogTitle>
          
          <BlogExcerpt>
            {blog.excerpt || 
             (blog.content.length > 120 
               ? `${blog.content.substring(0, 120)}...` 
               : blog.content
             )
            }
          </BlogExcerpt>

          <MetaContainer>
            <MetaInfo>
              <MetaItem>
                <User size={14} />
                <span>{blog.author_name || 'eDC Team'}</span>
              </MetaItem>
              <MetaItem>
                <Calendar size={14} />
                <span>{formatDate(blog.created_at)}</span>
              </MetaItem>
              <MetaItem>
                <Clock size={14} />
                <span>{getReadingTime(blog.content)}</span>
              </MetaItem>
              {blog.views_count && (
                <MetaItem>
                  <Eye size={14} />
                  <span>{blog.views_count}</span>
                </MetaItem>
              )}
            </MetaInfo>

            <ActionButtons>
              <ActionButton
                onClick={handleLike}
                active={isLiked}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              </ActionButton>
              
              <ActionButton
                onClick={handleBookmark}
                active={isBookmarked}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookmarkPlus size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
              </ActionButton>
              
              <ActionButton
                onClick={handleShare}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={16} />
              </ActionButton>
            </ActionButtons>
          </MetaContainer>
        </ContentContainer>
        
        <ReadingProgress progress={Math.random() * 100} />
      </Link>
    </BlogCardContainer>
  );
};

export default ModernBlogCard;
