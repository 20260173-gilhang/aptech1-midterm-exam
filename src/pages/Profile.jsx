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

  // Arrow function for handling input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
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
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: errors.fullName ? '2px solid red' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
            {errors.fullName && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.fullName}</span>}
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
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: errors.email ? '2px solid red' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
            {errors.email && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.email}</span>}
          </div>

          {/* Bio Input with onChange */}
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={editData.bio}
              onChange={handleInputChange}
              rows="4"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: errors.bio ? '2px solid red' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
            {errors.bio && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.bio}</span>}
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
              placeholder="e.g., 555-1234 or +1(555)123-4567"
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: errors.phone ? '2px solid red' : '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
            {errors.phone && <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.phone}</span>}
          </div>

          {/* Buttons with inline arrow functions */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditData(profile);
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
