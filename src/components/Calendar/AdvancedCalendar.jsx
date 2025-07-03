import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { useEvents } from '../../hooks/useApi';

const CalendarContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid ${props => props.theme.colors.surfaceLight};
  height: 100vh;
  max-height: 900px;
  display: flex;
  flex-direction: column;
`;

const CalendarHeader = styled.div`
  background: ${props => props.theme.colors.gradients.dark};
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.colors.surfaceLight};
`;

const MonthNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const NavButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: ${props => props.theme.colors.text.primary};
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const MonthTitle = styled(motion.h2)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
`;

const CalendarGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto 1fr;
  background: ${props => props.theme.colors.background};
`;

const DayHeader = styled.div`
  padding: ${props => props.theme.spacing.md};
  text-align: center;
  font-weight: 600;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
  background: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.surfaceLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DayCell = styled(motion.div)`
  border-right: 1px solid ${props => props.theme.colors.surfaceLight};
  border-bottom: 1px solid ${props => props.theme.colors.surfaceLight};
  min-height: 120px;
  padding: ${props => props.theme.spacing.sm};
  position: relative;
  cursor: pointer;
  background: ${props => props.isCurrentMonth 
    ? props.theme.colors.background 
    : props.theme.colors.surface};
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    background: ${props => props.theme.colors.surfaceLight};
  }
  
  ${props => props.isToday && `
    background: ${props.theme.colors.gradients.glow};
  `}
  
  ${props => props.isSelected && `
    background: ${props.theme.colors.accent}20;
    border-color: ${props.theme.colors.accent};
  `}
`;

const DayNumber = styled.div`
  font-weight: ${props => props.isToday ? '700' : '500'};
  color: ${props => {
    if (props.isToday) return props.theme.colors.accent;
    if (props.isCurrentMonth) return props.theme.colors.text.primary;
    return props.theme.colors.text.tertiary;
  }};
  font-size: 1rem;
  margin-bottom: ${props => props.theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: ${props => props.theme.borderRadius.full};
  
  ${props => props.isToday && `
    background: ${props.theme.colors.accent};
    color: ${props.theme.colors.text.inverse};
  `}
`;

const EventsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-top: ${props => props.theme.spacing.xs};
`;

const EventItem = styled(motion.div)`
  background: ${props => {
    const colors = {
      workshop: '#32d74b',
      seminar: '#007aff',
      competition: '#ff453a',
      meetup: '#ff9f0a',
      conference: '#af52de'
    };
    return colors[props.eventType] || '#007aff';
  }};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.xs};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const AddEventButton = styled(motion.button)`
  background: rgba(0, 122, 255, 0.2);
  border: 1px dashed ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.accent};
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.7rem;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  margin-top: auto;
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    background: rgba(0, 122, 255, 0.3);
    transform: scale(1.02);
  }
`;

const TodayButton = styled(motion.button)`
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text.inverse};
  border: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.glow};
  }
`;

const AdvancedCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: eventsData } = useEvents();
  
  const events = eventsData?.data?.results || eventsData?.data || [];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => {
      const eventStart = new Date(event.start_datetime);
      return isSameDay(eventStart, date);
    });
  };

  const previousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <CalendarContainer>
      <CalendarHeader>
        <MonthNavigation>
          <NavButton
            onClick={previousMonth}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} />
          </NavButton>
          
          <MonthTitle
            key={format(currentDate, 'yyyy-MM')}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {format(currentDate, 'MMMM yyyy')}
          </MonthTitle>
          
          <NavButton
            onClick={nextMonth}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={20} />
          </NavButton>
        </MonthNavigation>
        
        <TodayButton
          onClick={goToToday}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Today
        </TodayButton>
      </CalendarHeader>

      <CalendarGrid>
        {dayNames.map(day => (
          <DayHeader key={day}>
            {day}
          </DayHeader>
        ))}
        
        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <DayCell
              key={day.toString()}
              isToday={isToday}
              isSelected={isSelected}
              isCurrentMonth={isCurrentMonth}
              onClick={() => setSelectedDate(day)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <DayNumber isToday={isToday} isCurrentMonth={isCurrentMonth}>
                {format(day, 'd')}
              </DayNumber>
              
              <EventsContainer>
                <AnimatePresence>
                  {dayEvents.slice(0, 3).map((event, eventIndex) => (
                    <EventItem
                      key={event.id}
                      eventType={event.event_type}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: eventIndex * 0.1 }}
                      title={event.title}
                    >
                      {event.title.length > 15 
                        ? `${event.title.substring(0, 15)}...` 
                        : event.title
                      }
                    </EventItem>
                  ))}
                </AnimatePresence>
                
                {dayEvents.length > 3 && (
                  <EventItem eventType="more">
                    +{dayEvents.length - 3} more
                  </EventItem>
                )}
                
                {dayEvents.length === 0 && isCurrentMonth && (
                  <AddEventButton
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus size={12} />
                    Add
                  </AddEventButton>
                )}
              </EventsContainer>
            </DayCell>
          );
        })}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export default AdvancedCalendar;
