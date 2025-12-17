export interface Timer {
  id: string;
  title: string;
  duration: number; // in seconds
  remainingTime: number; // in seconds
  isActive: boolean;
  isPaused: boolean;
}

export interface TimerState {
  timers: Timer[];
  activeTimerId: string | null;
}

export interface TimerAction {
  type: 'ADD_TIMER' | 'REMOVE_TIMER' | 'START_TIMER' | 'PAUSE_TIMER' | 'RESET_TIMER' | 'UPDATE_TIMER';
  payload: any; // Define more specific types based on the action
}