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
  <div className="card rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Processes</h2>
        <button
          onClick={addProcess}
          className="bg-amber-600 text-white px-3 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Process
        </button>
      </div>

      <div className="overflow-x-auto">
  <table className="w-full text-sm text-slate-700">
          <thead>
            <tr className="border-b border-slate-100">
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
              <tr key={p.id} className="border-b border-slate-100 hover:bg-card">
                <td className="px-4 py-2 font-medium">{p.name}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={p.arrivalTime}
                    onChange={(e) => handleUpdate(p.id, 'arrivalTime', e.target.value)}
                    className="w-20 bg-card border border-slate-200 rounded px-2 py-1"
                    min="0"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={p.burstTime}
                    onChange={(e) => handleUpdate(p.id, 'burstTime', e.target.value)}
                    className="w-20 bg-card border border-slate-200 rounded px-2 py-1"
                    min="1"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={p.priority}
                    onChange={(e) => handleUpdate(p.id, 'priority', e.target.value)}
                    className="w-20 bg-card border border-slate-200 rounded px-2 py-1"
                    min="1"
                  />
                </td>
                <td className="px-4 py-2">
                  <div 
                    className="w-8 h-8 rounded border-2 border-slate-200"
                    style={{ backgroundColor: p.color }}
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteProcess(p.id)}
                    className="text-red-500 hover:text-red-400 transition"
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
