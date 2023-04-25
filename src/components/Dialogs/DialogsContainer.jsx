import s from "./Dialogs.module.css"
import React from "react";
import {
    addDialogsActionCreator,
    sendMessageActionCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDialogs: (newDialogsBody) => {dispatch(addDialogsActionCreator(newDialogsBody))},
        sendMessage: (newMessageBody) => {dispatch(sendMessageActionCreator(newMessageBody))},
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs)
