import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { UseScheduler } from '../hooks/useSchedular';
import { Process } from '../types';

interface ProcessTableProps {
  scheduler: UseScheduler;
}

const ProcessTable: React.FC<ProcessTableProps> = ({ scheduler }) => {
  const { processes, addProcess, deleteProcess, updateProcess, isRunning, setIsRunning } = scheduler;

  // Modal form state for creating a new process
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ arrivalTime: 0, burstTime: 5, priority: 1, color: '#3b82f6' });
  const [wasRunning, setWasRunning] = useState(false);

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
          onClick={() => { setForm({ arrivalTime: 0, burstTime: 5, priority: 1, color: '#3b82f6' }); setWasRunning(isRunning); setIsRunning(false); setShowModal(true); }}
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
      
      {/* Modal for adding process */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
          <div className="card rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add Process</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-200"><X /></button>
            </div>

            <div className="space-y-3 text-sm">
              <label className="block">
                <div className="text-xs text-slate-400 mb-1">Arrival Time</div>
                <input type="number" value={form.arrivalTime} onChange={(e) => setForm(f => ({ ...f, arrivalTime: Math.max(0, parseInt(e.target.value || '0')) }))} className="w-full bg-card border border-slate-200 rounded px-2 py-2" min={0} />
              </label>

              <label className="block">
                <div className="text-xs text-slate-400 mb-1">Burst Time</div>
                <input type="number" value={form.burstTime} onChange={(e) => setForm(f => ({ ...f, burstTime: Math.max(1, parseInt(e.target.value || '1')) }))} className="w-full bg-card border border-slate-200 rounded px-2 py-2" min={1} />
              </label>

              <label className="block">
                <div className="text-xs text-slate-400 mb-1">Priority</div>
                <input type="number" value={form.priority} onChange={(e) => setForm(f => ({ ...f, priority: Math.max(1, parseInt(e.target.value || '1')) }))} className="w-full bg-card border border-slate-200 rounded px-2 py-2" min={1} />
              </label>

              <label className="block">
                <div className="text-xs text-slate-400 mb-1">Color</div>
                <input type="color" value={form.color} onChange={(e) => setForm(f => ({ ...f, color: e.target.value }))} className="w-16 h-10 p-1 rounded" />
              </label>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => { setShowModal(false); if (wasRunning) { setIsRunning(true); } setWasRunning(false); }} className="px-3 py-2 rounded bg-transparent border border-slate-600 text-slate-200">Cancel</button>
                <button onClick={() => { addProcess(form); setShowModal(false); if (wasRunning) { setIsRunning(true); } setWasRunning(false); }} className="px-3 py-2 rounded bg-amber-600 text-white">Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessTable;
