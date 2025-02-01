import { SizeLoader } from '@/utils/constants';
import React from 'react';


interface MyLoaderProps {
  fullScreen: boolean;  // ou le type approprié
  size: SizeLoader;      // ou le type approprié
}
  export const MyLoader: React.FC<MyLoaderProps> = ({ size = SizeLoader.small , fullScreen = false }) => {
// const MyLoader = ({ size = 'medium', fullScreen = false }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-off-white/80 z-50' 
    : 'flex items-center justify-center p-4';

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Cercle principal */}
        <div
          className={`${sizeClasses[size]} border-4 border-light-beige border-t-soft-gold rounded-full animate-spin`}
        />
        {/* Overlay pour effet de profondeur */}
        {/* <div 
          className={`${sizeClasses[size]} absolute top-0 left-0 border-4 border-transparent border-t-soft-gold rounded-full animate-pulse`}
        /> */}
      </div>
    </div>
  );
};

export default MyLoader;