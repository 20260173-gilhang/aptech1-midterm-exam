import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Regular expressions for validation
  const nameRegex = /^[A-Za-z]{2,}$/;
  const usernameRegex = /^[A-Za-z0-9._-]+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation rules for react-hook-form
  const validationRules = {
    firstName: {
      required: 'First name is required',
      pattern: {
        value: nameRegex,
        message: 'First name must contain only letters and be at least 2 characters',
      },
    },
    lastName: {
      required: 'Last name is required',
      pattern: {
        value: nameRegex,
        message: 'Last name must contain only letters and be at least 2 characters',
      },
    },
    username: {
      required: 'Username is required',
      pattern: {
        value: usernameRegex,
        message: 'Username can only contain letters, numbers, dots, underscores, and hyphens',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: emailRegex,
        message: 'Please enter a valid email format (e.g., user@example.com)',
      },
    },
    password: {
      required: 'Password is required',
      pattern: {
        value: passwordRegex,
        message: 'Password must be 8-16 characters with at least 1 uppercase, 1 lowercase, 1 number, and 1 special character',
      },
    },
    confirmPassword: {
      required: 'Please confirm your password',
      validate: (value) => {
        const password = getValues('password');
        return value === password || 'Passwords do not match';
      },
    },
  };

  // Arrow function for form submission using react-hook-form
  const onSubmit = async (data) => {
    console.log('Form submitted successfully:', data);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    reset();
    navigate('/success');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Signup Page</h1>
      <p>Create your account here.</p>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* First Name Input - React Hook Form */}
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', validationRules.firstName)}
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
              ✗ {errors.firstName?.message}
            </span>
          )}
        </div>

        {/* Last Name Input - React Hook Form */}
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', validationRules.lastName)}
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
              ✗ {errors.lastName?.message}
            </span>
          )}
        </div>

        {/* Username Input - React Hook Form */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register('username', validationRules.username)}
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
              ✗ {errors.username?.message}
            </span>
          )}
        </div>

        {/* Email Input - React Hook Form */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', validationRules.email)}
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
              ✗ {errors.email?.message}
            </span>
          )}
        </div>

        {/* Password Input - React Hook Form */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', validationRules.password)}
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
              ✗ {errors.password?.message}
            </span>
          )}
        </div>

        {/* Confirm Password Input - React Hook Form */}
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', validationRules.confirmPassword)}
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
              ✗ {errors.confirmPassword?.message}
            </span>
          )}
        </div>

        {/* Buttons with inline arrow functions */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0 || isSubmitting}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor:
                Object.keys(errors).length > 0 || isSubmitting
                  ? '#ccc'
                  : '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor:
                Object.keys(errors).length > 0 || isSubmitting
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
            {isSubmitting ? '⏳ Submitting...' : Object.keys(errors).length > 0 ? '✗ Fix Errors' : '✓ Sign Up'}
          </button>
          <button
            type="button"
            onClick={() => reset()}
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
        <h3 style={{ marginTop: 0 }}>Form State (React Hook Form):</h3>

        <div style={{ marginBottom: '1rem' }}>
          <h4>Form Submission Status:</h4>
          <pre
            style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              border: '1px solid #ddd',
              color: isSubmitting ? '#ff9800' : '#4caf50',
            }}
          >
            {JSON.stringify(
              {
                isSubmitting,
                submitInProgress: isSubmitting,
                formReady: !isSubmitting,
              },
              null,
              2
            )}
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
