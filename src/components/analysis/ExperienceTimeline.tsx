import React from 'react';
import { Resume } from '../../context/AnalysisContext';

interface ExperienceTimelineProps {
  resume: Resume;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ resume }) => {
  // Simulate experience data (in a real app, this would come from the resume)
  const experiences = [
    {
      role: 'Senior Software Engineer',
      company: 'Tech Corp',
      period: '2021 - Present',
      achievements: [
        'Led development of cloud-native applications',
        'Improved system performance by 40%',
        'Mentored junior developers'
      ]
    },
    {
      role: 'Software Engineer',
      company: 'Innovation Labs',
      period: '2019 - 2021',
      achievements: [
        'Developed microservices architecture',
        'Implemented CI/CD pipelines',
        'Reduced deployment time by 60%'
      ]
    },
    {
      role: 'Junior Developer',
      company: 'StartUp Inc',
      period: '2017 - 2019',
      achievements: [
        'Built responsive web applications',
        'Collaborated with UX team',
        'Improved code coverage to 90%'
      ]
    }
  ];

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
      
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-12">
            <div className="absolute left-2 top-2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-gray-800"></div>
            
            <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700/50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{exp.role}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</span>
              </div>
              
              <ul className="mt-3 space-y-1">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;