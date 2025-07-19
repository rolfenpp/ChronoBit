import React, { useState, useRef, useEffect } from 'react';
import { MdDelete } from 'react-icons/md';

type ViewType = 'month' | 'year' | 'roman' | 'ww2';

interface ViewOption {
  id: ViewType;
  label: string;
  enabled: boolean;
}

interface SelectedDate {
  year: number;
  month: number;
  day: number;
  key: string;
}

interface ControlsPanelProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  year: number;
  onYearChange: (year: number) => void;
  selectedDates: SelectedDate[];
  onImmortalizeClick: () => void;
  onClearSelection: () => void; // Add this prop
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  currentView,
  onViewChange,
  year,
  onYearChange,
  selectedDates,
  onImmortalizeClick,
  onClearSelection,
}) => {
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [editYearValue, setEditYearValue] = useState(year.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  const viewOptions: ViewOption[] = [
    { id: 'year', label: 'Year', enabled: true },
    { id: 'roman', label: 'Roman Times', enabled: false },
    { id: 'ww2', label: 'WW2 Era', enabled: false },
  ];

  const handleYearClick = () => {
    setIsEditingYear(true);
    setEditYearValue(year.toString());
  };

  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditYearValue(e.target.value);
  };

  const handleYearInputSubmit = () => {
    const newYear = parseInt(editYearValue, 10);
    if (!isNaN(newYear) && newYear >= 1900 && newYear <= 2100) {
      onYearChange(newYear);
    }
    setIsEditingYear(false);
  };

  const handleYearInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleYearInputSubmit();
    } else if (e.key === 'Escape') {
      setIsEditingYear(false);
      setEditYearValue(year.toString());
    }
  };

  useEffect(() => {
    if (isEditingYear && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingYear]);

  useEffect(() => {
    setEditYearValue(year.toString());
  }, [year]);

  return (
    <div style={{ display: 'flex', width: '100%'}}>
      <div>
        <div style={{
          display: 'flex',
          background: 'rgba(30, 30, 40, 0.4)',
          borderRadius: '12px',
          padding: '4px',
          border: '1px solid rgba(80, 80, 100, 0.3)',
          backdropFilter: 'blur(8px)',
        }}>
          {viewOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => option.enabled && onViewChange(option.id)}
              disabled={!option.enabled}
              style={{
                padding: '0.5rem 1rem',
                background: currentView === option.id ? 'rgba(108, 78, 230, 0.8)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: option.enabled 
                  ? (currentView === option.id ? '#fff' : 'rgba(255, 255, 255, 0.8)')
                  : 'rgba(255, 255, 255, 0.3)',
                fontSize: '0.9rem',
                fontWeight: currentView === option.id ? 500 : 400,
                cursor: option.enabled ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                fontFamily: 'Poppins, Arial, sans-serif',
                letterSpacing: '0.01em',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (option.enabled && currentView !== option.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (option.enabled && currentView !== option.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {option.label}
              {!option.enabled && (
                <span style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.7rem',
                  color: 'rgba(255, 255, 255, 0.4)',
                  whiteSpace: 'nowrap',
                }}>
                  Coming Soon
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Year Navigator */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'rgba(30, 30, 40, 0.4)',
          borderRadius: '12px',
          padding: '0.8rem 1.5rem',
          border: '1px solid rgba(80, 80, 100, 0.3)',
          backdropFilter: 'blur(8px)',
        }}>
          <button
            onClick={() => onYearChange(year - 1)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.8)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
            }}
          >
            ←
          </button>

          {isEditingYear ? (
            <input
              ref={inputRef}
              type="text"
              value={editYearValue}
              onChange={handleYearInputChange}
              onBlur={handleYearInputSubmit}
              onKeyDown={handleYearInputKeyDown}
              style={{
                background: 'rgba(50, 50, 60, 0.8)',
                border: '1px solid rgba(108, 78, 230, 0.6)',
                borderRadius: '6px',
                color: '#fff',
                padding: '0.3rem 0.6rem',
                fontSize: '1.1rem',
                fontWeight: 500,
                textAlign: 'center',
                width: '80px',
                fontFamily: 'Poppins, Arial, sans-serif',
              }}
            />
          ) : (
            <button
              onClick={handleYearClick}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '0.2rem 0.4rem',
                borderRadius: '4px',
                transition: 'background 0.2s ease',
                fontFamily: 'Poppins, Arial, sans-serif',
                minWidth: '60px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {year}
            </button>
          )}

          <button
            onClick={() => onYearChange(year + 1)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.8)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Immortalize Button */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Clear Selection Button */}
        <button
          onClick={selectedDates.length > 0 ? onClearSelection : undefined}
          disabled={selectedDates.length === 0}
          aria-label="Clear Selection"
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(40, 40, 50, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            color: selectedDates.length > 0 ? '#fff' : 'rgba(255, 255, 255, 0.5)',
            fontSize: '1.2rem',
            fontWeight: 400,
            cursor: selectedDates.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            fontFamily: 'Poppins, Arial, sans-serif',
            opacity: selectedDates.length > 0 ? 1 : 0.5,
          }}
          onMouseEnter={e => {
            if (selectedDates.length > 0) {
              e.currentTarget.style.background = 'rgba(255, 80, 80, 0.8)';
              e.currentTarget.style.color = '#fff';
            }
          }}
          onMouseLeave={e => {
            if (selectedDates.length > 0) {
              e.currentTarget.style.background = 'rgba(40, 40, 50, 0.7)';
              e.currentTarget.style.color = '#fff';
            }
          }}
        >
          <MdDelete size={20} />
        </button>
        <button
          onClick={selectedDates.length > 0 ? onImmortalizeClick : undefined}
          disabled={selectedDates.length === 0}
          style={{
            padding: '0.8rem 2rem',
            background: selectedDates.length > 0 ? 'rgba(108, 78, 230, 0.8)' : 'transparent',
            border: selectedDates.length > 0 
              ? '1px solid rgba(108, 78, 230, 0.6)' 
              : '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            color: selectedDates.length > 0 ? '#fff' : 'rgba(255, 255, 255, 0.5)',
            fontSize: '1rem',
            fontWeight: 400,
            cursor: selectedDates.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            boxShadow: selectedDates.length > 0 ? '0 4px 16px rgba(108, 78, 230, 0.3)' : 'none',
            backdropFilter: 'blur(4px)',
            fontFamily: 'Poppins, Arial, sans-serif',
            letterSpacing: '0.02em',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            if (selectedDates.length > 0) {
              e.currentTarget.style.background = 'rgba(108, 78, 230, 1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(108, 78, 230, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedDates.length > 0) {
              e.currentTarget.style.background = 'rgba(108, 78, 230, 0.8)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(108, 78, 230, 0.3)';
            }
          }}
        >
          {selectedDates.length === 1
            ? 'Immortalize'
            : selectedDates.length > 1
              ? `Immortalize ${selectedDates.length}`
              : 'Immortalize'
          }
        </button>
      </div>
    </div>
  );
};

export default ControlsPanel; 