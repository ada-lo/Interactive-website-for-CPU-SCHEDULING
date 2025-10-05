import React from 'react';
import { SchedulerStats, GanttItem } from '../types';

interface StatisticsProps {
  stats: SchedulerStats | null;
  ganttChart: GanttItem[];
}

const Statistics: React.FC<StatisticsProps> = ({ stats, ganttChart }) => {
  if (!stats) {
    return null;
  }

  const totalTime = ganttChart[ganttChart.length - 1]?.end || 0;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-white/20">
      <h2 className="text-2xl font-bold mb-4">Statistics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-blue-400">{stats.avgWaiting.toFixed(2)}</div>
          <div className="text-sm text-gray-300">Avg Waiting Time</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-400">{stats.avgTurnaround.toFixed(2)}</div>
          <div className="text-sm text-gray-300">Avg Turnaround Time</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-400">{stats.completed.length}</div>
          <div className="text-sm text-gray-300">Total Processes</div>
        </div>
        <div className="bg-white/10 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-400">
            {totalTime}
          </div>
          <div className="text-sm text-gray-300">Total Time</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="px-4 py-2 text-left">Process</th>
              <th className="px-4 py-2 text-left">Arrival</th>
              <th className="px-4 py-2 text-left">Burst</th>
              <th className="px-4 py-2 text-left">Completion</th>
              <th className="px-4 py-2 text-left">Turnaround</th>
              <th className="px-4 py-2 text-left">Waiting</th>
            </tr>
          </thead>
          <tbody>
            {stats.completed.map(p => (
              <tr key={p.id} className="border-b border-white/10">
                <td className="px-4 py-2 font-bold">{p.name}</td>
                <td className="px-4 py-2">{p.arrivalTime}</td>
                <td className="px-4 py-2">{p.burstTime}</td>
                <td className="px-4 py-2">{p.completionTime}</td>
                <td className="px-4 py-2">{p.turnaroundTime}</td>
                <td className="px-4 py-2">{p.waitingTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Statistics;