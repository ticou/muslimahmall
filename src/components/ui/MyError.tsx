import React, { useState } from 'react';

const MyError = ({ 
  message, 
  type = 'default',
  className = '',
  onClose,
  showIcon = true 
}: { message: string, type?: 'default' | 'danger' | 'info', className?: string, onClose?: () => void, showIcon?: boolean }) => {
    

    const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const types = {
    default: {
      containerClass: 'bg-light-beige border-soft-gold',
      textClass: 'text-dark-gray',
      icon: '⚠️'
    },
    danger: {
      containerClass: 'bg-pastel-pink border-soft-gold',
      textClass: 'text-dark-gray',
      icon: '❌'
    },
    info: {
      containerClass: 'bg-light-turquoise border-soft-gold',
      textClass: 'text-dark-gray',
      icon: 'ℹ️'
    }
  };

  const selectedType = types[type] || types.default;

  return (
    <div className={`
      flex items-center gap-3 p-4 m-4 rounded-lg border
      ${selectedType.containerClass}
      ${className}
    `}>
      {showIcon && (
        <span className="text-xl" role="img" aria-label="error icon">
          {selectedType.icon}
        </span>
      )}
      
      <p className={`flex-1 font-open-sans ${selectedType.textClass}`}>
        {message}
          </p>
          
       <button 
        onClick={() => setIsVisible(false)}
        className="p-1 hover:opacity-70 transition-opacity"
        aria-label="Fermer"
      >
        <span className="text-lg" role="img" aria-label="close">
          ✕
        </span>
      </button>
      
      {/* {onClose && (
        <button 
          onClick={onClose}
          className="p-1 hover:opacity-70 transition-opacity"
          aria-label="Fermer"
        >
          <span className="text-lg" role="img" aria-label="close">
            ✕
          </span>
        </button>
      )} */}
    </div>
  );
};

export default MyError;