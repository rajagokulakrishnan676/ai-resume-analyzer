import React from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import UploadSection from './upload/UploadSection';
import AnalysisSection from './analysis/AnalysisSection';
import ComparisonSection from './comparison/ComparisonSection';
import LearningPathsSection from './learning/LearningPathsSection';
import ReportsSection from './reports/ReportsSection';

const Dashboard: React.FC = () => {
  const { activeTab } = useAnalysis();

  return (
    <div className="h-full">
      {activeTab === 'upload' && <UploadSection />}
      {activeTab === 'analysis' && <AnalysisSection />}
      {activeTab === 'comparison' && <ComparisonSection />}
      {activeTab === 'learning' && <LearningPathsSection />}
      {activeTab === 'reports' && <ReportsSection />}
    </div>
  );
};

export default Dashboard;