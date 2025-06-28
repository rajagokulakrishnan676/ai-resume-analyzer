import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ 
  value, 
  max = 100, 
  className = '' 
}) => {
  const percentage = Math.min(Math.max(0, value), max) / max * 100;
  
  // Determine color based on percentage
  let colorClass = 'bg-primary-500';
  if (percentage >= 80) {
    colorClass = 'bg-success-500';
  } else if (percentage >= 50) {
    colorClass = 'bg-warning-500';
  } else if (percentage < 50) {
    colorClass = 'bg-error-500';
  }

  return (
    <div className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 ${className}`}>
      <div 
        className={`h-full ${colorClass} transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
};