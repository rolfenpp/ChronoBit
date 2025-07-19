import React from 'react';
import { months, getDaysInMonth, formatDateDisplay } from './dateUtils';

interface MonthGridProps {
  year: number;
  monthIdx: number;
  selected: Set<string>;
  onSelect: (monthIdx: number, dayIdx: number) => void;
}

const MonthGrid: React.FC<MonthGridProps> = ({ year, monthIdx, selected, onSelect }) => {
  const days = getDaysInMonth(monthIdx, year);
  const rows = Math.ceil(days / 7);
  const getKey = (monthIdx: number, dayIdx: number) => `${year}-${monthIdx}-${dayIdx}`;
  const grid: React.ReactElement[] = [];
  let day = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < 7; col++) {
      if (day < days) {
        const key = getKey(monthIdx, day);
        const isSelected = selected.has(key);
        grid.push(
          <div
            key={monthIdx + '-' + (day + 1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              onClick={() => onSelect(monthIdx, day)}
                          style={{
              width: '100%',
              height: '100%',
              aspectRatio: '1',
                border: `1.5px solid ${isSelected ? '#bcbcff' : '#44445a'}`,
                borderRadius: 6,
                background: isSelected ? '#4f419c' : 'rgba(0,0,0,0.08)',
                cursor: 'pointer',
                opacity: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.18s, border 0.18s',
                boxShadow: isSelected ? '0 2px 12px 0 #4f419c44' : 'none',
                color: '#fff',
                fontWeight: 400,
                fontSize: '1vw',
                position: 'relative',
              }}
            >
              {/* Tooltip on hover */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(30,30,40,0.98)',
                    color: '#fff',
                    padding: '0.4em 1em',
                    borderRadius: 8,
                    fontSize: '0.95vw',
                    fontWeight: 300,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)',
                    zIndex: 100,
                    pointerEvents: 'none',
                    marginBottom: 6,
                  }}
                >
                  {formatDateDisplay(monthIdx, day, year)}
                </div>
              )}
              {/* Day number */}
              {day + 1}
            </div>
          </div>
        );
      } else {
        // Empty cell
        grid.push(
          <div key={monthIdx + '-empty-' + col + '-' + row} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%', aspectRatio: '1', opacity: 0 }} />
          </div>
        );
      }
      day++;
    }
  }
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: `repeat(7, 1fr)`, 
      gap: 'clamp(2px, 0.3vw, 8px)', 
      background: 'transparent',
      width: '100%',
      maxWidth: '600px'
    }}>
      {grid}
    </div>
  );
};

export default MonthGrid; 