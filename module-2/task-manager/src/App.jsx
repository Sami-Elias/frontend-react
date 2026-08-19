import { useState } from 'react';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    topic: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
  });

  // Handle input changes dynamically for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add task to state
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newTask = {
      id: Date.now(),
      ...form,
      completed: false,
    };

    setTasks([newTask, ...tasks]);

    // Reset form
    setForm({
      title: '',
      topic: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
    });
  };

  // Toggle completion status
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-row">
          <input
            type="text"
            name="title"
            placeholder="Task Title *"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="topic"
            placeholder="Topic / Category"
            value={form.topic}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="description"
          placeholder="Task description..."
          value={form.description}
          onChange={handleChange}
          rows="2"
        />

        <div className="form-row">
          <input
            type="datetime-local"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>

        <button type="submit" className="add-btn">Add Task</button>
      </form>

      {tasks.length === 0 ? (
        <p className="empty-message">No tasks yet! Add one above.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-card ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-header">
                {task.topic && <span className="topic-badge">{task.topic}</span>}
                <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>

              <h3>{task.title}</h3>

              {task.description && <p className="description">{task.description}</p>}

              {task.dueDate && (
                <p className="due-date">
                  📅 {new Date(task.dueDate).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </p>
              )}

              <div className="card-actions">
                <button onClick={() => toggleTask(task.id)} className="status-btn">
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => deleteTask(task.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}