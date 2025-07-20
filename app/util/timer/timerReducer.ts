import { useReducer } from "react"
import type { TimerAction, TimerSettings, TimerState } from "../types"
import { INITIAL_SETTINGS, MINUTES_2_MILLISECONDS, SessionType } from "../constants"

export function timerReducer(state: TimerState, action: TimerAction): TimerState {

    switch (action.type) {
        case "SET_POMODORO":
            return { ...state, pomodoro: action.payload, timeLeft: action.payload * MINUTES_2_MILLISECONDS }
        case "SET_SHORT_BREAK":
            return { ...state, shortBreak: action.payload }
        case "SET_LONG_BREAK":
            return { ...state, longBreak: action.payload }
        case "TOGGLE_TIMER":
            return { ...state, isRunning: !state.isRunning, lastTick: Date.now() }
        case "RESET_TIMER":
            return {
                ...state,
                isRunning: false,
                lastTick: Date.now(),
                timeLeft: state.pomodoro * MINUTES_2_MILLISECONDS,
                currentSession: SessionType.POMODORO,
                interval: state.maxInterval,
            }
        case "TICK":
            if (!state.isRunning || state.timeLeft <= 0) {
                return state
            }

            const elapsed = state.lastTick ? action.payload - state.lastTick : 0
            const newTime = Math.max(0, state.timeLeft - elapsed)

            return { ...state, timeLeft: newTime, lastTick: action.payload }
        case "SET_INTERVAL":
            return { ...state, maxInterval: action.payload, interval: action.payload }
        case "SWITCH_SESSION":
            if (state.currentSession === SessionType.POMODORO) {
                if (state.interval > 1) {
                    return {
                        ...state,
                        currentSession: SessionType.SHORT_BREAK,
                        timeLeft: state.shortBreak * MINUTES_2_MILLISECONDS,
                    }
                } else {
                    return {
                        ...state,
                        currentSession: SessionType.LONG_BREAK,
                        timeLeft: state.longBreak * MINUTES_2_MILLISECONDS,
                    }
                }
            } else if (state.currentSession === SessionType.SHORT_BREAK) {
                return {
                    ...state,
                    currentSession: SessionType.POMODORO,
                    timeLeft: state.pomodoro * MINUTES_2_MILLISECONDS,
                    interval: state.interval - 1,
                }
            } else {
                return {
                    ...state,
                    currentSession: SessionType.POMODORO,
                    timeLeft: state.pomodoro * MINUTES_2_MILLISECONDS,
                    interval: state.maxInterval,
                }
            }
        case "UPDATE_TIMER":
            return {
                ...state,
                currentSession: SessionType.POMODORO,
                interval: action.payload.interval,
                isRunning: false,
                lastTick: null,
                longBreak: action.payload.longBreak,
                maxInterval: action.payload.interval,
                pomodoro: action.payload.pomodoro,
                shortBreak: action.payload.shortBreak,
                timeLeft: action.payload.pomodoro * MINUTES_2_MILLISECONDS,
            }
        default:
            return state
    }
}

export function usePomodoroTimer() {
    const [state, dispatch] = useReducer(timerReducer, INITIAL_SETTINGS)
    
    const { pomodoro, shortBreak, longBreak } = state


    function resetTimer() {
        dispatch({ type: "RESET_TIMER" })
    }

    function setLongBreak() {
        dispatch({ type: "SET_LONG_BREAK", payload: longBreak })
    }

    function setPomodoro() {
        dispatch({ type: "SET_POMODORO", payload: pomodoro })
    }

    function setShortBreak() {
        dispatch({ type: "SET_SHORT_BREAK", payload: shortBreak })
    }

    function switchSession() {
        dispatch({ type: "SWITCH_SESSION" })
    }

    function tick() {
        dispatch({ type: "TICK", payload: Date.now() })
    }

    function toggleTimer() {
        dispatch({ type: "TOGGLE_TIMER" })
    }

    function updateTimer(settings: TimerSettings) {
        dispatch({ type: "UPDATE_TIMER", payload: settings })
    }

    return {
        state,
        resetTimer,
        setPomodoro,
        setShortBreak,
        setLongBreak,
        switchSession,
        tick,
        toggleTimer,
        updateTimer,
    }
}