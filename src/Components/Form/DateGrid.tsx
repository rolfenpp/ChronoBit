import React, { useState } from 'react';
import YearGrid from './YearGrid';
import MonthGrid from './MonthGrid';
import ImmortalizeModal from './ImmortalizeModal';
import ControlsPanel from './ControlsPanel';
import MonthLabels from './MonthLabels';
import { months, formatDateDisplay } from './dateUtils';

type ViewType = 'month' | 'year' | 'roman' | 'ww2';

interface SelectedDate {
  year: number;
  month: number;
  day: number;
  key: string;
}

const DateGrid: React.FC = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
  const [hovered, setHovered] = useState<{ month: number; day: number } | null>(null);
  const [viewMonth, setViewMonth] = useState<number | null>(null); // null = year view, 0-11 = month view
  const [currentView, setCurrentView] = useState<ViewType>('year');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (monthIdx: number, dayIdx: number) => {
    const key = `${year}-${monthIdx}-${dayIdx}`;
    const selectedDate: SelectedDate = {
      year,
      month: monthIdx,
      day: dayIdx,
      key,
    };

    setSelected(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });

    setSelectedDates(prev => {
      const exists = prev.find(date => date.key === key);
      if (exists) {
        return prev.filter(date => date.key !== key);
      } else {
        return [...prev, selectedDate];
      }
    });

    const dateStr = formatDateDisplay(monthIdx, dayIdx, year);
    console.log('Clicked:', dateStr);
  };

  const handleHover = (monthIdx: number, dayIdx: number | null) => {
    if (dayIdx === null) setHovered(null);
    else setHovered({ month: monthIdx, day: dayIdx });
  };

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setViewMonth(null);
  };

  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    setViewMonth(null);
  };

  const handleImmortalizeClick = () => {
    if (selectedDates.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = (data: { dates: SelectedDate[]; text?: string; image?: File }) => {
    console.log('Immortalizing:', data);
    // Here you would typically send the data to your backend
    // For now, just clear the selection and close modal
    setSelected(new Set());
    setSelectedDates([]);
    setIsModalOpen(false);
    
    // You could show a success message here
    alert(`Successfully immortalized ${data.dates.length} moment(s)!`);
  };

  const handleClearSelection = () => {
    setSelected(new Set());
    setSelectedDates([]);
  };

  return (
    <>
      <div>
      <ControlsPanel
        currentView={currentView}
        onViewChange={handleViewChange}
        year={year}
        onYearChange={handleYearChange}
        selectedDates={selectedDates}
        onImmortalizeClick={handleImmortalizeClick}
        onClearSelection={handleClearSelection}
      />
      </div>
        {viewMonth === null ? (
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <MonthLabels months={months} onMonthClick={setViewMonth} />
            <YearGrid
              year={year}
              selected={selected}
              onSelect={handleSelect}
              onMonthClick={setViewMonth}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px' }}>
            <div style={{ color: '#bcbcff', fontWeight: 400, fontSize: '1.5vw', letterSpacing: '0.08em', textAlign: 'center' }}>
              {months[viewMonth].charAt(0) + months[viewMonth].slice(1).toLowerCase()}
            </div>
            <MonthGrid
              year={year}
              monthIdx={viewMonth}
              selected={selected}
              onSelect={handleSelect}
            />
          </div>
        )}

      {/* Immortalize Modal */}
      <ImmortalizeModal
        isOpen={isModalOpen}
        selectedDates={selectedDates}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />
    </>
  );
};

export default DateGrid; 