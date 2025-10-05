import React from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { UseScheduler } from '../hooks/useSchedular';

interface ControlPanelProps {
  scheduler: UseScheduler;
}

const algorithms = [
  { value: 'fcfs', label: 'First Come First Serve (FCFS)' },
  { value: 'sjf', label: 'Shortest Job First (SJF)' },
  { value: 'priority', label: 'Priority Scheduling' },
  { value: 'rr', label: 'Round Robin (RR)' },
  { value: 'srtf', label: 'Shortest Remaining Time First (SRTF)' }
];

const ControlPanel: React.FC<ControlPanelProps> = ({ scheduler }) => {
  const { algorithm, setAlgorithm, quantum, setQuantum, speed, setSpeed, isRunning, setIsRunning, ganttChart, startSimulation, reset } = scheduler;

  return (
  <div className="card rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-800">
        <Settings className="w-5 h-5" />
        Configuration
      </h2>
      
      <div className="space-y-4 text-sm text-slate-700">
        <div>
          <label className="block mb-2">Algorithm</label>
          <select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as any)}
            className="w-full bg-card border border-slate-200 rounded-lg px-3 py-2 focus:outline-none"
          >
            {algorithms.map(alg => (
              <option key={alg.value} value={alg.value}>{alg.label}</option>
            ))}
          </select>
        </div>

        {algorithm === 'rr' && (
          <div>
            <label className="block mb-2">Time Quantum</label>
            <input
              type="number"
              value={quantum}
              onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>
        )}

        <div>
          <label className="block mb-2">Speed (ms)</label>
          <input
            type="range"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            min="100"
            max="1000"
            step="100"
            className="w-full"
          />
          <div className="text-xs muted text-right">{speed}ms</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={startSimulation}
            disabled={isRunning}
            className="flex-1 accent px-3 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Start
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            disabled={ganttChart.length === 0}
            className="flex-1 bg-card text-slate-800 px-3 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={reset}
            className="flex-1 card border border-slate-200 px-3 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;