import { Process, CalculatedProcess, GanttItem, ScheduleResult, SchedulerAlgorithm } from '../types';
import { calculateStats } from './calculation';

// Base type for scheduling function
type Scheduler = (processes: Process[], quantum?: number) => ScheduleResult;

/**
 * Converts initial processes to their calculated format and sorts by arrival time.
 */
const prepareProcesses = (processes: Process[]): CalculatedProcess[] => {
  return processes.map(p => ({
    ...p,
    remainingTime: p.burstTime,
    completionTime: 0,
    waitingTime: 0,
    turnaroundTime: 0,
    startTime: -1
  })).sort((a, b) => a.arrivalTime - b.arrivalTime);
};

// --- Algorithm Implementations ---

export const fcfs: Scheduler = (procs) => {
  const processes = prepareProcesses(procs);
  const chart: GanttItem[] = [];
  const completed: CalculatedProcess[] = [];
  let time = 0;

  processes.forEach(p => {
    // Wait until arrival time
    if (time < p.arrivalTime) {
      time = p.arrivalTime;
    }
    
    chart.push({ process: p, start: time, end: time + p.burstTime });
    time += p.burstTime;
    completed.push({ ...p, completionTime: time });
  });

  return { chart, stats: calculateStats(completed) };
};

export const sjf: Scheduler = (procs) => {
  const processes = prepareProcesses(procs);
  const chart: GanttItem[] = [];
  const completed: CalculatedProcess[] = [];
  let time = 0;

  while (completed.length < processes.length) {
    // Find available processes
    const available = processes.filter(p => 
      p.arrivalTime <= time && !completed.find(c => c.id === p.id)
    );

    if (available.length === 0) {
      time++; // Idle time
      continue;
    }
    
    // Select shortest burst time (non-preemptive)
    const shortest = available.reduce((min, p) => 
      p.burstTime < min.burstTime ? p : min
    );
    
    chart.push({ process: shortest, start: time, end: time + shortest.burstTime });
    time += shortest.burstTime;
    completed.push({ ...shortest, completionTime: time });
  }

  return { chart, stats: calculateStats(completed) };
};

export const priority: Scheduler = (procs) => {
  const processes = prepareProcesses(procs);
  const chart: GanttItem[] = [];
  const completed: CalculatedProcess[] = [];
  let time = 0;

  while (completed.length < processes.length) {
    // Find available processes
    const available = processes.filter(p => 
      p.arrivalTime <= time && !completed.find(c => c.id === p.id)
    );

    if (available.length === 0) {
      time++; // Idle time
      continue;
    }

    // Select highest priority (lowest number)
    const highest = available.reduce((max, p) => 
      p.priority < max.priority ? p : max
    );

    chart.push({ process: highest, start: time, end: time + highest.burstTime });
    time += highest.burstTime;
    completed.push({ ...highest, completionTime: time });
  }

  return { chart, stats: calculateStats(completed) };
};


export const roundRobin: Scheduler = (procs, quantum = 1) => {
  const processes = prepareProcesses(procs);
  const chart: GanttItem[] = [];
  const completed: CalculatedProcess[] = [];
  const queue: CalculatedProcess[] = [];
  let time = 0;
  let procIndex = 0; // Index for tracking arrival

  while (completed.length < processes.length || queue.length > 0) {
    // Add newly arrived processes to the queue
    while (procIndex < processes.length && processes[procIndex].arrivalTime <= time) {
      queue.push({ ...processes[procIndex] });
      procIndex++;
    }

    if (queue.length === 0) {
      time++;
      continue;
    }

    const current = queue.shift()!;
    const execTime = Math.min(quantum, current.remainingTime);
    
    chart.push({ process: current, start: time, end: time + execTime });
    time += execTime;
    current.remainingTime -= execTime;

    // Check for arrivals during execution
    while (procIndex < processes.length && processes[procIndex].arrivalTime <= time) {
      queue.push({ ...processes[procIndex] });
      procIndex++;
    }

    if (current.remainingTime > 0) {
      // Re-queue the process
      queue.push(current);
    } else {
      // Process finished
      completed.push({ ...current, completionTime: time });
    }
  }

  return { chart, stats: calculateStats(completed) };
};

export const srtf: Scheduler = (procs) => {
  const processes = prepareProcesses(procs);
  const chart: GanttItem[] = [];
  const completed: CalculatedProcess[] = [];
  let time = 0;

  // Use a copy of processes to track remaining time for preemption
  const remaining = processes.map(p => ({ ...p }));

  while (completed.length < processes.length) {
    // Find available processes with remaining time
    const available = remaining.filter(p => 
      p.arrivalTime <= time && p.remainingTime > 0
    );

    if (available.length === 0) {
      time++; // Idle time
      continue;
    }
    
    // Select shortest remaining time
    const shortest = available.reduce((min, p) => 
      p.remainingTime < min.remainingTime ? p : min
    )!;

    // Check for preemption: if the last job was the same, merge the block
    const lastChart = chart[chart.length - 1];
    if (lastChart && lastChart.process.id === shortest.id && lastChart.end === time) {
      lastChart.end++; // Extend the current execution block
    } else {
      chart.push({ process: shortest, start: time, end: time + 1 }); // New execution block
    }

    shortest.remainingTime--; // Execute for 1 time unit
    time++;

    // Check if the process is finished
    if (shortest.remainingTime === 0) {
      completed.push({ ...shortest, completionTime: time });
    }
  }

  return { chart, stats: calculateStats(completed) };
};

export const schedulerMap: Record<SchedulerAlgorithm, Scheduler> = {
  fcfs: fcfs,
  sjf: sjf,
  priority: priority,
  rr: roundRobin,
  srtf: srtf,
};