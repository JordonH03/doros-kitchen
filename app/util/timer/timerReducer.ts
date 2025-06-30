import { useReducer } from "react"
import type { TimerAction, TimerState } from "../types"
import { INITIAL_SETTINGS, MINUTES_2_MILLISECONDS } from "../constants"

export function timerReducer(state: TimerState, action: TimerAction): TimerState {
    const STUDY_SESSION = "pomodoro"
    const BREAK_SESSION = "short"
    const LONG_BREAK_SESSION = "long"

    switch (action.type) {
        case "SET_POMODORO":
            return { ...state, pomodoro: action.payload, timeLeft: action.payload * MINUTES_2_MILLISECONDS }
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
                timeLeft: state.pomodoro * MINUTES_2_MILLISECONDS,
                currentSession: STUDY_SESSION,
                interval: state.maxInterval,
            }
        case "TICK":
            if (state.timeLeft <= 0) {
                return state
            }
            return { ...state, timeLeft: state.timeLeft - 10 }
        case "SET_INTERVAL":
            return { ...state, maxInterval: action.payload, interval: action.payload }
        case "SWITCH_SESSION":
            if (state.currentSession === STUDY_SESSION) {
                if (state.interval > 1) {
                    return {
                        ...state,
                        currentSession: BREAK_SESSION,
                        timeLeft: state.shortBreak * MINUTES_2_MILLISECONDS,
                        interval: state.interval - 1,
                    }
                } else {
                    return {
                        ...state,
                        currentSession: LONG_BREAK_SESSION,
                        timeLeft: state.longBreak * MINUTES_2_MILLISECONDS,
                        interval: state.interval - 1,
                    }
                }
            } else if (state.currentSession === BREAK_SESSION) {
                return {
                    ...state,
                    currentSession: STUDY_SESSION,
                    timeLeft: state.pomodoro * MINUTES_2_MILLISECONDS,
                }
            } else {
                return {
                    ...state,
                    currentSession: STUDY_SESSION,
                    timeLeft: state.pomodoro * MINUTES_2_MILLISECONDS,
                    interval: state.maxInterval,
                }
            }
        case "UPDATE_TIMER":
            return {
                ...state,
                pomodoro: action.payload.pomodoro,
                shortBreak: action.payload.shortBreak,
                longBreak: action.payload.longBreak,
                interval: action.payload.interval,
                timeLeft: action.payload.pomodoro * MINUTES_2_MILLISECONDS,
                currentSession: STUDY_SESSION,
            }
        default:
            return state
    }
}

export function usePomodoroTimer() {
    const [state, dispatch] = useReducer(timerReducer, INITIAL_SETTINGS)
    
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
        dispatch({ type: "SWITCH_SESSION" })
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