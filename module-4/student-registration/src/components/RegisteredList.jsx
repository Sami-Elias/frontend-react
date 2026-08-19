export default function RegisteredList({ registrations }) {
  return (
    <section className="records-section">
      <h3>Registered Students ({registrations.length})</h3>
      {registrations.length === 0 ? (
        <p className="empty-state">No registrations submitted yet.</p>
      ) : (
        <ul className="records-list">
          {registrations.map((student) => (
            <li key={student.id} className="record-card">
              <div>
                <strong>{student.fullName}</strong> ({student.age} yrs)
                <span className="email-sub">{student.email}</span>
              </div>
              <span className="track-badge">{student.track}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}