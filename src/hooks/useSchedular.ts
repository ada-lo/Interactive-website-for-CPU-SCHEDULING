import { useState, useEffect, useCallback } from 'react';
import { Process, GanttItem, SchedulerStats, SchedulerAlgorithm } from '../types';
import { schedulerMap } from '../utils/schedulers';

const initialProcesses: Process[] = [
  { id: 1, name: 'P1', arrivalTime: 0, burstTime: 5, priority: 2, color: '#3b82f6' },
  { id: 2, name: 'P2', arrivalTime: 1, burstTime: 3, priority: 1, color: '#10b981' },
  { id: 3, name: 'P3', arrivalTime: 2, burstTime: 8, priority: 3, color: '#f59e0b' },
  { id: 4, name: 'P4', arrivalTime: 3, burstTime: 6, priority: 2, color: '#8b5cf6' }
];

export const useScheduler = () => {
  const [processes, setProcesses] = useState<Process[]>(initialProcesses);
  const [algorithm, setAlgorithm] = useState<SchedulerAlgorithm>('fcfs');
  const [quantum, setQuantum] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [ganttChart, setGanttChart] = useState<GanttItem[]>([]);
  const [stats, setStats] = useState<SchedulerStats | null>(null);
  const [speed, setSpeed] = useState(500);

  // --- Process Management ---

  const addProcess = useCallback(() => {
    const newId = Math.max(...processes.map(p => p.id), 0) + 1;
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
    setProcesses(prev => [...prev, {
      id: newId,
      name: `P${newId}`,
      arrivalTime: 0,
      burstTime: 5,
      priority: 1,
      color: colors[newId % colors.length]
    }]);
  }, [processes]);

  const deleteProcess = useCallback((id: number) => {
    setProcesses(prev => prev.filter(p => p.id !== id));
  }, []);

  const updateProcess = useCallback((id: number, field: keyof Process, value: number) => {
    setProcesses(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  }, []);

  // --- Simulation Control ---

  const calculateSchedule = useCallback(() => {
    const scheduler = schedulerMap[algorithm];
    return scheduler(processes, quantum);
  }, [processes, algorithm, quantum]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setCurrentTime(0);
    setGanttChart([]);
    setStats(null);
  }, []);

  const startSimulation = useCallback(() => {
    const { chart, stats: calcStats } = calculateSchedule();
    setGanttChart(chart);
    setStats(calcStats);
    setCurrentTime(0);
    setIsRunning(true);
  }, [calculateSchedule]);

  // --- Animation/Timer Effect ---

  useEffect(() => {
    const lastTime = ganttChart[ganttChart.length - 1]?.end;
    
    if (!isRunning || ganttChart.length === 0 || (lastTime && currentTime >= lastTime)) {
      if (lastTime && currentTime >= lastTime) {
        setIsRunning(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCurrentTime(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isRunning, currentTime, ganttChart, speed]);

  return {
    processes,
    algorithm,
    setAlgorithm,
    quantum,
    setQuantum,
    speed,
    setSpeed,
    isRunning,
    setIsRunning,
    currentTime,
    ganttChart,
    stats,
    addProcess,
    deleteProcess,
    updateProcess,
    startSimulation,
    reset,
  };
};

export type UseScheduler = ReturnType<typeof useScheduler>;