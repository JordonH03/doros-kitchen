import { useTimer } from "@/util/timer/TimerContext"
import type { ModalProps } from "@/util/types"
import { useEffect, useRef } from "react"
import SettingsField from "./settingsField"
import { MAX_TIME, MIN_TIME, MAX_INTERVAL, MIN_INTERVAL } from "@/util/constants"
import { Cross1Icon } from "@radix-ui/react-icons"

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
        <dialog className="settings-dialog" ref={modalRef}>
            <div className="settings-dialog__content">
                <div className="settings-dialog__header">
                    <button className="settings-dialog__header-side-element button-icon" type="button" onClick={onClose}><Cross1Icon/></button>
                    <h2 className="settings-dialog__header-title prevent-select">Settings</h2>
                    <span className="settings-dialog__header-side-element"/>
                </div>
                <div className="settings-dialog__body">
                    <form className="settings-dialog__form" ref={formRef}>
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
                </div>
                <div className="settings-dialog__footer">
                    <button
                        className="button button__variant__white button__size__xl button__settings settings-dialog__footer-cancel-button"
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
            </div>
        </dialog>
    )
}
