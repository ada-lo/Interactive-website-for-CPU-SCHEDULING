import React from 'react';
import { GanttItem } from '../types';
import { UseScheduler } from '../hooks/useSchedular';

interface GanttChartProps {
  ganttChart: GanttItem[];
  currentTime: number;
}

const GanttChart: React.FC<GanttChartProps> = ({ ganttChart, currentTime }) => {
  if (ganttChart.length === 0) {
    return (
      <div className="p-6 text-sm text-slate-500">No schedule calculated yet. Start the simulation to see the Gantt chart.</div>
    );
  }

  const totalTime = ganttChart[ganttChart.length - 1].end;

  // helper: convert hex color to rgba string with alpha
  const hexToRgba = (hex: string, alpha = 1) => {
    const h = hex.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="p-2">
      <h3 className="text-base font-semibold mb-3">Gantt Chart</h3>
  <div className="card rounded-lg overflow-hidden border border-slate-100 relative gantt-container">
        <div className="flex">
          {ganttChart.map((item, idx) => {
            const backgroundAlpha = currentTime >= item.end ? 1 : currentTime > item.start ? 0.85 : 0.6;
            const bg = hexToRgba(item.process.color, backgroundAlpha);
            return (
              <div
                key={idx}
                className="relative border-r border-slate-100 transition-all duration-300 text-center text-sm font-medium"
                style={{
                  width: `${((item.end - item.start) / totalTime) * 100}%`,
                  backgroundColor: bg,
                }}
              >
                <div className="p-3 gantt-segment" style={{ fontWeight: 600, textShadow: '0 1px 0 rgba(0,0,0,0.6)' }}>{item.process.name}</div>
                <div className="absolute -bottom-6 left-0 text-xs muted">{item.start}</div>
                {idx === ganttChart.length - 1 && (
                  <div className="absolute -bottom-6 right-0 text-xs muted">{item.end}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Current Time Indicator */}
        <div className="gantt-line" style={{ left: `${(currentTime / totalTime) * 100}%` }} />
      </div>
    </div>
  );
};

export default GanttChart;