import React from 'react';

function ListView() {
  const exams = [
    { date: new Date(2023, 4, 15), subject: 'Math', time: '10:00 AM' },
    { date: new Date(2023, 4, 20), subject: 'Science', time: '2:00 PM' },
    // Add more exams as needed
  ];

  const sortedExams = exams.sort((a, b) => a.date - b.date);

  return (
    <div className="list-view">
      <h2>Upcoming Exams</h2>
      <ul>
        {sortedExams.map((exam, index) => (
          <li key={index}>
            <strong>{exam.subject}</strong> - {exam.date.toDateString()} at {exam.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListView;
