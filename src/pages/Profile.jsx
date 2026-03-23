import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// Dummy profiles data
const dummyProfiles = [
  {
    username: 'john_doe',
    fullName: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer passionate about React and Node.js',
    phone: '555-1234',
  },
  {
    username: 'jane_smith',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    bio: 'UI/UX designer with 5 years of experience',
    phone: '555-5678',
  },
  {
    username: 'bob_johnson',
    fullName: 'Bob Johnson',
    email: 'bob@example.com',
    bio: 'Full-stack developer specializing in Python and Django',
    phone: '555-9012',
  },
];

const defaultProfile = {
  fullName: '',
  email: '',
  bio: '',
  phone: '',
};

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  const foundProfile = useMemo(
    () => (username ? dummyProfiles.find((p) => p.username === username) : null),
    [username]
  );

  const [savedProfile, setSavedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const profile = useMemo(() => {
    if (!username) return defaultProfile;
    if (savedProfile?.username === username) return savedProfile;
    return foundProfile ?? defaultProfile;
  }, [username, foundProfile, savedProfile]);

  const nameRegex = /^[A-Za-z]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s+\-()]+$/;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: profile,
  });

  useEffect(() => {
    reset(profile);
  }, [profile, reset]);

  const profileValidationRules = {
    fullName: {
      required: 'Full name is required',
      validate: (value) => {
        const nameParts = value.split(' ');
        return (
          (nameRegex.test(nameParts[0]) && value.length >= 2) ||
          'Full name must contain only letters and be at least 2 characters'
        );
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value: emailRegex,
        message: 'Please enter a valid email format',
      },
    },
    phone: {
      required: 'Phone is required',
      pattern: {
        value: phoneRegex,
        message: 'Please enter a valid phone number',
      },
    },
    bio: {
      validate: (value) => value.length <= 200 || 'Bio must be 200 characters or less',
    },
  };

  const onSaveProfile = async (data) => {
    setSavedProfile({ ...data, username });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleBackToHome = () => navigate('/');
  const handleGoToSignup = () => navigate('/signup');

  if (!username) {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Blank Profile</h1>
        <p>No user is signed in. Please sign up or log in to view profile details.</p>
        <button onClick={() => navigate('/signup')} style={{ marginRight: '0.75rem' }}>
          Sign Up
        </button>
        <button onClick={handleBackToHome}>Home</button>
      </div>
    );
  }

  if (!foundProfile && !savedProfile) {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Profile Not Found</h1>
        <p>The profile for username "{username}" does not exist.</p>
        <button onClick={handleBackToHome}>Back to Home</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Profile of {profile.fullName || 'Guest'}</h1>

      {saveSuccess && (
        <div
          style={{
            backgroundColor: '#e8f5e9',
            border: '2px solid #4caf50',
            color: '#2e7d32',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            animation: 'slideDown 0.3s ease',
          }}
        >
          ✓ Profile updated successfully!
        </div>
      )}

      {!isEditing ? (
        <div style={{ border: '1px solid #ccc', padding: '1.5rem', borderRadius: '8px' }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3>Full Name:</h3>
            <p>{profile.fullName}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h3>Email:</h3>
            <p>{profile.email}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h3>Bio:</h3>
            <p>{profile.bio}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <h3>Phone:</h3>
            <p>{profile.phone}</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setValue('fullName', profile.fullName);
                setValue('email', profile.email);
                setValue('bio', profile.bio);
                setValue('phone', profile.phone);
                setIsEditing(true);
              }}
              style={{
                flex: 1,
                padding: '0.75rem 1.5rem',
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#555';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#333';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ✏️ Edit Profile
            </button>

            <button
              onClick={handleGoToSignup}
              style={{
                flex: 1,
                padding: '0.75rem 1.5rem',
                backgroundColor: '#61dafb',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3dd5f3';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#61dafb';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ➕ Create Account
            </button>

            <button
              onClick={handleBackToHome}
              style={{
                flex: 1,
                padding: '0.75rem 1.5rem',
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
              🏠 Home
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSaveProfile)}
          style={{
            border: '1px solid #ccc',
            padding: '1.5rem',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              {...register('fullName', profileValidationRules.fullName)}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: errors.fullName ? '2px solid #d32f2f' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: errors.fullName ? '#ffebee' : '#fff',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                if (!errors.fullName) {
                  e.currentTarget.style.borderColor = '#61dafb';
                  e.currentTarget.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
                }
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            {errors.fullName && (
              <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✗ {errors.fullName?.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...register('email', profileValidationRules.email)}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: errors.email ? '2px solid #d32f2f' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: errors.email ? '#ffebee' : '#fff',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.currentTarget.style.borderColor = '#61dafb';
                  e.currentTarget.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
                }
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            {errors.email && (
              <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✗ {errors.email?.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              {...register('bio', profileValidationRules.bio)}
              rows="4"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: errors.bio ? '2px solid #d32f2f' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: errors.bio ? '#ffebee' : '#fff',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                if (!errors.bio) {
                  e.currentTarget.style.borderColor = '#61dafb';
                  e.currentTarget.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
                }
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            {errors.bio && (
              <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✗ {errors.bio?.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              {...register('phone', profileValidationRules.phone)}
              placeholder="e.g., 555-1234 or +1(555)123-4567"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: errors.phone ? '2px solid #d32f2f' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: errors.phone ? '#ffebee' : '#fff',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                if (!errors.phone) {
                  e.currentTarget.style.borderColor = '#61dafb';
                  e.currentTarget.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
                }
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            {errors.phone && (
              <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✗ {errors.phone?.message}
              </span>
            )}
          </div>

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
                    : '#28a745',
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
            >
              {isSubmitting ? '⏳ Saving...' : Object.keys(errors).length > 0 ? '✗ Fix Errors' : '✓ Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                reset(profile);
              }}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ marginTop: 0 }}>State Output (React Hook Form):</h3>

        <div style={{ marginBottom: '1rem' }}>
          <h4>Profile State (Saved Data):</h4>
          <pre
            style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              border: '1px solid #ddd',
            }}
          >
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h4>Edit Mode Status:</h4>
          <pre
            style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              border: '1px solid #ddd',
              color: isEditing ? '#ff9800' : '#4caf50',
            }}
          >
            {JSON.stringify(
              {
                isEditing,
                isSubmitting,
                hasErrors: Object.keys(errors).length > 0,
                errorCount: Object.keys(errors).length,
              },
              null,
              2
            )}
          </pre>
        </div>

        <div>
          <h4>React Hook Form Errors & Validation Status:</h4>
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
            {Object.keys(errors).length > 0
              ? JSON.stringify(
                  {
                    fieldErrors: errors,
                    totalErrors: Object.keys(errors).length,
                    errorFields: Object.keys(errors),
                  },
                  (key, value) => {
                    if (value && typeof value === 'object' && 'message' in value) {
                      return value.message;
                    }
                    return value;
                  },
                  2
                )
              : '✅ All fields are valid - no errors'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Profile;
