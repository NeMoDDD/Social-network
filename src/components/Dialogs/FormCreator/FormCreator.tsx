import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";
import {DialogsNewFormType} from "../Dialogs";

type DialogsNewFormValuesKeysType = Extract<keyof DialogsNewFormType, string>

const maxLength50 = maxLengthCreator(50)
type PropsType = {}
const sendMessageForm:React.FC<InjectedFormProps<DialogsNewFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<DialogsNewFormValuesKeysType>("Enter a message", "newMessageBody", [required, maxLength50], Textarea)}
            <button>Отправить</button>
        </form>
    )
}

export const SendMessageFormRedux = reduxForm<DialogsNewFormValuesKeysType>({form: "sendMessageForm"})(sendMessageForm)

const maxLength15 = maxLengthCreator(15)
const addDialogsForm:React.FC<InjectedFormProps<DialogsNewFormType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<DialogsNewFormValuesKeysType>("Enter a dialogs", "newDialogsBody", [required, maxLength15], Input)}
            <button>Добавить</button>
        </form>
    )
}

export const AddDialogsFormRedux  = reduxForm<DialogsNewFormValuesKeysType>({form: "addDialogsForm"})(addDialogsForm)