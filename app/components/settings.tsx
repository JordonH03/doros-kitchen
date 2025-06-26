import { MAX_INTERVAL, MAX_TIME, MIN_INTERVAL, MIN_TIME } from "@/util/constants"
import { useTimer } from "@/util/timer/TimerContext"
import type { ModalProps } from "@/util/types"
import { useEffect, useRef, useState } from "react"

export default function Settings({ isOpen, onClose }: ModalProps) {
    const { state, dispatch } = useTimer()
    const [timerConfig, setTimerConfig] = useState(state)
    const modalRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (isOpen) {
            setTimerConfig(state)
        }
    }, [isOpen, state])

    useEffect(() => {
        const modalElement = modalRef.current
        if (!modalElement) return

        if (isOpen) {
            modalElement.showModal()
        } else {
            modalElement.close()
        }

    }, [isOpen])

    useEffect(() => {
        const modalElement = modalRef.current
        if (!modalElement) return
        const handleClose = () => {
            onClose()
        }
        modalElement.addEventListener('close', handleClose)
        return () => {
            modalElement.removeEventListener('close', handleClose)
        }
    }, [onClose])

    const handleSave = () => {
        dispatch({"type": "RESET_TIMER"})
        dispatch({"type": "SET_POMODORO", "payload": timerConfig.pomodoro})
        dispatch({"type": "SET_SHORT_BREAK", "payload": timerConfig.shortBreak})
        dispatch({"type": "SET_LONG_BREAK", "payload": timerConfig.longBreak})
        dispatch({"type": "SET_INTERVAL", "payload": timerConfig.interval})
        dispatch({"type": "START_TIMER"})
        onClose()
    }

    return (
        <dialog id="settings-modal" className="modal" ref={modalRef}>
            <h2>Settings</h2>
            <div className="settings-form">
                <label>
                    Pomodoro
                    <input
                        type="number"
                        name="pomodoro"
                        max={MAX_TIME}
                        min={MIN_TIME}
                        value={timerConfig.pomodoro}
                        onChange={(e) =>
                            setTimerConfig({
                                ...timerConfig,
                                pomodoro: Number(e.target.value),
                            })
                        }
                    />
                </label>
                <label>
                    Short Break
                    <input
                        type="number"
                        name="shortBreak"
                        max={MAX_TIME}
                        min={MIN_TIME}
                        value={timerConfig.shortBreak}
                        onChange={(e) =>
                            setTimerConfig({
                                ...timerConfig,
                                shortBreak: Number(e.target.value),
                            })
                        }
                    />
                </label>
                <label>
                    Long Break
                    <input
                        type="number"
                        name="longBreak"
                        max={MAX_TIME}
                        min={MIN_TIME}
                        value={timerConfig.longBreak}
                        onChange={(e) =>
                            setTimerConfig({
                                ...timerConfig,
                                longBreak: Number(e.target.value),
                            })
                        }
                    />
                </label>
                <label>
                    Long Break Interval
                    <input
                        type="number"
                        name="longBreakInterval"
                        max={MAX_INTERVAL}
                        min={MIN_INTERVAL}
                        value={timerConfig.interval}
                        onChange={(e) =>
                            setTimerConfig({
                                ...timerConfig,
                                interval: Number(e.target.value),
                            })
                        }
                    />
                </label>
            </div>
            <div className="cta__group">
                <button className="button" type="button" onClick={onClose}>
                    Cancel
                </button>
                <button className="button" type="button" onClick={handleSave}>
                    Save
                </button>
            </div>
        </dialog>
    )
}
