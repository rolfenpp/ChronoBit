import React, { useState } from 'react';

function getCurrentDateTimeLocal() {
  const now = new Date();
  now.setSeconds(0, 0); // Remove seconds and ms for input compatibility
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

const ClaimFormOverlay = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dateTime, setDateTime] = useState(getCurrentDateTimeLocal());

  // Handler for the random time button
  const handlePickRandom = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Pick random unclaimed time clicked');
  };

  return (
    <>
      {/* Style for white calendar icon in Chromium browsers and button animation */}
      <style>{`
        input[type="datetime-local"]::-webkit-calendar-picker-indicator {
          filter: invert(1) brightness(2);
        }
      `}</style>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          pointerEvents: 'none', // allow 3D controls to work except for form
        }}
      >
        <div style={{ textAlign: 'center', color: '#fff', /* fontFamily: 'Poppins, Montserrat, Arial, sans-serif', */ pointerEvents: 'auto' }}>
          <h1 style={{
            fontWeight: 200,
            fontStyle: 'italic',
            fontSize: '3vw',
            letterSpacing: '0.04em',
            lineHeight: 1.15,
            color: '#fff',
            textAlign: 'center',
            margin: 0,
            marginBottom: '0.5em',
          }}>
            One Timeline. One Moment. One Owner.
          </h1>
          <h1 style={{
            fontWeight: 200,
            fontStyle: 'italic',
            fontSize: '3vw',
            letterSpacing: '0.04em',
            lineHeight: 1.15,
            color: '#fff',
            textAlign: 'center',
            margin: 0,
            marginBottom: '0.5em',
          }}>
            This Is Where It Would Live.
          </h1>
          <div style={{
            fontWeight: 200,
            fontStyle: 'italic',
            fontSize: '1.1vw',
            letterSpacing: '0.01em',
            color: '#e0e0f0',
            textAlign: 'center',
            margin: 0,
            marginBottom: '2em',
          }}>
            Every day can be claimed. Once it's yours, it's yours for eternity
          </div>
          <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1em', marginTop: '1em', pointerEvents: 'auto' }} onSubmit={e => e.preventDefault()}>
            <button
              type="submit"
              style={{
                background: 'rgba(108,78,230,0.32)',
                color: '#fff',
                fontSize: '1.1em',
                padding: '0.8em 2.2em',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 300,
                boxShadow: '0 2px 16px 0 rgba(108,78,230,0.18)',
                transition: 'background 0.2s',
                backdropFilter: 'blur(2px)',
              }}
            >
              Immortalize
            </button>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button
                type="button"
                onClick={handlePickRandom}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                aria-label="Pick a random unclaimed time"
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.18)',
                  border: '1px solid rgba(108,78,230,0.25)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginLeft: '0.5em',
                  boxShadow: '0 1px 4px 0 rgba(108,78,230,0.08)',
                  transition: 'background 0.2s',
                  backdropFilter: 'blur(2px)',
                  color: '#6c4ee6',
                  padding: 0,
                }}
              >
                {/* Shuffle/Random SVG icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 3 21 3 21 8" />
                  <line x1="4" y1="20" x2="21" y2="3" />
                  <polyline points="21 16 21 21 16 21" />
                  <line x1="15" y1="15" x2="21" y2="21" />
                  <line x1="4" y1="4" x2="9" y2="9" />
                </svg>
              </button>
              {showTooltip && (
                <div
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(30,30,40,0.95)',
                    color: '#fff',
                    padding: '0.4em 0.9em',
                    borderRadius: '6px',
                    fontSize: '0.95em',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)',
                    zIndex: 100,
                    pointerEvents: 'none',
                  }}
                >
                  Pick a random unclaimed time
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClaimFormOverlay; 