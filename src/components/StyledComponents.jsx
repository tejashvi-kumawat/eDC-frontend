import styled, { keyframes, css } from 'styled-components';
import { motion } from 'framer-motion';

// Animations
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 122, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(0, 122, 255, 0.6);
  }
`;

// Base Components
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.xl};
  }
`;

export const Section = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  position: relative;
  overflow: hidden;
  
  ${props => props.background && css`
    background: ${props.background};
  `}
  
  ${props => props.dark && css`
    background: ${props.theme.colors.background};
    color: ${props.theme.colors.text.primary};
  `}
  
  ${props => props.gradient && css`
    background: ${props.theme.colors.gradients[props.gradient]};
  `}
`;

export const Card = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.surfaceLight};
  position: relative;
  overflow: hidden;
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.accent};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

export const Button = styled(motion.button)`
  background: ${props => props.variant === 'primary' 
    ? props.theme.colors.gradients.primary 
    : 'transparent'};
  color: ${props => props.variant === 'primary' 
    ? props.theme.colors.text.inverse 
    : props.theme.colors.accent};
  border: ${props => props.variant === 'outline' 
    ? `2px solid ${props.theme.colors.accent}` 
    : 'none'};
  padding: ${props => props.size === 'lg' 
    ? `${props.theme.spacing.lg} ${props.theme.spacing['2xl']}` 
    : `${props.theme.spacing.md} ${props.theme.spacing.xl}`};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  font-size: ${props => props.size === 'lg' ? '1.1rem' : '0.9rem'};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all ${props => props.theme.transitions.base};
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${props => props.variant === 'outline' && css`
    &:hover {
      background: ${props.theme.colors.accent};
      color: ${props.theme.colors.text.inverse};
    }
  `}
`;

export const GlassCard = styled(Card)`
  background: rgba(28, 28, 30, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Heading = styled.h2`
  font-size: ${props => {
    switch(props.level) {
      case 1: return '3.5rem';
      case 2: return '2.5rem';
      case 3: return '2rem';
      case 4: return '1.5rem';
      default: return '2rem';
    }
  }};
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.2;
  
  ${props => props.gradient && css`
    background: ${props.theme.colors.gradients.primary};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `}
`;

export const Text = styled.p`
  color: ${props => props.secondary 
    ? props.theme.colors.text.secondary 
    : props.theme.colors.text.primary};
  font-size: ${props => props.size === 'lg' ? '1.2rem' : '1rem'};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minWidth || '300px'}, 1fr));
  gap: ${props => props.gap || props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing['2xl']};
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || props.theme.spacing.md};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
  flex-direction: ${props => props.direction || 'row'};
`;

export const IconWrapper = styled.div`
  width: ${props => props.size || '80px'};
  height: ${props => props.size || '80px'};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.gradient || props.theme.colors.gradients.glow};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.accent};
  margin-bottom: ${props => props.theme.spacing.lg};
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    transform: scale(1.1) rotate(5deg);
    animation: ${glowPulse} 2s infinite;
  }
`;

export const ScrollReveal = styled(motion.div)`
  opacity: 0;
  transform: translateY(50px);
`;
