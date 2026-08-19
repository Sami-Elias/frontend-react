export default function StudentTable({ students }) {
  if (students.length === 0) {
    return <p className="empty-state">No student records found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Company / Focus</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>#{student.id}</td>
              <td className="font-semibold">{student.name}</td>
              <td>{student.email}</td>
              <td>{student.city}</td>
              <td className="dept-cell">{student.company}</td>
              <td>
                <span className={`status-pill ${student.status.toLowerCase()}`}>
                  {student.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}