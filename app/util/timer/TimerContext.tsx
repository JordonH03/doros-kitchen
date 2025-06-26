import { createContext, useContext, useReducer } from "react"
import type { ReactNode, Dispatch } from "react"
import { timerReducer } from "@/util/timer/timerReducer"
import type { TimerAction, TimerState } from "../types"
import { INITIAL_SETTINGS } from "../constants"

interface TimerContextType {
    state: TimerState
    dispatch: Dispatch<TimerAction>
}

export const TimerContext = createContext<TimerContextType | null>(null)

export function TimerProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(timerReducer, INITIAL_SETTINGS)

    return (
        <TimerContext.Provider value={{ state, dispatch }}>
            {children}
        </TimerContext.Provider>
    )
}

export function useTimer() {
    const context = useContext(TimerContext)
    if (!context) {
        throw new Error("useTimer must be used within a TimerProvider")
    }
    return context
}
