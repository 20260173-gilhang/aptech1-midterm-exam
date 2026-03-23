import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Arrow function for navigating to signup page
  const handleGetStarted = () => {
    navigate('/signup');
  };

  // Arrow function for navigating to profile page
  const handleViewProfile = () => {
    navigate('/profile/john_doe');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to Our Platform</h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
          Join our community and manage your profile with ease
        </p>
      </div>

      {/* Features Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            border: '1px solid #ddd',
            padding: '2rem',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3 style={{ color: '#333' }}>📝 Easy Registration</h3>
          <p>Sign up quickly with secure validation and password requirements.</p>
        </div>

        <div
          style={{
            border: '1px solid #ddd',
            padding: '2rem',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3 style={{ color: '#333' }}>👤 Profile Management</h3>
          <p>Edit and manage your profile information with real-time validation.</p>
        </div>

        <div
          style={{
            border: '1px solid #ddd',
            padding: '2rem',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3 style={{ color: '#333' }}>🔒 Secure & Validated</h3>
          <p>All data is validated with industry-standard regex patterns for security.</p>
        </div>
      </div>

      {/* CTA Buttons Section */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handleGetStarted}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#555';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#333';
            e.target.style.transform = 'scale(1)';
          }}
        >
          🚀 Get Started - Sign Up
        </button>

        <button
          onClick={handleViewProfile}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#61dafb',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#3dd5f3';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#61dafb';
            e.target.style.transform = 'scale(1)';
          }}
        >
          👤 View Profile
        </button>
      </div>

      {/* Info Section */}
      <div
        style={{
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <h3>Getting Started Guide</h3>
        <ol style={{ textAlign: 'left', maxWidth: '500px', margin: '1rem auto' }}>
          <li>Click "Get Started" to create a new account</li>
          <li>Fill in all required fields with valid information</li>
          <li>Your data will be validated in real-time</li>
          <li>Submit the form to see the success page</li>
          <li>Navigate to Profile to manage your information</li>
        </ol>
      </div>
    </div>
  );
};

export default Home;
