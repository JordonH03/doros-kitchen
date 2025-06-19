import { createContext, useReducer } from "react"
import type { ReactNode, Dispatch } from "react"
import { timerReducer } from "@/util/timer/timerReducer"
import type { TimerAction, TimerState } from "../types"

interface TimerContextType {
    state: TimerState
    dispatch: Dispatch<TimerAction>
}

export const TimerContext = createContext<TimerContextType | null>(null)

const initialState: TimerState = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    isRunning: false,
    timeLeft: 25 * 6000, // Initial time in milliseconds
    currentSession: "pomodoro",
    interval: 4, // Long break interval
}

export const TimerProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(timerReducer, initialState)
    
    return (
        <TimerContext.Provider value={{ state, dispatch }}>
            {children}
        </TimerContext.Provider>
    )
}
