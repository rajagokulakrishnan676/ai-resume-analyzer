import React from 'react';

const SkillLearningResources: React.FC = () => {
  const learningPlatforms = [
    {
      name: 'Coursera',
      description: 'University-led courses with certificates',
      website: 'https://www.coursera.org',
      categories: ['Data Science', 'Web Development', 'Machine Learning', 'Business']
    },
    {
      name: 'Udemy',
      description: 'Vast library of courses on all topics',
      website: 'https://www.udemy.com',
      categories: ['Programming', 'Design', 'Marketing', 'IT & Software']
    },
    {
      name: 'YouTube',
      description: 'Free video tutorials on every subject',
      website: 'https://www.youtube.com',
      categories: ['Tutorials', 'How-to', 'Programming', 'Design']
    },
    {
      name: 'Khan Academy',
      description: 'Free education platform for all ages',
      website: 'https://www.khanacademy.org',
      categories: ['Math', 'Science', 'Computing', 'Economics']
    },
    {
      name: 'freeCodeCamp',
      description: 'Free coding tutorials and certifications',
      website: 'https://www.freecodecamp.org',
      categories: ['Web Development', 'JavaScript', 'Data Structures', 'Algorithms']
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {learningPlatforms.map((platform, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
          <h4 className="font-medium mb-2 dark:text-white">{platform.name}</h4>
          <p className="text-sm text-gray-600 mb-3 dark:text-gray-400">{platform.description}</p>
          
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1 dark:text-gray-500">Popular Categories:</p>
            <div className="flex flex-wrap gap-1">
              {platform.categories.map((category, idx) => (
                <span key={idx} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded dark:bg-gray-700 dark:text-gray-300">
                  {category}
                </span>
              ))}
            </div>
          </div>
          
          <a 
            href={platform.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Visit Website →
          </a>
        </div>
      ))}
    </div>
  );
};

export default SkillLearningResources;