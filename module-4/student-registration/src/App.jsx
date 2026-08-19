import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import RegisteredList from './components/RegisteredList';
import './App.css';

export default function App() {
  const [registrations, setRegistrations] = useState([]);

  const handleRegister = (newStudent) => {
    setRegistrations([newStudent, ...registrations]);
  };

  return (
    <div className="app-container">
      <RegistrationForm onRegister={handleRegister} />
      <RegisteredList registrations={registrations} />
    </div>
  );
}