import { MAX_TIME, MIN_TIME } from "@/util/constants"

interface ISettingsField {
    labelText: string
    fieldName: string
    max?: number
    min?: number
    defaultValue?: number
}

export default function SettingsField({
    labelText,
    fieldName,
    max = MAX_TIME,
    min = MIN_TIME,
    defaultValue = 0,
}: ISettingsField) {
    return (
        <div className="settings-field">
            <label className="prevent-select" htmlFor={fieldName}>{labelText}</label>
            <input
                name={fieldName}
                required
                max={max}
                min={min}
                defaultValue={defaultValue}
                type="number"
            />
        </div>
    )
}
