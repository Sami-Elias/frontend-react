import { useState, useEffect } from 'react';
import StudentTable from './components/StudentTable';
import StatusMessage from './components/StatusMessage';
import './App.css';

export default function App() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // 1. Search state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error(`Server status: ${response.status}`);

      const data = await response.json();
      const formattedData = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.address.city,
        company: user.company.name,
        status: user.id % 2 === 0 ? 'Active' : 'Pending',
      }));

      setStudents(formattedData);
    } catch (err) {
      setError(err.message || 'Failed to fetch students.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 2. Derived state: Filter students by name, email, city, or company
  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      student.city.toLowerCase().includes(term) ||
      student.company.toLowerCase().includes(term)
    );
  });

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <div>
          <h1>Student Data Dashboard</h1>
          <p>Real-time API integration with dynamic search</p>
        </div>
        <button onClick={fetchStudents} className="reload-btn" disabled={loading}>
          {loading ? 'Fetching...' : '🔄 Refresh Data'}
        </button>
      </header>

      {/* 3. Search Bar Input */}
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search by name, email, city, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="dashboard-search-input"
          disabled={loading || !!error}
        />
        {searchTerm && (
          <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
            ✕
          </button>
        )}
      </div>

      {loading && (
        <StatusMessage type="loading" message="Fetching student records from API..." />
      )}

      {error && (
        <StatusMessage type="error" message={error} onRetry={fetchStudents} />
      )}

      {/* 4. Pass the filtered list instead of raw students */}
      {!loading && !error && <StudentTable students={filteredStudents} />}
    </div>
  );
}