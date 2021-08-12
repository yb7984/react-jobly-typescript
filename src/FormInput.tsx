import { ChangeEventHandler, FC } from "react";

type InputType = "text" | "checkbox" | "color" | "date" | "datetime-local" | "email" |
    "month" | "number" | "password" | "radio" | "range" | "search" | "tel" | "time" | "url" | "week";

interface FormInputProps {
    name: string,
    value?: string,
    handleChange?: ChangeEventHandler,
    title?: string,
    placeholder?: string,
    type?: InputType,
    text?: string,
    minLength?: number,
    errorMsg?: string,
    required?: boolean | undefined,
    readOnly?: boolean | undefined
}

/**
 * Input Form Item Component
 * @param {*} props contains {
 * name field name, use for name and id for the input
 * value value of the input
 * handleChange function for handling value change
 * title Label text for the input
 * placeholder placeholder text for the input
 * type: default value text, can be email, number, date , password , color
 * text: help information for this field
 * minLength: minium length required
 * required: default value is false
 * readOnly: default value is false 
 * } 
 * @returns 
 */
const FormInput: FC<FormInputProps> = ({
    name,
    value,
    handleChange,
    title,
    placeholder,
    type = "text",
    text = "",
    minLength = 0,
    errorMsg = "",
    required = false,
    readOnly = false }: FormInputProps) => {
    return (
        <div className="mb-3">
            <label htmlFor="username" className="form-label">{title}</label>
            <input className="form-control"
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                minLength={minLength}
                required={required}
                readOnly={readOnly}
            />
            <div className="form-text">{text}</div>
            <span className="text-danger">{errorMsg}</span>
        </div>
    );
}

export default FormInput;