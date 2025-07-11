import type { SessionType } from "./constants"

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface TimerSettings {
    interval: number;
    longBreak: number;
    pomodoro: number;
    shortBreak: number;
}

export interface TimerState {
    currentSession: SessionType;
    interval: number;
    isRunning: boolean;
    lastTick: number | null; // milliseconds
    longBreak: number; // minutes
    maxInterval: number;
    pomodoro: number; // minutes
    shortBreak: number; // minutes
    timeLeft: number; // milliseconds
}

export type TimerAction =
    { type: "RESET_TIMER" }
    | { type: "SET_INTERVAL", payload: number }
    | { type: "SET_POMODORO", payload: number }
    | { type: "SET_SHORT_BREAK", payload: number }
    | { type: "SET_LONG_BREAK", payload: number }
    | { type: "SWITCH_SESSION" }
    | { type: "TICK", payload: number }
    | { type: "TOGGLE_TIMER" }
    | { type: "UPDATE_TIMER", payload: TimerSettings }