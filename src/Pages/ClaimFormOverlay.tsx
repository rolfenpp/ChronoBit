import React from 'react';

const ClaimFormOverlay = () => {
  const handlePickRandom = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Pick random unclaimed time clicked');
  };

  return (
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
        pointerEvents: 'none',
      }}
    >
      <div style={{ textAlign: 'center', color: '#fff', pointerEvents: 'auto' }}>
        <h1 style={{
          fontWeight: 200,
          fontSize: '4vw',
          letterSpacing: '0.08em',
          lineHeight: 1.15,
          color: '#fff',
          textAlign: 'center',
          margin: 0,
          marginBottom: '0.5em',
        }}>
          One Timeline. One Moment. One Owner.
        </h1>
        <div style={{
          fontWeight: 300,
          fontSize: '1.5vw',
          letterSpacing: '0.01em',
          color: '#e0e0f0',
          textAlign: 'center',
          margin: 0,
          marginBottom: '2em',
        }}>
          Every second can be claimed. Once it's yours, it's yours for eternity
        </div>
        <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1em', marginTop: '1em', pointerEvents: 'auto' }} onSubmit={e => e.preventDefault()}>
          <input
            type="datetime-local"
            style={{
              fontSize: '1.1em',
              padding: '0.5em 0.7em',
              borderRadius: '6px',
              border: '1px solid #bbb',
              background: 'rgba(255,255,255,0.95)',
              color: '#23213a',
              fontFamily: 'inherit',
              minWidth: '220px',
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
            }}
          />
          <button
            type="button"
            onClick={handlePickRandom}
            style={{
              background: 'rgba(255,255,255,0.18)',
              color: '#6c4ee6',
              fontSize: '0.95em',
              padding: '0.5em 1.1em',
              border: '1px solid rgba(108,78,230,0.25)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 400,
              marginRight: '0.5em',
              boxShadow: '0 1px 4px 0 rgba(108,78,230,0.08)',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(2px)',
            }}
          >
            Pick random unclaimed time
          </button>
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
              fontWeight: 400,
              boxShadow: '0 2px 16px 0 rgba(108,78,230,0.18)',
              transition: 'background 0.2s',
              backdropFilter: 'blur(2px)',
            }}
          >
            Immortalize this hour
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClaimFormOverlay; 