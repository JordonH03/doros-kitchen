import { useReducer } from "react"
import type { TimerAction, TimerState } from "../types"

export function timerReducer(state: TimerState, action: TimerAction): TimerState {
    switch (action.type) {
        case "SET_POMODORO":
            return { ...state, pomodoro: action.payload, timeLeft: action.payload * 6000 }
        case "SET_SHORT_BREAK":
            return { ...state, shortBreak: action.payload }
        case "SET_LONG_BREAK":
            return { ...state, longBreak: action.payload }
        case "TOGGLE_TIMER":
            return { ...state, isRunning: !state.isRunning }
        case "RESET_TIMER":
            return {
                ...state,
                isRunning: false,
                timeLeft: state.pomodoro * 6000,
                currentSession: "pomodoro",
                interval: 4,
            }
        case "TICK":
            if (state.timeLeft <= 0) {
                return state // No change if timeLeft is already 0
            }
            return { ...state, timeLeft: state.timeLeft - 10 }
        case "SET_INTERVAL":
            return { ...state, interval: action.payload }
        case "TRANSITION":
            if (state.currentSession === "pomodoro") {
                if (state.interval > 1) {
                    return {
                        ...state,
                        currentSession: "short",
                        timeLeft: state.shortBreak * 6000,
                        interval: state.interval - 1,
                    }
                } else {
                    return {
                        ...state,
                        currentSession: "long",
                        timeLeft: state.longBreak * 6000,
                        interval: 4, // Reset interval after long break
                    }
                }
            } else if (state.currentSession === "short") {
                return {
                    ...state,
                    currentSession: "pomodoro",
                    timeLeft: state.pomodoro * 6000,
                }
            } else if (state.currentSession === "long") {
                return {
                    ...state,
                    currentSession: "pomodoro",
                    timeLeft: state.pomodoro * 6000,
                    interval: 4, // Reset interval after long break
                }
            }
        default:
            return state
    }
}
export function usePomodoroTimer() {
    const [state, dispatch] = useReducer(timerReducer, {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
        isRunning: false,
        timeLeft: 25 * 6000,
        currentSession: "pomodoro",
        interval: 4,
    })
    
    const { pomodoro, shortBreak, longBreak } = state


    function setPomodoro() {
        dispatch({ type: "SET_POMODORO", payload: pomodoro })
    }

    function setShortBreak() {
        dispatch({ type: "SET_SHORT_BREAK", payload: shortBreak })
    }

    function setLongBreak() {
        dispatch({ type: "SET_LONG_BREAK", payload: longBreak })
    }

    function toggleTimer() {
        dispatch({ type: "TOGGLE_TIMER" })
    }

    function resetTimer() {
        dispatch({ type: "RESET_TIMER" })
    }

    function transitionSession() {
        dispatch({ type: "TRANSITION" })
    }

    return {
        state,
        setPomodoro,
        setShortBreak,
        setLongBreak,
        resetTimer,
        toggleTimer,
        transitionSession,
    }
}