import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  // Arrow function for handling onChange events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Arrow function for validating form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email is required';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  // Arrow function for handling onSubmit event
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully:', formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
      navigate('/success');
    } else {
      setErrors(newErrors);
    }
  };

  // Inline arrow function for resetting form
  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Signup Page</h1>
      <p>Create your account here.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* First Name Input with onChange */}
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              border: errors.firstName ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {errors.firstName && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.firstName}</span>}
        </div>

        {/* Last Name Input with onChange */}
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              border: errors.lastName ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {errors.lastName && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.lastName}</span>}
        </div>

        {/* Email Input with onChange */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              border: errors.email ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.email}</span>}
        </div>

        {/* Password Input with onChange */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              border: errors.password ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {errors.password && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.password}</span>}
        </div>

        {/* Confirm Password Input with onChange */}
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              border: errors.confirmPassword ? '2px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          {errors.confirmPassword && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.confirmPassword}</span>}
        </div>

        {/* Buttons with inline arrow functions */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#999',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
