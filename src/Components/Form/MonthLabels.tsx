import React from 'react';

interface MonthLabelsProps {
  months: string[];
  onMonthClick: (monthIndex: number) => void;
}

const MonthLabels: React.FC<MonthLabelsProps> = ({ months, onMonthClick }) => {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateRows: 'repeat(12, 1fr)',
    }}>
      {months.map((month, i) => (
        <div
          key={month + i}
          onClick={() => onMonthClick(i)}
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 'clamp(10px, 1.3vw, 18px)',
            cursor: 'pointer',
            color: '#bcbcff',
            fontWeight: 400,
            letterSpacing: '0.05em',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#bcbcff';
          }}
        >
          {month}
        </div>
      ))}
    </div>
  );
};

export default MonthLabels; 