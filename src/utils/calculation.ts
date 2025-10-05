import { CalculatedProcess, SchedulerStats } from '../types';

/**
 * Calculates Turnaround Time and Waiting Time for all completed processes
 * and computes the overall averages.
 */
export const calculateStats = (completed: CalculatedProcess[]): SchedulerStats => {
  completed.forEach(p => {
    // Turnaround Time = Completion Time - Arrival Time
    p.turnaroundTime = p.completionTime - p.arrivalTime;
    // Waiting Time = Turnaround Time - Burst Time
    p.waitingTime = p.turnaroundTime - p.burstTime;
  });

  const avgWaiting = completed.reduce((sum, p) => sum + p.waitingTime, 0) / completed.length;
  const avgTurnaround = completed.reduce((sum, p) => sum + p.turnaroundTime, 0) / completed.length;

  return { completed, avgWaiting, avgTurnaround };
};