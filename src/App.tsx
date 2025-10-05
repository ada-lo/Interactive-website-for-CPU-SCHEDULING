import React from 'react';
import { useScheduler } from './hooks/useSchedular';
import ControlPanel from './components/ControlPanel';
import ProcessTable from './components/ProcessTable';
import GanttChart from './components/GanttChart';
import Statistics from './components/Statistics';

const CPUSchedulerApp: React.FC = () => {
  const scheduler = useScheduler();

  return (
  <div className="min-h-screen app-background text-slate-900">
      <div className="max-w-8xl mx-auto">
        <main className="w-full max-w-7xl mx-auto p-8">
          <header className="mb-6 app-header">
            <h1 className="text-3xl font-extrabold">CPU Scheduling Simulator</h1>
            <p className="text-sm text-slate-600">Interactive visualization of scheduling algorithms</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <ControlPanel scheduler={scheduler} />
              <Statistics stats={scheduler.stats} ganttChart={scheduler.ganttChart} />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow p-6">
                <GanttChart ganttChart={scheduler.ganttChart} currentTime={scheduler.currentTime} />
              </div>

              <ProcessTable scheduler={scheduler} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CPUSchedulerApp;
