
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface TimerSettings {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    interval: number;
}

export interface TimerState {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    isRunning: boolean;
    timeLeft: number;
    currentSession: "pomodoro" | "short" | "long";
    maxInterval: number;
    interval: number;
}

export type TimerAction =
    { type: "SET_POMODORO", payload: number }
    | { type: "SET_SHORT_BREAK", payload: number }
    | { type: "SET_LONG_BREAK", payload: number }
    | { type: "START_TIMER" }
    | { type: "TOGGLE_TIMER" }
    | { type: "PAUSE_TIMER" }
    | { type: "RESET_TIMER" }
    | { type: "TICK" }
    | { type: "SET_INTERVAL", payload: number }
    | { type: "SWITCH_SESSION" }
    | { type: "UPDATE_TIMER", payload: TimerSettings }