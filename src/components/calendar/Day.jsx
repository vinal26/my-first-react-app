import React from 'react';

export const Day = ({ day, onClick }) => {
  const className = `day_calender ${day.value === 'padding' ? 'padding' : ''} ${day.isCurrentDay ? 'currentDay' : ''}`;
  return (
    <div onClick={onClick} className={className}>
      {day.value === 'padding' ? '' : day.value}

      {day.event && <div className='event'>{day.event.title}</div>}
    </div>
  );
};