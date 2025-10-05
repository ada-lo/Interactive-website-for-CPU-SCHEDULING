import React from 'react';
import { GanttItem } from '../types';
import { UseScheduler } from '../hooks/useSchedular';

interface GanttChartProps {
  ganttChart: GanttItem[];
  currentTime: number;
}

const GanttChart: React.FC<GanttChartProps> = ({ ganttChart, currentTime }) => {
  if (ganttChart.length === 0) {
    return null;
  }

  const totalTime = ganttChart[ganttChart.length - 1].end;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-white/20 mb-8">
      <h2 className="text-2xl font-bold mb-4">Gantt Chart</h2>
      <div className="relative">
        <div className="flex">
          {ganttChart.map((item, idx) => (
            <div
              key={idx}
              className="relative border-r border-white/30 transition-all duration-300"
              style={{
                width: `${((item.end - item.start) / totalTime) * 100}%`,
                backgroundColor: item.process.color,
                opacity: currentTime >= item.end ? 1 : currentTime > item.start ? 0.7 : 0.3
              }}
            >
              <div className="p-4 text-center font-bold">
                {item.process.name}
              </div>
              <div className="absolute -bottom-6 left-0 text-xs">{item.start}</div>
              {idx === ganttChart.length - 1 && (
                <div className="absolute -bottom-6 right-0 text-xs">{item.end}</div>
              )}
            </div>
          ))}
        </div>
        
        {/* Current Time Indicator */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-yellow-400 transition-all duration-300"
          style={{ 
            left: `${(currentTime / totalTime) * 100}%`,
            boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
          }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
            t={currentTime}
          </div>
        </div>
      </div>
      <div className="h-8"></div>
    </div>
  );
};

export default GanttChart;