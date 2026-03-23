import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  // Arrow function for navigating back to home
  const handleBackToHome = () => {
    navigate('/');
  };

  // Arrow function for navigating to profile
  const handleGoToProfile = () => {
    navigate('/profile');
  };

  // Arrow function for creating another account
  const handleSignUpAgain = () => {
    navigate('/signup');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div
        style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: '#e8f5e9',
          border: '2px solid #4caf50',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✓</div>
        <h1 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Success!</h1>
        <p style={{ fontSize: '1.1rem', color: '#558b2f', marginBottom: '1.5rem' }}>
          Your account has been created successfully. Welcome to our platform!
        </p>
      </div>

      {/* Success Details */}
      <div
        style={{
          backgroundColor: '#f5f5f5',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
        }}
      >
        <h3 style={{ marginTop: 0 }}>What's Next?</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✓ Your account has been successfully registered</li>
          <li>✓ You can now access your profile anytime</li>
          <li>✓ Update your information whenever needed</li>
          <li>✓ All your data is securely stored</li>
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <button
          onClick={handleGoToProfile}
          style={{
            padding: '1rem',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#388e3c';
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#4caf50';
            e.target.style.transform = 'scale(1)';
          }}
        >
          👤 Go to Profile
        </button>

        <button
          onClick={handleSignUpAgain}
          style={{
            padding: '1rem',
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
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#61dafb';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ➕ Create Another Account
        </button>

        <button
          onClick={handleBackToHome}
          style={{
            padding: '1rem',
            backgroundColor: '#999',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
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
          🏠 Back to Home
        </button>
      </div>

      {/* Celebration Message */}
      <div
        style={{
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: '#fff3e0',
          border: '1px solid #ffb74d',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <h4 style={{ marginTop: 0 }}>🎉 Congratulations!</h4>
        <p>
          You have successfully registered and completed the form submission with full validation!
        </p>
      </div>
    </div>
  );
};

export default Success;
