import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarView() {
  const [date, setDate] = useState(new Date());

  const exams = [
    { date: new Date(2023, 4, 15), subject: 'Math', color: '#FF5733' },
    { date: new Date(2023, 4, 20), subject: 'Science', color: '#33FF57' },
    // Add more exams as needed
  ];

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const exam = exams.find(e => e.date.toDateString() === date.toDateString());
      if (exam) {
        return (
          <div
            style={{
              backgroundColor: exam.color,
              borderRadius: '50%',
              height: '8px',
              width: '8px',
              margin: '0 auto',
            }}
          />
        );
      }
    }
  };

  return (
    <div className="calendar-view">
      <h2>Exam Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
      />
    </div>
  );
}

export default CalendarView;
