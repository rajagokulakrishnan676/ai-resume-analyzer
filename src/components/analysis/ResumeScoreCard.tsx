import React from 'react';
import { ReactNode } from 'react';
import { Progress } from '../ui/Progress';

interface ResumeScoreCardProps {
  title: string;
  score: number;
  icon: ReactNode;
  description: string;
  className?: string;
}

const ResumeScoreCard: React.FC<ResumeScoreCardProps> = ({
  title,
  score,
  icon,
  description,
  className = ''
}) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-2 text-lg font-semibold dark:text-white">{title}</h3>
      </div>
      
      <div className="flex items-end justify-between mb-2">
        <span className="text-4xl font-bold dark:text-white">{score}%</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{description}</span>
      </div>
      
      <Progress value={score} />
    </div>
  );
};

export default ResumeScoreCard;