import React from 'react';
import { useScheduler } from './hooks/useSchedular';
import ControlPanel from './components/ControlPanel';
import ProcessTable from './components/ProcessTable';
import GanttChart from './components/GanttChart';
import Statistics from './components/Statistics';

const CPUSchedulerApp: React.FC = () => {
  const scheduler = useScheduler();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          CPU Scheduling Simulator
        </h1>
        <p className="text-center text-gray-300 mb-8">Interactive visualization of scheduling algorithms</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ControlPanel scheduler={scheduler} />
          <ProcessTable scheduler={scheduler} />
        </div>

        <GanttChart ganttChart={scheduler.ganttChart} currentTime={scheduler.currentTime} />

        <Statistics stats={scheduler.stats} ganttChart={scheduler.ganttChart} />
      </div>
    </div>
  );
};

export default CPUSchedulerApp;