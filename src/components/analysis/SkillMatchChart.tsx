import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { Resume, JobDescription } from '../../context/AnalysisContext';

interface SkillMatchChartProps {
  resume: Resume;
  jobDescription: JobDescription;
}

const SkillMatchChart: React.FC<SkillMatchChartProps> = ({ resume, jobDescription }) => {
  // Get all skills and their status
  const skillData = jobDescription.skills.map(skill => {
    const hasSkill = resume.skills.includes(skill);
    const proficiency = hasSkill ? Math.floor(Math.random() * 40) + 60 : 0; // Simulate proficiency levels
    return {
      name: skill,
      value: proficiency,
      status: hasSkill ? 'match' : 'missing',
      required: true
    };
  });

  // Add additional skills from resume
  resume.skills.forEach(skill => {
    if (!jobDescription.skills.includes(skill)) {
      skillData.push({
        name: skill,
        value: Math.floor(Math.random() * 40) + 60,
        status: 'additional',
        required: false
      });
    }
  });

  // Sort skills by value and status
  skillData.sort((a, b) => {
    if (a.required !== b.required) return b.required ? 1 : -1;
    return b.value - a.value;
  });

  const getBarColor = (status: string) => {
    switch (status) {
      case 'match': return '#22C55E';
      case 'missing': return '#EF4444';
      default: return '#94A3B8';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Proficiency: {data.value}%
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {data.required ? 'Required Skill' : 'Additional Skill'}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={skillData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={90}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine x={60} stroke="#CBD5E1" strokeDasharray="3 3" />
          <Bar
            dataKey="value"
            barSize={20}
            radius={[0, 4, 4, 0]}
            animationBegin={0}
            animationDuration={800}
          >
            {skillData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.status)}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center mt-4 space-x-6 text-sm">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-success-500 mr-2"></span>
          <span className="dark:text-white">Required & Present</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-error-500 mr-2"></span>
          <span className="dark:text-white">Required & Missing</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
          <span className="dark:text-white">Additional Skills</span>
        </div>
      </div>
    </div>
  );
};

export default SkillMatchChart;