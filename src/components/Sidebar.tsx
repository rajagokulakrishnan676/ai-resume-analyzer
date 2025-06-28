import React from 'react';
import { Upload, PieChart, BookOpen, BarChart2, Users, FileText, Settings } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useAnalysis();

  const tabs = [
    { id: 'upload', name: 'Upload', icon: Upload },
    { id: 'analysis', name: 'Analysis', icon: BarChart2 },
    { id: 'comparison', name: 'Comparison', icon: Users },
    { id: 'learning', name: 'Learning Paths', icon: BookOpen },
    { id: 'reports', name: 'Reports', icon: FileText },
  ];

  return (
    <aside className="w-16 md:w-64 shrink-0 bg-primary-700 text-white">
      <div className="flex flex-col h-full">
        <div className="hidden md:flex items-center justify-center h-16 border-b border-primary-600">
          <FileText className="h-6 w-6 mr-2" />
          <span className="font-semibold text-lg">Resume Analyzer</span>
        </div>
        <nav className="flex-1 p-2 md:p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center w-full p-2 md:p-3 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary-800 text-white' 
                    : 'text-primary-100 hover:bg-primary-600'
                }`}
              >
                <Icon className="h-5 w-5 md:mr-3" />
                <span className="hidden md:inline">{tab.name}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-2 md:p-4">
          <button className="flex items-center w-full p-2 md:p-3 text-primary-100 hover:bg-primary-600 rounded-lg transition-colors">
            <Settings className="h-5 w-5 md:mr-3" />
            <span className="hidden md:inline">Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;