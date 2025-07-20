import { MAX_INTERVAL, MAX_TIME, MIN_INTERVAL, MIN_TIME } from "@/util/constants"
import { useTimer } from "@/util/timer/TimerContext"
import type { ModalProps } from "@/util/types"
import { useEffect, useRef } from "react"
import SettingsField from "./settingsField"

export default function Settings({ isOpen, onClose }: ModalProps) {
    const { state, dispatch } = useTimer()
    const modalRef = useRef<HTMLDialogElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

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
        modalElement.addEventListener("close", handleClose)
        return () => {
            modalElement.removeEventListener("close", handleClose)
        }
    }, [onClose])

    const handleSave = () => {
        const form = formRef.current as HTMLFormElement | null
        if (!form) return

        if (!form.checkValidity()) {
            form.reportValidity()
            return
        }

        dispatch({ type: "RESET_TIMER" })
        const formData = new FormData(form)

        dispatch({
            type: "UPDATE_TIMER",
            payload: {
                pomodoro: Number(formData.get("pomodoro")),
                shortBreak: Number(formData.get("shortBreak")),
                longBreak: Number(formData.get("longBreak")),
                interval: Number(formData.get("interval")),
            },
        })

        onClose()
    }

    return (
        <dialog id="settings-modal" className="settings-modal" ref={modalRef}>
            <h2 className="form-heading">Settings</h2>
            <form className="settings-form" ref={formRef}>
                <SettingsField
                    labelText="Pomodoro"
                    fieldName="pomodoro"
                    max={MAX_TIME}
                    min={MIN_TIME}
                    defaultValue={state.pomodoro}
                />
                <SettingsField
                    labelText="Short Break"
                    fieldName="shortBreak"
                    max={MAX_TIME}
                    min={MIN_TIME}
                    defaultValue={state.shortBreak}
                />
                <SettingsField
                    labelText="Long Break"
                    fieldName="longBreak"
                    max={MAX_TIME}
                    min={MIN_TIME}
                    defaultValue={state.longBreak}
                />
                <SettingsField
                    labelText="Long Break Interval"
                    fieldName="interval"
                    max={MAX_INTERVAL}
                    min={MIN_INTERVAL}
                    defaultValue={state.interval}
                />
            </form>
            <div className="cta__group">
                <button
                    className="button button__variant__white button__size__xl button__settings button-cancel"
                    type="button"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className="button button__variant__cta button__size__xl button__settings"
                    type="button"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </dialog>
    )
}
