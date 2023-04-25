import s from "./Dialogs.module.css"
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Input, Textarea} from "../common/FormsControls/FormsControls";

const Dialogs = (props) => {

    let dialogsElements = props.dialogs
        .map((d, index) => <DialogsItem name={d.name} id={d.id} key={index}/>);


    let messagesElements = props.messages
        .map((m, index) => <Message message={m.message} key={index}/>)

    let addDialogs = (values) => {
        props.addDialogs(values.newDialogsBody);
    }
    let sendMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }
    return (
        <div>
            <AddDialogsFormRedux onSubmit={addDialogs}/>
            <div className={s.dialogs}>
                <div className={s.dialogsItem}>
                    {dialogsElements}
                </div>
                <div className={s.messages}>
                    <div>{messagesElements}</div>
                    <SendMessageFormRedux onSubmit={sendMessage}/>
                </div>
            </div>
        </div>
    )
}
const maxLength50 = maxLengthCreator(50)
const sendMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder="Enter a message" component={Textarea} name="newMessageBody"
                   validate={[required, maxLength50]}
            />
            <button>Отправить</button>
        </form>
    )
}

const SendMessageFormRedux = reduxForm({form: "sendMessageForm"})(sendMessageForm)

const maxLength15 = maxLengthCreator(15)
const addDialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Input} name="newDialogsBody" validate={[required, maxLength15]}/>
            <button>Добавить</button>
        </form>
    )
}

const AddDialogsFormRedux  = reduxForm({form: "addDialogsForm"})(addDialogsForm)

export default Dialogs;
