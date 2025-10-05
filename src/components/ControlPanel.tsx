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
    <div className="lg:col-span-1 bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-white/20">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Settings className="w-6 h-6" />
        Configuration
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Algorithm</label>
          <select 
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as any)}
            className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {algorithms.map(alg => (
              <option key={alg.value} value={alg.value} className="bg-slate-800">
                {alg.label}
              </option>
            ))}
          </select>
        </div>

        {algorithm === 'rr' && (
          <div>
            <label className="block text-sm font-medium mb-2">Time Quantum</label>
            <input
              type="number"
              value={quantum}
              onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
              min="1"
              className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Speed (ms)</label>
          <input
            type="range"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            min="100"
            max="1000"
            step="100"
            className="w-full"
          />
          <div className="text-xs text-gray-300 text-center">{speed}ms</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={startSimulation}
            disabled={isRunning}
            className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
          >
            <Play className="w-4 h-4" />
            Start
          </button>
          <button
            onClick={() => setIsRunning(!isRunning)}
            disabled={ganttChart.length === 0}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition"
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