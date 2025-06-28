import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Resume {
  id: string;
  name: string;
  content: string;
  skills: string[];
  experience: string[];
  education: string[];
  jobFitScore: number;
  skillGapScore: number;
  keywords: { [key: string]: number };
  analyzed: boolean;
}

export interface JobDescription {
  content: string;
  skills: string[];
  experience: string[];
  education: string[];
  keywords: { [key: string]: number };
}

interface AnalysisContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  resumes: Resume[];
  setResumes: (resumes: Resume[]) => void;
  jobDescription: JobDescription | null;
  setJobDescription: (jd: JobDescription | null) => void;
  analyzing: boolean;
  setAnalyzing: (analyzing: boolean) => void;
  selectedResumeId: string | null;
  setSelectedResumeId: (id: string | null) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('upload');
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [jobDescription, setJobDescription] = useState<JobDescription | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  const value = {
    activeTab,
    setActiveTab,
    resumes,
    setResumes,
    jobDescription,
    setJobDescription,
    analyzing,
    setAnalyzing,
    selectedResumeId,
    setSelectedResumeId,
  };

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>;
};

export const useAnalysis = (): AnalysisContextType => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};