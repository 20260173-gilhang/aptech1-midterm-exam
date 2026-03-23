import { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    bio: 'Software developer',
    phone: '555-1234',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profile);

  // Arrow function for handling input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Arrow function for handling save
  const handleSave = (e) => {
    e.preventDefault();
    setProfile(editData);
    setIsEditing(false);
    alert('Profile updated successfully!');
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
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
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
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
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
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
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
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
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
    </div>
  );
};

export default Profile;
