import React from 'react';
import { months, getDaysInMonthForYear, getMaxDaysInAnyMonth, formatDateDisplay } from './dateUtils';

interface YearGridProps {
  year: number;
  selected: Set<string>;
  onSelect: (monthIdx: number, dayIdx: number) => void;
  onMonthClick?: (monthIdx: number) => void;
}

const YearGrid: React.FC<YearGridProps> = ({ year, selected, onSelect, onMonthClick }) => {
  const daysInMonth = getDaysInMonthForYear(year);
  const maxDays = getMaxDaysInAnyMonth();
  const getKey = (monthIdx: number, dayIdx: number) => `${year}-${monthIdx}-${dayIdx}`;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${maxDays}, 1fr)`,
      gap: 'clamp(2px, 0.3vw, 8px)',
      background: 'transparent',
      flex: 1
    }}>
      {months.map((month, monthIdx) =>
        Array.from({ length: maxDays }).map((_, dayIdx) => {
          const isValid = dayIdx < daysInMonth[monthIdx];
          const key = getKey(monthIdx, dayIdx);
          const isSelected = selected.has(key);
          return (
            <div
              key={month + '-' + (dayIdx + 1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                className={`calendar-cell${isSelected ? ' selected' : ''}`}
                style={{
                  width: '100%',
                  height: '100%',
                  aspectRatio: '1',
                  border: '1.5px solid #44445a',
                  borderRadius: 6,
                  background: isSelected ? '#4f419c' : 'rgba(0,0,0,0.08)',
                  cursor: isValid ? 'pointer' : 'default',
                  opacity: isValid ? 1 : 0.15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 400,
                  fontSize: '1vw',
                  position: 'relative',
                  transition: 'border 0.18s, background 0.18s',
                  zIndex: 1,
                }}
                onClick={() => { if (isValid) onSelect(monthIdx, dayIdx); }}
              >
                {isValid ? dayIdx + 1 : ''}
                {isValid && (
                  <div className="calendar-tooltip">
                    {formatDateDisplay(monthIdx, dayIdx, year)}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default YearGrid; 