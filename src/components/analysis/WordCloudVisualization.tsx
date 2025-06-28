import React, { useMemo, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { Resume, JobDescription } from '../../context/AnalysisContext';

interface WordCloudVisualizationProps {
  resume: Resume;
  jobDescription: JobDescription;
}

interface WordCloudWord {
  text: string;
  value: number;
  color?: string;
}

const WordCloudVisualization: React.FC<WordCloudVisualizationProps> = ({ resume, jobDescription }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const words = useMemo(() => {
    const result: WordCloudWord[] = [];
    
    // Add resume keywords with enhanced weighting
    Object.entries(resume.keywords).forEach(([keyword, count]) => {
      const isInJobDescription = jobDescription.keywords[keyword];
      const weight = isInJobDescription ? count * 15 : count * 8;
      result.push({
        text: keyword,
        value: weight,
        color: isInJobDescription ? '#3B82F6' : '#94A3B8'
      });
    });
    
    // Add missing job description keywords
    Object.entries(jobDescription.keywords).forEach(([keyword, count]) => {
      if (!resume.keywords[keyword]) {
        result.push({
          text: keyword,
          value: count * 5,
          color: '#EF4444'
        });
      }
    });
    
    return result;
  }, [resume, jobDescription]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    const width = containerRef.current.offsetWidth;
    const height = 300;

    const layout = cloud()
      .size([width, height])
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .font('Inter')
      .fontSize(d => Math.sqrt(d.value) * 4)
      .words(words.map(d => ({ ...d, size: d.value })))
      .spiral('archimedean')
      .on('end', draw);

    function draw(words: any[]) {
      const svg = d3.select(containerRef.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width/2},${height/2})`);

      // Add words with transitions
      const wordElements = svg.selectAll('text')
        .data(words)
        .enter()
        .append('text')
        .style('font-family', 'Inter')
        .style('fill', (d: any) => d.color)
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(0,0) rotate(0)')
        .style('font-size', '1px')
        .style('opacity', 0)
        .text((d: any) => d.text);

      // Animate words
      wordElements.transition()
        .duration(600)
        .style('font-size', (d: any) => `${d.size}px`)
        .attr('transform', (d: any) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .style('opacity', 1);

      // Add hover effects
      wordElements
        .style('cursor', 'pointer')
        .on('mouseover', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style('font-size', (d: any) => `${d.size * 1.2}px`)
            .style('font-weight', 'bold');
        })
        .on('mouseout', function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style('font-size', (d: any) => `${d.size}px`)
            .style('font-weight', 'normal');
        });
    }

    layout.start();
  }, [words]);

  return (
    <div>
      <div ref={containerRef} className="h-64 w-full" />
      <div className="flex justify-center mt-4 space-x-6 text-sm">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-primary-500 mr-2"></span>
          <span className="dark:text-white">Matching Keywords</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-gray-400 mr-2"></span>
          <span className="dark:text-white">Additional Keywords</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-error-500 mr-2"></span>
          <span className="dark:text-white">Missing Keywords</span>
        </div>
      </div>
    </div>
  );
};

export default WordCloudVisualization;