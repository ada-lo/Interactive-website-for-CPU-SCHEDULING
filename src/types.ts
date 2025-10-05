/**
 * Defines the core structure of a process in the simulator.
 */
export interface Process {
  id: number;
  name: string;
  arrivalTime: number;
  burstTime: number;
  priority: number; // Lower number means higher priority
  color: string;
}

/**
 * Defines the structure of a process during calculation/simulation.
 * Includes derived and working properties.
 */
export interface CalculatedProcess extends Process {
  remainingTime: number;
  completionTime: number;
  waitingTime: number;
  turnaroundTime: number;
  startTime: number;
}

/**
 * Defines a single block in the Gantt Chart.
 */
export interface GanttItem {
  process: Process;
  start: number;
  end: number;
}

/**
 * Defines the overall statistics calculated after scheduling.
 */
export interface SchedulerStats {
  completed: CalculatedProcess[];
  avgWaiting: number;
  avgTurnaround: number;
}

/**
 * Defines the return type of the scheduling functions.
 */
export interface ScheduleResult {
  chart: GanttItem[];
  stats: SchedulerStats;
}

/**
 * Defines the properties passed to the scheduling function.
 */
export type SchedulerAlgorithm = 'fcfs' | 'sjf' | 'priority' | 'rr' | 'srtf';