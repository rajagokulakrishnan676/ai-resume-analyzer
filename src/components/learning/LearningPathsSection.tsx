import React from 'react';
import { useAnalysis } from '../../context/AnalysisContext';
import { AlertCircle, BookOpen, Compass } from 'lucide-react';
import LearningPathCard from './LearningPathCard';
import SkillLearningResources from './SkillLearningResources';

const LearningPathsSection: React.FC = () => {
  const { resumes, jobDescription, selectedResumeId } = useAnalysis();

  if (!jobDescription || resumes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-12 w-12 text-warning-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">No Data Available</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Please upload resumes and a job description to see learning path recommendations.
          </p>
        </div>
      </div>
    );
  }

  // Get the selected resume or default to the first one
  const currentResumeId = selectedResumeId || resumes[0].id;
  const currentResume = resumes.find(r => r.id === currentResumeId) || resumes[0];

  // Find missing skills
  const missingSkills = jobDescription.skills.filter(skill => !currentResume.skills.includes(skill));

  if (missingSkills.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 dark:text-white">Learning Paths</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Recommended resources to help candidates develop missing skills.
          </p>
        </div>

        <div className="bg-success-50 p-8 rounded-lg text-center dark:bg-success-900/20">
          <BookOpen className="h-12 w-12 text-success-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-success-700 dark:text-success-300">No Learning Path Needed</h3>
          <p className="text-success-600 max-w-md mx-auto dark:text-success-400">
            Great news! This candidate has all the required skills for this position. No additional learning is needed.
          </p>
        </div>
      </div>
    );
  }

  // Generate learning paths for missing skills
  const learningPaths = missingSkills.map(skill => {
    // In a real app, this would come from a database or API
    return {
      skill,
      description: `Learn ${skill} to enhance your capabilities and job fit`,
      resources: [
        {
          platform: 'Coursera',
          title: `${skill} Fundamentals`,
          url: 'https://www.coursera.org',
          isFree: false
        },
        {
          platform: 'YouTube',
          title: `${skill} for Beginners`,
          url: 'https://www.youtube.com',
          isFree: true
        },
        {
          platform: 'Udemy',
          title: `Complete ${skill} Masterclass`,
          url: 'https://www.udemy.com',
          isFree: false
        }
      ]
    };
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">Learning Path for {currentResume.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Recommended resources to help the candidate develop missing skills and improve job fit.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8 dark:bg-gray-800">
        <div className="flex items-center mb-4">
          <Compass className="h-5 w-5 text-primary-500 mr-2" />
          <h3 className="text-lg font-semibold dark:text-white">Skills Development Overview</h3>
        </div>
        <p className="mb-4 dark:text-gray-300">
          To improve the candidate's job fit score from {currentResume.jobFitScore}% to 100%, 
          focus on developing these {missingSkills.length} key skills:
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {missingSkills.map((skill, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm dark:bg-primary-900/30 dark:text-primary-300"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="p-4 bg-accent-50 rounded-lg dark:bg-accent-900/20">
          <p className="text-accent-800 text-sm dark:text-accent-300">
            We've created a personalized learning path with high-quality resources for each skill.
            These recommendations are based on the specific requirements in the job description.
          </p>
        </div>
      </div>

      {learningPaths.map((path, index) => (
        <LearningPathCard key={index} learningPath={path} index={index} />
      ))}

      <div className="bg-white p-6 rounded-lg shadow-md mt-8 dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Additional Learning Resources</h3>
        <SkillLearningResources />
      </div>
    </div>
  );
};

export default LearningPathsSection;