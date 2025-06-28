import React from 'react';
import { useAnalysis } from '../../context/AnalysisContext';
import { BarChart2, CheckCircle, XCircle, AlertCircle, TrendingUp, Target, Award } from 'lucide-react';
import SkillMatchChart from './SkillMatchChart';
import SkillGapCard from './SkillGapCard';
import WordCloudVisualization from './WordCloudVisualization';
import ResumeScoreCard from './ResumeScoreCard';
import SkillRadarChart from './SkillRadarChart';
import ExperienceTimeline from './ExperienceTimeline';
import PerformanceHeatmap from './PerformanceHeatmap';

const AnalysisSection: React.FC = () => {
  const { resumes, jobDescription, selectedResumeId } = useAnalysis();

  if (!jobDescription || resumes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-12 w-12 text-warning-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 dark:text-white">No Analysis Available</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Please upload resumes and a job description to see the analysis.
          </p>
        </div>
      </div>
    );
  }

  const currentResumeId = selectedResumeId || resumes[0].id;
  const currentResume = resumes.find(r => r.id === currentResumeId) || resumes[0];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold dark:text-white">Resume Analysis</h2>
        <div className="flex space-x-2">
          <select 
            value={currentResumeId}
            onChange={(e) => setSelectedResumeId(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {resumes.map(resume => (
              <option key={resume.id} value={resume.id}>
                {resume.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ResumeScoreCard 
          title="Overall Match"
          score={currentResume.jobFitScore}
          icon={<Target className="h-6 w-6 text-primary-500" />}
          description="Overall fit with job requirements"
          trend={+5}
          className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/10"
        />
        
        <ResumeScoreCard 
          title="Technical Skills"
          score={85}
          icon={<BarChart2 className="h-6 w-6 text-success-500" />}
          description="Technical expertise match"
          trend={+8}
          className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/10"
        />
        
        <ResumeScoreCard 
          title="Experience Level"
          score={75}
          icon={<Award className="h-6 w-6 text-accent-500" />}
          description="Years and quality of experience"
          trend={-2}
          className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Skill Proficiency Analysis</h3>
          <SkillMatchChart resume={currentResume} jobDescription={jobDescription} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Skill Distribution</h3>
          <SkillRadarChart resume={currentResume} jobDescription={jobDescription} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Keyword Analysis</h3>
          <WordCloudVisualization resume={currentResume} jobDescription={jobDescription} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Performance Impact</h3>
          <PerformanceHeatmap resume={currentResume} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Experience Timeline</h3>
        <ExperienceTimeline resume={currentResume} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Skill Gap Analysis</h3>
        <SkillGapCard resume={currentResume} jobDescription={jobDescription} />
      </div>
    </div>
  );
};

export default AnalysisSection;