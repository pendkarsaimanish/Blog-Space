import React from 'react';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large' | 'larger';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    larger: 'w-[5rem] h-[5rem]'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-blue-200 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-400 rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;