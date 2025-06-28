import React from 'react';
import { Resume } from '../../context/AnalysisContext';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useAnalysis } from '../../context/AnalysisContext';

interface ComparisonTableProps {
  resumes: Resume[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ resumes }) => {
  const { setSelectedResumeId, setActiveTab } = useAnalysis();

  const handleViewDetails = (resumeId: string) => {
    setSelectedResumeId(resumeId);
    setActiveTab('analysis');
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
              Candidate
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
              Job Fit
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
              Skill Gap
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
              Key Skills
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {resumes.map((resume) => {
            // Get status color based on job fit score
            let statusIcon;
            if (resume.jobFitScore >= 80) {
              statusIcon = <CheckCircle className="h-5 w-5 text-success-500" />;
            } else if (resume.jobFitScore >= 60) {
              statusIcon = <AlertTriangle className="h-5 w-5 text-warning-500" />;
            } else {
              statusIcon = <XCircle className="h-5 w-5 text-error-500" />;
            }

            return (
              <tr key={resume.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {statusIcon}
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{resume.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{resume.jobFitScore}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{resume.skillGapScore}%</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {resume.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded dark:bg-primary-900/30 dark:text-primary-300">
                        {skill}
                      </span>
                    ))}
                    {resume.skills.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded dark:bg-gray-700 dark:text-gray-300">
                        +{resume.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewDetails(resume.id)}
                    className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;