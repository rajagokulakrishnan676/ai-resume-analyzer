import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface Resource {
  platform: string;
  title: string;
  url: string;
  isFree: boolean;
}

interface LearningPath {
  skill: string;
  description: string;
  resources: Resource[];
}

interface LearningPathCardProps {
  learningPath: LearningPath;
  index: number;
}

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
  switch (platform.toLowerCase()) {
    case 'coursera':
      return <span className="text-blue-600">Co</span>;
    case 'youtube':
      return <span className="text-red-600">YT</span>;
    case 'udemy':
      return <span className="text-purple-600">Ud</span>;
    default:
      return <span className="text-gray-600">Ed</span>;
  }
};

const LearningPathCard: React.FC<LearningPathCardProps> = ({ learningPath, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden dark:bg-gray-800">
      <div 
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h3 className="text-lg font-semibold dark:text-white">
            {index + 1}. {learningPath.skill}
          </h3>
          <p className="text-gray-600 text-sm mt-1 dark:text-gray-400">{learningPath.description}</p>
        </div>
        <button 
          className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label={expanded ? "Collapse" : "Expand"}
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {expanded && (
        <div className="px-4 pb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3 dark:text-gray-300">Recommended Resources:</h4>
          <ul className="space-y-3">
            {learningPath.resources.map((resource, idx) => (
              <li key={idx} className="flex items-start p-3 border border-gray-100 rounded-lg dark:border-gray-700">
                <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-3 dark:bg-gray-700">
                  <PlatformIcon platform={resource.platform} />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium dark:text-white">{resource.title}</h5>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{resource.platform}</span>
                    <div className="flex items-center">
                      {resource.isFree ? (
                        <span className="text-xs px-2 py-1 bg-success-100 text-success-800 rounded-full mr-2 dark:bg-success-900/30 dark:text-success-300">Free</span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full mr-2 dark:bg-gray-700 dark:text-gray-300">Paid</span>
                      )}
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 flex items-center text-sm dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        View <ExternalLink size={14} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LearningPathCard;