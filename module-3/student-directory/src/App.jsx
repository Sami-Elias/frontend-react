import { useState } from 'react';
import StudentList from './components/StudentList';
import './App.css';

const INITIAL_STUDENTS = [
  { id: 's1', name: 'Sami Elias', grade: '11th Grade', track: 'Web Development', skills: ['React', 'JavaScript', 'CSS'] },
  { id: 's2', name: 'Abel Bekele', grade: '11th Grade', track: 'Data Science', skills: ['Python', 'SQL', 'Analytics'] },
  { id: 's3', name: 'Daniel Worku', grade: '10th Grade', track: 'UI/UX Design', skills: ['Figma', 'HTML', 'Prototyping'] },
  { id: 's4', name: 'Abebe Feleke', grade: '12th Grade', track: 'Cybersecurity', skills: ['Linux', 'Networking', 'Python'] },
];

export default function App() {
  const [students] = useState(INITIAL_STUDENTS);
  const [query, setQuery] = useState('');

  // Filter students based on search input
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.track.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="app-container">
      <header>
        <h1>Student Directory</h1>
        <input
          type="text"
          placeholder="Search by name or track..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
        />
      </header>

      {/* Passing filtered array down via props */}
      <StudentList students={filteredStudents} />
    </div>
  );
}