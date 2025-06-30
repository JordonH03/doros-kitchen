import { useEffect, useRef, useState } from "react"
import Settings from "@/components/settings"
import { useTimer } from "@/util/timer/TimerContext"
import { GearIcon } from "@radix-ui/react-icons"
import { formatTime } from "@/util/timer/timerUtils"
import { TICK_INTERVAL } from "@/util/constants"

export default function Home() {
    const { state, dispatch } = useTimer()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (state.isRunning && state.timeLeft > 0) {
            if (!timerRef) {
                return;
            }

            if (timerRef.current) {
                clearInterval(timerRef.current)
            }

            timerRef.current = setInterval(() => {
                dispatch({ type: "TICK" })
            }, TICK_INTERVAL)
        }

        if (state.timeLeft <= 0) {
            dispatch({ type: "SWITCH_SESSION" })
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [state.isRunning, state.timeLeft])

    return (
        <div id="root">
            <main>
                <button className="button__settings" onClick={() => setSettingsOpen(true)}><GearIcon /></button>
                <div>
                    <p>{state.currentSession}</p>
                    <p>{formatTime(state.timeLeft)}</p>
                </div>
                <button onClick={() => dispatch({ type: "TOGGLE_TIMER" })}>{state.isRunning ? "Pause" : "Play"}</button>
                <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
            </main>
        </div>
    )
}
