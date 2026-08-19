import { useState } from 'react';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  age: '',
  track: 'Web Development',
  agreeTerms: false,
};

export default function RegistrationForm({ onRegister }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  // Controlled Input Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Client-Side Validation Logic
  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required.';
    } else if (Number(formData.age) < 13 || Number(formData.age) > 100) {
      newErrors.age = 'Age must be between 13 and 100.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must accept the terms.';
    }

    return newErrors;
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onRegister({ id: Date.now(), ...formData });
    setFormData(INITIAL_FORM);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form" noValidate>
      <h2>Student Registration</h2>

      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={errors.fullName ? 'input-error' : ''}
        />
        {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={errors.age ? 'input-error' : ''}
          />
          {errors.age && <span className="error-msg">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="track">Track</label>
          <select id="track" name="track" value={formData.track} onChange={handleChange}>
            <option value="Web Development">Web Development</option>
            <option value="Data Science">Data Science</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </div>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
          />
          I agree to the code of conduct
        </label>
        {errors.agreeTerms && <span className="error-msg">{errors.agreeTerms}</span>}
      </div>

      <button type="submit" className="submit-btn">Register Student</button>
    </form>
  );
}