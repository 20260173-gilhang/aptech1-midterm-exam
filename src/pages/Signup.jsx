import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  
  // Regular expressions for validation
  const nameRegex = /^[A-Za-z]{2,}$/;
  const usernameRegex = /^[A-Za-z0-9._-]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  // Arrow function for handling onChange events with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error for this field when user starts typing (real-time clearing)
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  // Arrow function for validating a single field (real-time validation)
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = 'First name is required';
        } else if (!nameRegex.test(value)) {
          error = 'First name must contain only letters and be at least 2 characters';
        }
        break;

      case 'lastName':
        if (!value.trim()) {
          error = 'Last name is required';
        } else if (!nameRegex.test(value)) {
          error = 'Last name must contain only letters and be at least 2 characters';
        }
        break;

      case 'username':
        if (!value.trim()) {
          error = 'Username is required';
        } else if (!usernameRegex.test(value)) {
          error = 'Username can only contain letters, numbers, dots, underscores, and hyphens';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email format (e.g., user@example.com)';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (!passwordRegex.test(value)) {
          error = 'Password must be 8-16 characters with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (formData.password !== value) {
          error = 'Passwords do not match';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Arrow function for handling onBlur events (real-time validation)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Arrow function for validating form with regex patterns
  const validateForm = () => {
    const newErrors = {};

    // Validate First Name: only letters, minimum 2 characters
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'First name must contain only letters and be at least 2 characters';
    }

    // Validate Last Name: only letters, minimum 2 characters
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = 'Last name must contain only letters and be at least 2 characters';
    }

    // Validate Username: letters, numbers, dot, underscore, hyphen
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, dots, underscores, and hyphens';
    }

    // Validate Email: valid email format
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email format (e.g., user@example.com)';
    }

    // Validate Password: 8-16 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be 8-16 characters with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character';
    }

    // Validate Password Confirmation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
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
        username: '',
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
      username: '',
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
            onBlur={handleBlur}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              border: errors.firstName ? '2px solid #d32f2f' : '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: errors.firstName ? '#ffebee' : '#fff',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onFocus={(e) => {
              if (!errors.firstName) {
                e.target.style.borderColor = '#61dafb';
                e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
              }
            }}
            onBlurCapture={(e) => {
              e.target.style.boxShadow = 'none';
            }}
          />
          {errors.firstName && (
            <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✗ {errors.firstName}
            </span>
          )}
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
            onBlur={handleBlur}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              border: errors.lastName ? '2px solid #d32f2f' : '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: errors.lastName ? '#ffebee' : '#fff',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onFocus={(e) => {
              if (!errors.lastName) {
                e.target.style.borderColor = '#61dafb';
                e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
              }
            }}
            onBlurCapture={(e) => {
              e.target.style.boxShadow = 'none';
            }}
          />
          {errors.lastName && (
            <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✗ {errors.lastName}
            </span>
          )}
        </div>

        {/* Username Input with onChange */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Letters, numbers, dots, underscores, hyphens"
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              border: errors.username ? '2px solid #d32f2f' : '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: errors.username ? '#ffebee' : '#fff',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onFocus={(e) => {
              if (!errors.username) {
                e.target.style.borderColor = '#61dafb';
                e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
              }
            }}
            onBlurCapture={(e) => {
              e.target.style.boxShadow = 'none';
            }}
          />
          {errors.username && (
            <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✗ {errors.username}
            </span>
          )}
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
            onBlur={handleBlur}
            placeholder="user@example.com"
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              border: errors.email ? '2px solid #d32f2f' : '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: errors.email ? '#ffebee' : '#fff',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onFocus={(e) => {
              if (!errors.email) {
                e.target.style.borderColor = '#61dafb';
                e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
              }
            }}
            onBlurCapture={(e) => {
              e.target.style.boxShadow = 'none';
            }}
          />
          {errors.email && (
            <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✗ {errors.email}
            </span>
          )}
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
            onBlur={handleBlur}
            placeholder="8-16 chars: 1 uppercase, 1 lowercase, 1 number, 1 special char"
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              border: errors.password ? '2px solid #d32f2f' : '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: errors.password ? '#ffebee' : '#fff',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onFocus={(e) => {
              if (!errors.password) {
                e.target.style.borderColor = '#61dafb';
                e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
              }
            }}
            onBlurCapture={(e) => {
              e.target.style.boxShadow = 'none';
            }}
          />
          {errors.password && (
            <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✗ {errors.password}
            </span>
          )}
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
            onBlur={handleBlur}
            style={{
              width: '100%',
              padding: '0.5rem',
              marginTop: '0.5rem',
              border: errors.confirmPassword ? '2px solid #d32f2f' : '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: errors.confirmPassword ? '#ffebee' : '#fff',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onFocus={(e) => {
              if (!errors.confirmPassword) {
                e.target.style.borderColor = '#61dafb';
                e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
              }
            }}
            onBlurCapture={(e) => {
              e.target.style.boxShadow = 'none';
            }}
          />
          {errors.confirmPassword && (
            <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✗ {errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Buttons with inline arrow functions */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0 || !formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor:
                Object.keys(errors).length > 0 || !formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword
                  ? '#ccc'
                  : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor:
                Object.keys(errors).length > 0 || !formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password || !formData.confirmPassword
                  ? 'not-allowed'
                  : 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = '#555';
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = '#333';
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            {Object.keys(errors).length > 0 ? '✗ Fix Errors' : '✓ Sign Up'}
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
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#bbb';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#999';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* State Output Binding Section */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginTop: 0 }}>State Output (useState Binding):</h3>

        <div style={{ marginBottom: '1rem' }}>
          <h4>Form Data State:</h4>
          <pre
            style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              border: '1px solid #ddd',
            }}
          >
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>

        <div>
          <h4>Errors State:</h4>
          <pre
            style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              border: '1px solid #ddd',
              color: Object.keys(errors).length > 0 ? '#d32f2f' : '#4caf50',
            }}
          >
            {JSON.stringify(
              Object.keys(errors).length > 0 ? errors : { message: 'No errors' },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Signup;
