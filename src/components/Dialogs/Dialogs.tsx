import s from "./Dialogs.module.css"
import DialogsItem from "./DialogsItem/DialogsItem";
import Message from "./Message/Message";
import React from "react";
import {InitialStateType} from "../../redux/dialogs-reducer";
import {AddDialogsFormRedux, SendMessageFormRedux} from "./FormCreator/FormCreator";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessageBody: string) => void
    addDialogs: (newDialogsBody: string) => void
}

export type DialogsNewFormType = {
    newMessageBody: string
    newDialogsBody: string
}

const Dialogs:React.FC<PropsType> = (props) => {
    let state = props.dialogsPage

    let dialogsElements = state.dialogs
        .map((d, index) => <DialogsItem name={d.name} id={d.id} key={index}/>);


    let messagesElements = state.messages
        .map((m, index) => <Message message={m.message} key={index}/>)

    let addDialogs = (values: {newDialogsBody: string}) => {
        props.addDialogs(values.newDialogsBody);
    }
    let sendMessage = (values: {newMessageBody: string}) => {
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


export default Dialogs;
