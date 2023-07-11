import styles from "./FormControls.module.css"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidatorType} from "../../../utils/validators/validators";
import React from "react";
import {LoginFormValuesType} from "../../Login/Login";

type FormControlPropsType = {
    meta: {
        touched: boolean,
        error: string
    },
    children: React.ReactNode
}
export const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
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

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props} > <textarea {...input} {...restProps}/>
    </FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props} > <input {...input}
                                            {...
                                                restProps
                                            }
    /></
        FormControl>
}


export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                                         name: FormKeysType,
                                                         validators: Array<FieldValidatorType>,
                                                         component: string | React.Component | React.FC,
                                                         props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder}
               component={component}
               name={name}
               validate={validators}
               {...props}
        /> {text}
    </div>
}