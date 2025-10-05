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
  <div className="card rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Statistics</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm text-slate-700">
        <div className="card rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-sky-600">{stats.avgWaiting.toFixed(2)}</div>
          <div className="text-xs text-slate-500">Avg Waiting Time</div>
        </div>
  <div className="card rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-emerald-600">{stats.avgTurnaround.toFixed(2)}</div>
          <div className="text-xs text-slate-500">Avg Turnaround Time</div>
        </div>
  <div className="card rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-violet-600">{stats.completed.length}</div>
          <div className="text-xs text-slate-500">Total Processes</div>
        </div>
  <div className="card rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-amber-600">{totalTime}</div>
          <div className="text-xs text-slate-500">Total Time</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-slate-700">
          <thead>
            <tr className="border-b border-slate-100">
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
              <tr key={p.id} className="border-b border-slate-100">
                <td className="px-4 py-2 font-medium">{p.name}</td>
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