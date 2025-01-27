import React from 'react';

const Loader = ({ size = 'medium', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-white/80 z-50' 
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Cercle principal */}
        <div
          className={`${sizeClasses[size]} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}
        />
        {/* Overlay pour effet de profondeur */}
        <div 
          className={`${sizeClasses[size]} absolute top-0 left-0 border-4 border-transparent border-t-blue-400 rounded-full animate-pulse`}
        />
      </div>
    </div>
  );
};

export default Loader;