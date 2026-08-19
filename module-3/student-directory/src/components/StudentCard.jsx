export default function StudentCard({ student }) {
  return (
    <div className="student-card">
      <div className="card-header">
        <h3>{student.name}</h3>
        <span className="badge">{student.grade}</span>
      </div>
      <p className="track"><strong>Track:</strong> {student.track}</p>
      <div className="skills-list">
        {student.skills.map((skill, index) => (
          <span key={index} className="skill-tag">{skill}</span>
        ))}
      </div>
    </div>
  );
}