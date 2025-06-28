import React, { useState } from 'react';
import { useAnalysis } from '../../context/AnalysisContext';
import { AlertCircle, FileText, Download, Printer } from 'lucide-react';

const ReportsSection: React.FC = () => {
  const { resumes, jobDescription, selectedResumeId } = useAnalysis();
  const [generating, setGenerating] = useState(false);

  if (!jobDescription || resumes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-12 w-12 text-warning-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">No Data Available</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Please upload resumes and a job description to generate reports.
          </p>
        </div>
      </div>
    );
  }

  // Get the selected resume or default to the first one
  const currentResumeId = selectedResumeId || resumes[0].id;
  const currentResume = resumes.find(r => r.id === currentResumeId) || resumes[0];

  const handleGenerateReport = () => {
    setGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false);
      // In a real app, this would generate and download a PDF
      alert('Report would be generated and downloaded in a real application');
    }, 1500);
  };

  const handleGenerateComparisonReport = () => {
    setGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false);
      // In a real app, this would generate and download a PDF
      alert('Comparison report would be generated and downloaded in a real application');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">Reports</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Generate PDF or CSV reports of your analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-primary-500 mr-2" />
            <h3 className="text-lg font-semibold dark:text-white">Individual Resume Report</h3>
          </div>
          
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Generate a detailed report for a single resume, including skill analysis, job fit score, and learning recommendations.
          </p>
          
          <div className="mb-4">
            <label htmlFor="resume-select" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
              Select Resume
            </label>
            <select
              id="resume-select"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={currentResumeId}
              onChange={(e) => {
                // This would be handled by the context in a real implementation
              }}
            >
              {resumes.map(resume => (
                <option key={resume.id} value={resume.id}>
                  {resume.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={handleGenerateReport}
              disabled={generating}
              className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-primary-800"
            >
              {generating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Report
                </>
              )}
            </button>
            
            <button
              disabled={generating}
              className="w-full flex items-center justify-center px-4 py-2 bg-white text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 focus:ring-4 focus:ring-primary-300 transition disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-primary-400 dark:border-primary-700 dark:hover:bg-gray-600"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Report
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <div className="flex items-center mb-4">
            <FileText className="h-5 w-5 text-primary-500 mr-2" />
            <h3 className="text-lg font-semibold dark:text-white">Comparison Report</h3>
          </div>
          
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Generate a comparison report of all analyzed resumes, ranking candidates and highlighting strengths and weaknesses.
          </p>
          
          <div className="mb-4">
            <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                This report will include:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1 dark:text-gray-400">
                <li>Candidate ranking based on job fit</li>
                <li>Skill gap comparison</li>
                <li>Top candidate recommendations</li>
                <li>Detailed skill breakdown</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={handleGenerateComparisonReport}
              disabled={generating || resumes.length < 2}
              className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 transition disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-primary-800"
            >
              {generating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download Comparison Report
                </>
              )}
            </button>
            
            <button
              disabled={generating || resumes.length < 2}
              className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <Download className="h-4 w-4 mr-2" />
              Export as CSV
            </button>
          </div>
          
          {resumes.length < 2 && (
            <p className="mt-3 text-sm text-warning-600 dark:text-warning-400">
              You need at least 2 resumes to generate a comparison report.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;