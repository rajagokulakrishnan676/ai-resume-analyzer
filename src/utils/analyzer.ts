import { Resume, JobDescription } from '../context/AnalysisContext';

// Function to generate a random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Function to extract skills from text using compromise
export const extractSkills = (text: string): string[] => {
  // In a real application, this would use NLP libraries
  // Here we'll simulate by looking for common skills
  const commonSkills = [
    'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Node.js',
    'Python', 'Java', 'C#', 'SQL', 'MongoDB', 'GraphQL',
    'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Agile',
    'Project Management', 'Leadership', 'Communication'
  ];
  
  return commonSkills.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  );
};

// Function to extract keywords and their frequencies
export const extractKeywords = (text: string): { [key: string]: number } => {
  // In a real application, this would use NLP libraries
  // Here we'll simulate by counting occurrences of common terms
  const words = text.toLowerCase().split(/\s+/);
  const keywords: { [key: string]: number } = {};
  
  words.forEach(word => {
    // Filter out common stop words and short words
    if (word.length > 3 && !['the', 'and', 'for', 'with', 'this', 'that'].includes(word)) {
      keywords[word] = (keywords[word] || 0) + 1;
    }
  });
  
  return keywords;
};

// Function to extract experience items
export const extractExperience = (text: string): string[] => {
  // In a real application, this would use NLP to identify experience sections
  // Here we'll simulate by returning placeholder data
  return [
    'Frontend Development',
    'Web Applications',
    'UI/UX Design'
  ];
};

// Function to extract education items
export const extractEducation = (text: string): string[] => {
  // In a real application, this would use NLP to identify education sections
  // Here we'll simulate by returning placeholder data
  return [
    'Bachelor\'s Degree',
    'Computer Science'
  ];
};

// Calculate job fit score based on skill matches
export const calculateJobFitScore = (resumeSkills: string[], jobSkills: string[]): number => {
  if (jobSkills.length === 0) return 100; // No skills required means perfect fit
  
  const matchedSkills = resumeSkills.filter(skill => 
    jobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
  );
  
  return Math.round((matchedSkills.length / jobSkills.length) * 100);
};

// Calculate skill gap score
export const calculateSkillGapScore = (resumeSkills: string[], jobSkills: string[]): number => {
  if (jobSkills.length === 0) return 0; // No skills required means no gap
  
  const missingSkills = jobSkills.filter(skill => 
    !resumeSkills.some(resumeSkill => resumeSkill.toLowerCase() === skill.toLowerCase())
  );
  
  return Math.round((missingSkills.length / jobSkills.length) * 100);
};

// Analyze a resume
export const analyzeResume = (
  fileName: string, 
  resumeContent: string, 
  jobDescription: JobDescription
): Resume => {
  const skills = extractSkills(resumeContent);
  const experience = extractExperience(resumeContent);
  const education = extractEducation(resumeContent);
  const keywords = extractKeywords(resumeContent);
  
  const jobFitScore = calculateJobFitScore(skills, jobDescription.skills);
  const skillGapScore = calculateSkillGapScore(skills, jobDescription.skills);
  
  return {
    id: generateId(),
    name: fileName,
    content: resumeContent,
    skills,
    experience,
    education,
    jobFitScore,
    skillGapScore,
    keywords,
    analyzed: true
  };
};

// Analyze a job description
export const analyzeJobDescription = (jobDescContent: string): JobDescription => {
  const skills = extractSkills(jobDescContent);
  const experience = extractExperience(jobDescContent);
  const education = extractEducation(jobDescContent);
  const keywords = extractKeywords(jobDescContent);
  
  return {
    content: jobDescContent,
    skills,
    experience,
    education,
    keywords
  };
};