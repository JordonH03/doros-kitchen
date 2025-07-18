import { useEffect, useRef, useState } from "react"
import Settings from "@/components/settings"
import { useTimer } from "@/util/timer/TimerContext"
import { GearIcon, PauseIcon, PlayIcon } from "@radix-ui/react-icons"
import { formatTime } from "@/util/timer/timerUtils"
import { SESSION_LABELS, TICK_INTERVAL } from "@/util/constants"

export default function Home() {
    const { state, dispatch } = useTimer()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (state.isRunning && state.timeLeft > 0) {
            if (!timerRef.current) {
                timerRef.current = setInterval(() => {
                    dispatch({ type: "TICK", payload: Date.now() })
                }, TICK_INTERVAL);
            }

            if (!timerRef) {
                return;
            }

            if (timerRef.current) {
                clearInterval(timerRef.current)
            }

            timerRef.current = setInterval(() => {
                dispatch({ type: "TICK", payload: Date.now() })
            }, TICK_INTERVAL)
        } else if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
        }

        if (state.timeLeft <= 0) {
            const audio = new Audio("/alarm.mp3")
            audio.play()
            dispatch({ type: "SWITCH_SESSION" })
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }, [state.isRunning, state.timeLeft])

    return (
        <div id="root">
            <main>
                <button className="button button-round button-icon button__variant__primary" onClick={() => setSettingsOpen(true)}><GearIcon /></button>
                <div className="timer-container">
                    <div className="timer-labels">
                        <p className="session-label">{SESSION_LABELS[state.currentSession]}</p>
                        <p className="timer">{formatTime(state.timeLeft)}</p>
                    </div>
                    <button className="button button-icon button-round button__variant__cta button__size__lg" onClick={() => dispatch({ type: "TOGGLE_TIMER" })}>
                        {state.isRunning ? (
                            <PauseIcon />
                        ) : (
                            <PlayIcon />
                        )}
                    </button>
                </div>
                <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
            </main>
        </div>
    )
}
