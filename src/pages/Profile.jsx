import { useState } from 'react';
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

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  
  // Regular expressions for validation
  const nameRegex = /^[A-Za-z]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s+\-()]+$/;

  // Find the profile based on username
  const foundProfile = dummyProfiles.find(profile => profile.username === username);
  
  const [profile, setProfile] = useState(foundProfile || {
    fullName: '',
    email: '',
    bio: '',
    phone: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors, isSubmitting: isEditSubmitting },
    reset: resetEdit,
    setValue,
  } = useForm({
    mode: 'onBlur',
    defaultValues: profile,
  });

  // Validation rules for profile editing
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
      validate: (value) => {
        return value.length <= 200 || 'Bio must be 200 characters or less';
      },
    },
  };

  // Arrow function for handling save with react-hook-form
  const onSaveProfile = async (data) => {
    console.log('Profile updated:', data);
    setProfile(data);
    setIsEditing(false);
    setSaveSuccess(true);

    // Show success message for 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Arrow function for navigating back to home
  const handleBackToHome = () => {
    navigate('/');
  };

  // Arrow function for navigating to signup
  const handleGoToSignup = () => {
    navigate('/signup');
  };

  if (!foundProfile) {
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
      <h1>Profile of {profile.fullName}</h1>

          {/* Success Message */}
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
        // View Mode
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

          {/* Inline arrow function for edit button */}
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
                e.target.style.backgroundColor = '#555';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#333';
                e.target.style.transform = 'scale(1)';
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
                e.target.style.backgroundColor = '#3dd5f3';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#61dafb';
                e.target.style.transform = 'scale(1)';
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
                e.target.style.backgroundColor = '#bbb';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#999';
                e.target.style.transform = 'scale(1)';
              }}
            >
              🏠 Home
            </button>
          </div>
        </div>
      ) : (
        // Edit Mode - React Hook Form
        <form
          onSubmit={handleSubmitEdit(onSaveProfile)}
          style={{
            border: '1px solid #ccc',
            padding: '1.5rem',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Full Name Input - React Hook Form */}
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              {...registerEdit('fullName', profileValidationRules.fullName)}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: editErrors.fullName ? '2px solid #d32f2f' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: editErrors.fullName ? '#ffebee' : '#fff',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                if (!editErrors.fullName) {
                  e.target.style.borderColor = '#61dafb';
                  e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
                }
              }}
              onBlurCapture={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
            {editErrors.fullName && (
              <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✗ {editErrors.fullName?.message}
              </span>
            )}
          </div>

          {/* Email Input - React Hook Form */}
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              {...registerEdit('email', profileValidationRules.email)}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: editErrors.email ? '2px solid #d32f2f' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: editErrors.email ? '#ffebee' : '#fff',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                if (!editErrors.email) {
                  e.target.style.borderColor = '#61dafb';
                  e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
                }
              }}
              onBlurCapture={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
            {editErrors.email && (
              <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✗ {editErrors.email?.message}
              </span>
            )}
          </div>

          {/* Bio Input - React Hook Form */}
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              {...registerEdit('bio', profileValidationRules.bio)}
              rows="4"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: editErrors.bio ? '2px solid #d32f2f' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: editErrors.bio ? '#ffebee' : '#fff',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                if (!editErrors.bio) {
                  e.target.style.borderColor = '#61dafb';
                  e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
                }
              }}
              onBlurCapture={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
            {editErrors.bio && (
              <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✗ {editErrors.bio?.message}
              </span>
            )}
          </div>

          {/* Phone Input - React Hook Form */}
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              {...registerEdit('phone', profileValidationRules.phone)}
              placeholder="e.g., 555-1234 or +1(555)123-4567"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: editErrors.phone ? '2px solid #d32f2f' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
                backgroundColor: editErrors.phone ? '#ffebee' : '#fff',
                transition: 'all 0.3s ease',
                outline: 'none',
              }}
              onFocus={(e) => {
                if (!editErrors.phone) {
                  e.target.style.borderColor = '#61dafb';
                  e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
                }
              }}
              onBlurCapture={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
            {editErrors.phone && (
              <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✗ {editErrors.phone?.message}
              </span>
            )}
          </div>

          {/* Buttons with inline arrow functions */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              disabled={Object.keys(editErrors).length > 0 || isEditSubmitting}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor:
                  Object.keys(editErrors).length > 0 || isEditSubmitting
                    ? '#ccc'
                    : '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor:
                  Object.keys(editErrors).length > 0 || isEditSubmitting
                    ? 'not-allowed'
                    : 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = '#218838';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = '#28a745';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {isEditSubmitting ? '⏳ Saving...' : Object.keys(editErrors).length > 0 ? '✗ Fix Errors' : '✓ Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                resetEdit();
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

      {/* State Output Binding Section - React Hook Form */}
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
                isEditSubmitting,
                hasErrors: Object.keys(editErrors).length > 0,
                errorCount: Object.keys(editErrors).length,
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
              color: Object.keys(editErrors).length > 0 ? '#d32f2f' : '#4caf50',
            }}
          >
            {Object.keys(editErrors).length > 0
              ? JSON.stringify(
                  {
                    fieldErrors: editErrors,
                    totalErrors: Object.keys(editErrors).length,
                    errorFields: Object.keys(editErrors),
                  },
                  (key, value) => {
                    // Format error objects to show just the message
                    if (value && typeof value === 'object' && 'message' in value) {
                      return value.message;
                    }
                    return value;
                  },
                  2
                )
              : '✅ All fields are valid - no errors'
            }
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Profile;
