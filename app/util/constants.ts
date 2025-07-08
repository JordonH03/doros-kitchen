import type { TimerState } from "./types"

export const MINUTES_2_MILLISECONDS = 60000;

export const TICK_INTERVAL = 10; // Milliseconds

export const MIN_TIME = 1; // Minutes

export const MIN_INTERVAL = 1; // Minutes

export const MAX_TIME = 120; // Minutes

export const MAX_INTERVAL = 100;

export const INITIAL_SETTINGS: TimerState = {
    pomodoro: 1,
    shortBreak: 1,
    longBreak: 1,
    isRunning: false,
    timeLeft: 25 * MINUTES_2_MILLISECONDS,
    currentSession: "pomodoro",
    interval: 1,
    maxInterval: 1,
}

export const SESSION_VALUES: Record<string, string> = {
    pomodoro: 'Pomodoro',
    shortBreak: 'Short Break',
    longBreak: 'Long Break'
}
