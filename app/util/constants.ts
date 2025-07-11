import type { TimerState } from "./types"

export const MINUTES_2_MILLISECONDS = 60000;

export const TICK_INTERVAL = 10; // Milliseconds

export const MIN_TIME = 1; // Minutes

export const MIN_INTERVAL = 1; // Minutes

export const MAX_TIME = 120; // Minutes

export const MAX_INTERVAL = 100;

export enum SessionType {
    POMODORO,
    SHORT_BREAK,
    LONG_BREAK
}

export const INITIAL_SETTINGS: TimerState = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    isRunning: false,
    lastTick: null,
    timeLeft: 25 * MINUTES_2_MILLISECONDS,
    currentSession: SessionType.POMODORO,
    interval: 4,
    maxInterval: 4,
}

export const SESSION_LABELS: Record<string, string> = {
    [SessionType.POMODORO]: 'Pomodoro',
    [SessionType.SHORT_BREAK]: 'Short Break',
    [SessionType.LONG_BREAK]: 'Long Break'
}
