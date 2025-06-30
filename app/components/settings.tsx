import { MAX_INTERVAL, MAX_TIME, MIN_INTERVAL, MIN_TIME } from "@/util/constants"
import { useTimer } from "@/util/timer/TimerContext"
import type { ModalProps } from "@/util/types"
import { useEffect, useRef } from "react"

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
        modalElement.addEventListener('close', handleClose)
        return () => {
            modalElement.removeEventListener('close', handleClose)
        }
    }, [onClose])

    const handleSave = () => {
        const form = formRef.current as HTMLFormElement | null;
        if (!form) return;
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        } 

        dispatch({"type": "RESET_TIMER"})
        const formData = new FormData(form);
        
        dispatch({
            type: "UPDATE_TIMER",
            payload: {
                pomodoro: Number(formData.get('pomodoro')), 
                shortBreak: Number(formData.get('shortBreak')), 
                longBreak: Number(formData.get('longBreak')), 
                interval: Number(formData.get('interval')) 
            }
        });

        onClose()
    }

    return (
        <dialog id="settings-modal" className="modal" ref={modalRef}>
            <h2>Settings</h2>
            <form className="settings-form" ref={formRef}>
                <label>
                    Pomodoro
                    <input
                        name="pomodoro"
                        required
                        type="number"
                        max={MAX_TIME}
                        min={MIN_TIME}
                        defaultValue={state.pomodoro}
                    />
                </label>
                <label>
                    Short Break
                    <input
                        name="shortBreak"
                        required
                        type="number"
                        max={MAX_TIME}
                        min={MIN_TIME}
                        defaultValue={state.shortBreak}
                    />
                </label>
                <label>
                    Long Break
                    <input
                        name="longBreak"
                        required
                        type="number"
                        max={MAX_TIME}
                        min={MIN_TIME}
                        defaultValue={state.longBreak}
                    />
                </label>
                <label>
                    Long Break Interval
                    <input
                        required
                        name="interval"
                        type="number"
                        max={MAX_INTERVAL}
                        min={MIN_INTERVAL}
                        defaultValue={state.interval}
                    />
                </label>
                <div className="cta__group">
                    <input className="button cta__button" type="button" value="Cancel" onClick={onClose} />
                    <input className="button cta__button" type="button" value="Save" onClick={handleSave} />
                </div>
            </form>
        </dialog>
    )
}
