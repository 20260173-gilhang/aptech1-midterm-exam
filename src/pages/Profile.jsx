import { useState } from 'react';

const Profile = () => {
  // Regular expressions for validation
  const nameRegex = /^[A-Za-z]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\-\s\+\(\)]+$/;

  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer',
    phone: '555-1234',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profile);
  const [errors, setErrors] = useState({});

  // Arrow function for handling input changes with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
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
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (!nameRegex.test(value.split(' ')[0])) {
          error = 'Full name must contain only letters';
        } else if (value.length < 2) {
          error = 'Full name must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email format';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          error = 'Phone is required';
        } else if (!phoneRegex.test(value)) {
          error = 'Please enter a valid phone number';
        }
        break;

      case 'bio':
        if (value && value.length > 200) {
          error = 'Bio must be 200 characters or less';
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

  // Arrow function for validating profile data
  const validateProfileData = () => {
    const newErrors = {};

    // Validate Full Name: only letters, minimum 2 characters
    if (!editData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (!nameRegex.test(editData.fullName.split(' ')[0])) {
      newErrors.fullName = 'Full name must contain only letters';
    } else if (editData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Validate Email: valid email format
    if (!editData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(editData.email)) {
      newErrors.email = 'Please enter a valid email format';
    }

    // Validate Phone: valid phone format
    if (!editData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!phoneRegex.test(editData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate Bio: basic check
    if (editData.bio && editData.bio.length > 200) {
      newErrors.bio = 'Bio must be 200 characters or less';
    }

    return newErrors;
  };

  // Arrow function for handling save
  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = validateProfileData();

    if (Object.keys(newErrors).length === 0) {
      setProfile(editData);
      setIsEditing(false);
      setErrors({});
      alert('Profile updated successfully!');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Profile Page</h1>

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
          <button
            onClick={() => {
              setEditData(profile);
              setIsEditing(true);
            }}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        // Edit Mode
        <form
          onSubmit={handleSave}
          style={{
            border: '1px solid #ccc',
            padding: '1.5rem',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Full Name Input with onChange */}
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={editData.fullName}
              onChange={handleInputChange}
              onBlur={handleBlur}
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
                  e.target.style.borderColor = '#61dafb';
                  e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
                }
              }}
              onBlurCapture={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.fullName && (
              <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✗ {errors.fullName}
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
              value={editData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
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

          {/* Bio Input with onChange */}
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={editData.bio}
              onChange={handleInputChange}
              onBlur={handleBlur}
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
                  e.target.style.borderColor = '#61dafb';
                  e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
                }
              }}
              onBlurCapture={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.bio && (
              <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✗ {errors.bio}
              </span>
            )}
          </div>

          {/* Phone Input with onChange */}
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={editData.phone}
              onChange={handleInputChange}
              onBlur={handleBlur}
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
                  e.target.style.borderColor = '#61dafb';
                  e.target.style.boxShadow = '0 0 5px rgba(97, 218, 251, 0.5)';
                }
              }}
              onBlurCapture={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
            {errors.phone && (
              <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                ✗ {errors.phone}
              </span>
            )}
          </div>

          {/* Buttons with inline arrow functions */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0 || !editData.fullName || !editData.email || !editData.phone}
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor:
                  Object.keys(errors).length > 0 || !editData.fullName || !editData.email || !editData.phone
                    ? '#ccc'
                    : '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor:
                  Object.keys(errors).length > 0 || !editData.fullName || !editData.email || !editData.phone
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
              {Object.keys(errors).length > 0 ? '✗ Fix Errors' : '✓ Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditData(profile);
                setErrors({});
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
          <h4>Profile State:</h4>
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
          <h4>Is Editing State:</h4>
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
            {JSON.stringify({ isEditing }, null, 2)}
          </pre>
        </div>

        <div>
          <h4>Edit Data State (Current Form Values):</h4>
          <pre
            style={{
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '4px',
              overflow: 'auto',
              border: '1px solid #ddd',
            }}
          >
            {JSON.stringify(editData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Profile;
