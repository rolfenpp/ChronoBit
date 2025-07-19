import React from 'react';
import WaveGridBackground from '../Components/3D/WaveGridBackground';

const Profile: React.FC = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', 
    justifyContent: 'center', color: '#fff' }}>
        <WaveGridBackground />
      <h1 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Profile</h1>
      <div style={{ fontSize: '1.2rem', opacity: 0.7 }}>
        {/* Profile details and actions will go here */}
        This is your profile page. Add your user info, settings, and more here.
      </div>
    </div>
  );
};

export default Profile; 