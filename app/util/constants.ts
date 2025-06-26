import type { TimerState } from "./types"

export const MINUTES_2_SECONDS = 6000;

export const MIN_TIME = 1;

export const MIN_INTERVAL = 1;

export const MAX_TIME = 120;

export const MAX_INTERVAL = 100;

export const INITIAL_SETTINGS: TimerState = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    isRunning: false,
    timeLeft: 25 * MINUTES_2_SECONDS, // Initial time in milliseconds
    currentSession: "pomodoro",
    interval: 4, // Long break interval
}
