import React from 'react';
import { useAnalysis } from '../../context/AnalysisContext';
import { AlertCircle, Users, Award } from 'lucide-react';
import ComparisonTable from './ComparisonTable';
import TopCandidatesCard from './TopCandidatesCard';

const ComparisonSection: React.FC = () => {
  const { resumes, jobDescription } = useAnalysis();

  if (!jobDescription || resumes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-12 w-12 text-warning-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">No Data Available</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Please upload resumes and a job description to compare candidates.
          </p>
        </div>
      </div>
    );
  }

  if (resumes.length < 2) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <Users className="h-12 w-12 text-primary-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Comparison Unavailable</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Please upload at least two resumes to compare candidates.
          </p>
        </div>
      </div>
    );
  }

  // Sort resumes by job fit score (descending)
  const sortedResumes = [...resumes].sort((a, b) => b.jobFitScore - a.jobFitScore);
  const topCandidates = sortedResumes.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">Candidate Comparison</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Compare candidates based on job fit, skill gaps, and other metrics.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center mb-4">
          <Award className="h-5 w-5 text-primary-500 mr-2" />
          <h3 className="text-lg font-semibold dark:text-white">Top Candidates</h3>
        </div>
        <TopCandidatesCard candidates={topCandidates} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Detailed Comparison</h3>
        <ComparisonTable resumes={sortedResumes} />
      </div>
    </div>
  );
};

export default ComparisonSection;