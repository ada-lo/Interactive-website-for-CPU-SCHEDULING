import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { UseScheduler } from '../hooks/useSchedular';
import { Process } from '../types';

interface ProcessTableProps {
  scheduler: UseScheduler;
}

const ProcessTable: React.FC<ProcessTableProps> = ({ scheduler }) => {
  const { processes, addProcess, deleteProcess, updateProcess } = scheduler;

  const handleUpdate = (id: number, field: keyof Process, value: string) => {
    // Ensure value is a non-negative integer
    const parsedValue = parseInt(value);
    const numericValue = isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue;
    // Burst time must be at least 1
    const finalValue = field === 'burstTime' && numericValue < 1 ? 1 : numericValue;
    
    updateProcess(id, field, finalValue);
  };

  return (
    <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Processes</h2>
        <button
          onClick={addProcess}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          Add Process
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="px-4 py-2 text-left">Process</th>
              <th className="px-4 py-2 text-left">Arrival</th>
              <th className="px-4 py-2 text-left">Burst</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Color</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {processes.map(p => (
              <tr key={p.id} className="border-b border-white/10 hover:bg-white/5">
                <td className="px-4 py-2 font-bold">{p.name}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={p.arrivalTime}
                    onChange={(e) => handleUpdate(p.id, 'arrivalTime', e.target.value)}
                    className="w-16 bg-white/10 border border-white/30 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="0"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={p.burstTime}
                    onChange={(e) => handleUpdate(p.id, 'burstTime', e.target.value)}
                    className="w-16 bg-white/10 border border-white/30 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={p.priority}
                    onChange={(e) => handleUpdate(p.id, 'priority', e.target.value)}
                    className="w-16 bg-white/10 border border-white/30 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="1"
                  />
                </td>
                <td className="px-4 py-2">
                  <div 
                    className="w-8 h-8 rounded border-2 border-white/30"
                    style={{ backgroundColor: p.color }}
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteProcess(p.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessTable;
