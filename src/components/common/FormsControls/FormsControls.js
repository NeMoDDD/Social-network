import styles from "./FormControls.module.css"
import {Field} from "redux-form";

export const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={hasError ? styles.error : ''}>
            {children}
            {
                hasError ? <span>{hasError}</span> : ""
            }
        </div>
    )
}
export const Textarea = (props) => {
    const {input, meta, child, ...resetProps} = props
    return <FormControl {...props}><textarea {...input} {...resetProps}/></FormControl>
}
export const Input = (props) => {
    const {input, meta, child, ...resetProps} = props
    return <FormControl {...props}><input {...input} {...resetProps}/></FormControl>
}

export const createField = (placeholder, name, validators, component, props, text) => (
    <div>
        <Field placeholder={placeholder} component={component} name={name} validate={validators} {...props}/> {text}
    </div>
)
