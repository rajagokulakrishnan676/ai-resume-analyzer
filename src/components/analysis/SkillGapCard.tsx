import React from 'react';
import { BookOpen } from 'lucide-react';
import { Resume, JobDescription } from '../../context/AnalysisContext';
import { useAnalysis } from '../../context/AnalysisContext';

interface SkillGapCardProps {
  resume: Resume;
  jobDescription: JobDescription;
}

const SkillGapCard: React.FC<SkillGapCardProps> = ({ resume, jobDescription }) => {
  const { setActiveTab } = useAnalysis();
  
  // Find missing skills
  const missingSkills = jobDescription.skills.filter(skill => !resume.skills.includes(skill));
  
  if (missingSkills.length === 0) {
    return (
      <div className="p-6 bg-success-50 rounded-lg dark:bg-success-900/20">
        <p className="text-success-700 dark:text-success-300">
          Great news! This candidate has all the required skills for this position.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-4">
        <h4 className="font-medium text-gray-700 mb-2 dark:text-gray-200">Missing Skills</h4>
        <div className="flex flex-wrap gap-2">
          {missingSkills.map((skill, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-error-100 text-error-700 rounded-full text-sm dark:bg-error-900/30 dark:text-error-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-primary-50 rounded-lg flex items-start dark:bg-primary-900/20">
        <BookOpen className="h-5 w-5 text-primary-600 mr-3 shrink-0 mt-0.5 dark:text-primary-400" />
        <div>
          <p className="text-primary-800 mb-2 dark:text-primary-200">
            The candidate is missing {missingSkills.length} key skills required for this position.
          </p>
          <button
            onClick={() => setActiveTab('learning')}
            className="text-primary-600 text-sm font-medium hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            View Learning Path Recommendations →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillGapCard;