import s from "./Dialogs.module.css"
import React from "react";
import {
    actions
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
export default compose<React.ComponentType>(connect(mapStateToProps, {
    sendMessage: actions.sendMessage,
    addDialogs: actions.addDialogs
}), withAuthRedirect)(Dialogs)
