import { useEffect, useRef, useState } from "react"
import Settings from "@/components/settings"
import { useTimer } from "@/util/timer/TimerContext"
import { GearIcon } from "@radix-ui/react-icons"

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
            }, 100)
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
                    <p>{Math.floor(state.timeLeft / 100)}</p>
                </div>
                <button onClick={() => dispatch({ type: "TOGGLE_TIMER" })}>{state.isRunning ? "Pause" : "Play"}</button>
                <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
            </main>
        </div>
    )
}
