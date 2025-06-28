import React from 'react';
import { Resume } from '../../context/AnalysisContext';

interface PerformanceHeatmapProps {
  resume: Resume;
}

const PerformanceHeatmap: React.FC<PerformanceHeatmapProps> = ({ resume }) => {
  // Simulate performance metrics (in a real app, these would be calculated)
  const performanceMetrics = [
    {
      category: 'Technical Impact',
      metrics: [
        { name: 'Code Quality', score: 85 },
        { name: 'System Performance', score: 92 },
        { name: 'Innovation', score: 78 }
      ]
    },
    {
      category: 'Project Delivery',
      metrics: [
        { name: 'On-time Delivery', score: 95 },
        { name: 'Budget Management', score: 88 },
        { name: 'Scope Management', score: 82 }
      ]
    },
    {
      category: 'Team Collaboration',
      metrics: [
        { name: 'Communication', score: 90 },
        { name: 'Leadership', score: 85 },
        { name: 'Mentoring', score: 80 }
      ]
    }
  ];

  const getColorClass = (score: number) => {
    if (score >= 90) return 'bg-success-500/90';
    if (score >= 80) return 'bg-success-400/80';
    if (score >= 70) return 'bg-warning-400/70';
    return 'bg-error-400/60';
  };

  return (
    <div className="space-y-6">
      {performanceMetrics.map((category, index) => (
        <div key={index}>
          <h4 className="text-sm font-medium mb-2 dark:text-white">{category.category}</h4>
          <div className="grid grid-cols-3 gap-4">
            {category.metrics.map((metric, i) => (
              <div key={i} className="relative">
                <div className={`h-24 rounded-lg ${getColorClass(metric.score)} flex items-center justify-center`}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{metric.score}%</div>
                    <div className="text-xs text-white/90 mt-1">{metric.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceHeatmap;