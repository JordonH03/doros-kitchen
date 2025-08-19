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
                <button aria-label="Open settings" className="button button-icon button__variant__primary settings-button" onClick={() => setSettingsOpen(true)}><GearIcon /></button>
                <div className="timer__container">
                    <div className="timer__labels">
                        <p className="timer__label prevent-select">{SESSION_LABELS[state.currentSession]}</p>
                        <p className="timer__value prevent-select">{formatTime(state.timeLeft)}</p>
                    </div>
                    <button aria-label={state.isRunning ? "Timer started" : "Timer paused"} className="button button-icon button__variant__cta" onClick={() => dispatch({ type: "TOGGLE_TIMER" })}>
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
