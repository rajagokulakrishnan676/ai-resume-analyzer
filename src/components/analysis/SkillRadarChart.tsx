import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Resume, JobDescription } from '../../context/AnalysisContext';

interface SkillRadarChartProps {
  resume: Resume;
  jobDescription: JobDescription;
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ resume, jobDescription }) => {
  // Group skills into categories
  const skillCategories = {
    'Technical': ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
    'Backend': ['Node.js', 'Python', 'Java', 'SQL'],
    'DevOps': ['AWS', 'Docker', 'CI/CD', 'Git'],
    'Soft Skills': ['Communication', 'Leadership', 'Problem Solving'],
    'Domain Knowledge': ['Agile', 'Project Management', 'Business Analysis']
  };

  // Calculate scores for each category
  const data = Object.entries(skillCategories).map(([category, skills]) => {
    const requiredSkills = skills.filter(skill => jobDescription.skills.includes(skill));
    const matchedSkills = skills.filter(skill => resume.skills.includes(skill));
    
    const score = requiredSkills.length > 0
      ? (matchedSkills.length / requiredSkills.length) * 100
      : matchedSkills.length > 0 ? 75 : 0;

    return {
      category,
      score: Math.min(100, score),
      fullMark: 100
    };
  });

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#CBD5E1" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: '#64748B', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#64748B', fontSize: 10 }}
          />
          <Radar
            name="Skills"
            dataKey="score"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadarChart;