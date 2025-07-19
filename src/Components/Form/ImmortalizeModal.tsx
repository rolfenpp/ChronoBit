import React, { useState, useRef } from 'react';
import { formatDateDisplay } from './dateUtils';

interface SelectedDate {
  year: number;
  month: number;
  day: number;
  key: string;
}

interface ImmortalizeModalProps {
  isOpen: boolean;
  selectedDates: SelectedDate[];
  onClose: () => void;
  onConfirm: (data: { dates: SelectedDate[]; text?: string; image?: File }) => void;
}

const ImmortalizeModal: React.FC<ImmortalizeModalProps> = ({
  isOpen,
  selectedDates,
  onClose,
  onConfirm,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleConfirm = () => {
    onConfirm({
      dates: selectedDates,
      text: text.trim() || undefined,
      image: selectedImage || undefined,
    });
    // Reset form
    setText('');
    setSelectedImage(null);
    setImagePreview(null);
    setIsExpanded(false);
  };

  const handleClose = () => {
    setText('');
    setSelectedImage(null);
    setImagePreview(null);
    setIsExpanded(false);
    onClose();
  };

  const formatSelectedDates = () => {
    if (selectedDates.length === 1) {
      const date = selectedDates[0];
      return formatDateDisplay(date.month, date.day, date.year);
    } else if (selectedDates.length <= 3) {
      return selectedDates
        .map(date => formatDateDisplay(date.month, date.day, date.year))
        .join(', ');
    } else {
      return `${selectedDates.length} selected dates`;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
        onClick={handleClose}
      >
        {/* Modal */}
        <div
          style={{
            background: 'rgba(30, 30, 40, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(108, 78, 230, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto',
            fontFamily: 'Poppins, Arial, sans-serif',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: 300,
              margin: 0,
              marginBottom: '0.5rem',
            }}>
              Immortalize Your Moment
            </h2>
            <p style={{
              color: '#e0e0f0',
              fontSize: '1rem',
              margin: 0,
              opacity: 0.8,
            }}>
              {formatSelectedDates()}
            </p>
          </div>

          {/* Basic Confirmation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{
              color: '#e0e0f0',
              fontSize: '1rem',
              margin: 0,
              lineHeight: 1.6,
            }}>
              Are you sure you want to claim {selectedDates.length === 1 ? 'this moment' : 'these moments'} for eternity? 
              Once immortalized, {selectedDates.length === 1 ? 'it' : 'they'} will be yours forever.
            </p>
          </div>

          {/* Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              background: 'rgba(108, 78, 230, 0.1)',
              border: '1px solid rgba(108, 78, 230, 0.3)',
              borderRadius: '8px',
              color: '#bcbcff',
              fontSize: '0.95rem',
              fontWeight: 300,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(108, 78, 230, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(108, 78, 230, 0.1)';
            }}
          >
            {isExpanded ? 'Hide' : 'Add'} Message & Image
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </button>

          {/* Expanded Content */}
          {isExpanded && (
            <div style={{ marginBottom: '1.5rem' }}>
              {/* Text Input */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  color: '#e0e0f0',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  fontWeight: 300,
                }}>
                  Message (optional)
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Leave a message for this moment..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: 'rgba(50, 50, 60, 0.5)',
                    border: '1px solid rgba(108, 78, 230, 0.3)',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontFamily: 'Poppins, Arial, sans-serif',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(108, 78, 230, 0.6)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(108, 78, 230, 0.3)';
                  }}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label style={{
                  display: 'block',
                  color: '#e0e0f0',
                  fontSize: '0.9rem',
                  marginBottom: '0.5rem',
                  fontWeight: 300,
                }}>
                  Image (optional)
                </label>
                
                {!imagePreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      width: '100%',
                      padding: '2rem',
                      background: 'rgba(50, 50, 60, 0.3)',
                      border: '2px dashed rgba(108, 78, 230, 0.4)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(108, 78, 230, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(108, 78, 230, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(50, 50, 60, 0.3)';
                      e.currentTarget.style.borderColor = 'rgba(108, 78, 230, 0.4)';
                    }}
                  >
                    <div style={{
                      color: '#bcbcff',
                      fontSize: '0.95rem',
                      fontWeight: 300,
                    }}>
                      Click to upload an image
                    </div>
                    <div style={{
                      color: '#999',
                      fontSize: '0.8rem',
                      marginTop: '0.25rem',
                    }}>
                      PNG, JPG, GIF up to 10MB
                    </div>
                  </div>
                ) : (
                  <div style={{
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: 'rgba(50, 50, 60, 0.3)',
                  }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <button
                      onClick={handleRemoveImage}
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.7)',
                        border: 'none',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        transition: 'background 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(220, 38, 38, 0.8)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
          }}>
            <button
              onClick={handleClose}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#e0e0f0',
                fontSize: '0.95rem',
                fontWeight: 300,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              style={{
                padding: '0.75rem 2rem',
                background: 'rgba(108, 78, 230, 0.8)',
                border: '1px solid rgba(108, 78, 230, 0.6)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '0.95rem',
                fontWeight: 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(108, 78, 230, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(108, 78, 230, 1)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(108, 78, 230, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(108, 78, 230, 0.8)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(108, 78, 230, 0.3)';
              }}
            >
              Immortalize Forever
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImmortalizeModal; 