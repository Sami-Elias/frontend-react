import StudentCard from './StudentCard';

export default function StudentList({ students }) {
  if (students.length === 0) {
    return <p className="empty">No students found matching your search.</p>;
  }

  return (
    <div className="student-grid">
      {/* 1. Rendering Arrays with .map()  |  2. Assigning unique keys */}
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}