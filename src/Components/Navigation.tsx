import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Claim' },
    { path: '/vault', label: 'Vault' },
    { path: '/claim', label: 'Home' },
    { path: '/profile', label: 'Profile' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      background: 'rgba(30, 30, 40, 0.85)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(108, 78, 230, 0.2)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
    }}>
      {/* Logo/Brand */}
      <div style={{
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 300,
        fontStyle: 'italic',
        letterSpacing: '0.05em',
      }}>
        Chronobit
      </div>

      {/* Navigation Links */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
      }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              color: location.pathname === item.path ? '#6c4ee6' : '#e0e0f0',
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: 300,
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              background: location.pathname === item.path 
                ? 'rgba(108, 78, 230, 0.15)' 
                : 'transparent',
              border: location.pathname === item.path 
                ? '1px solid rgba(108, 78, 230, 0.3)' 
                : '1px solid transparent',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              if (location.pathname !== item.path) {
                e.currentTarget.style.color = '#e0e0f0';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 