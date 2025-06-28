import React from 'react';
import { Resume } from '../../context/AnalysisContext';
import { Medal, Award, Trophy } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

interface TopCandidatesCardProps {
  candidates: Resume[];
}

const getIcon = (position: number) => {
  switch (position) {
    case 0: return <Trophy className="h-6 w-6 text-warning-400 dark:text-warning-500" />;
    case 1: return <Medal className="h-6 w-6 text-gray-400 dark:text-gray-500" />;
    case 2: return <Award className="h-6 w-6 text-amber-600 dark:text-amber-700" />;
    default: return null;
  }
};

const TopCandidatesCard: React.FC<TopCandidatesCardProps> = ({ candidates }) => {
  const { setSelectedResumeId, setActiveTab } = useAnalysis();

  const handleViewCandidate = (resumeId: string) => {
    setSelectedResumeId(resumeId);
    setActiveTab('analysis');
  };

  if (candidates.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No candidates available for ranking.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {candidates.map((candidate, index) => (
        <div 
          key={candidate.id}
          className={`p-4 rounded-lg border ${
            index === 0 
              ? 'bg-warning-50 border-warning-200 dark:bg-warning-900/20 dark:border-warning-800/50' 
              : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              {getIcon(index)}
              <h4 className="ml-2 font-semibold dark:text-white">
                {index === 0 ? '1st Place' : index === 1 ? '2nd Place' : '3rd Place'}
              </h4>
            </div>
            <div className="text-xl font-bold text-primary-600 dark:text-primary-400">
              {candidate.jobFitScore}%
            </div>
          </div>
          
          <p className="font-medium mb-2 dark:text-white">{candidate.name}</p>
          
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-1 dark:text-gray-300">Key Skills:</p>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 3).map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-0.5 text-xs bg-primary-100 text-primary-800 rounded dark:bg-primary-900/30 dark:text-primary-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => handleViewCandidate(candidate.id)}
            className="w-full text-center py-1.5 text-sm font-medium text-primary-600 bg-primary-50 rounded hover:bg-primary-100 transition dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-800/40"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default TopCandidatesCard;