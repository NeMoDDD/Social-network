import Header, {PropsType} from "./Header";
import React from "react";
import { logout} from "../../redux/auth-reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<PropsType, null> {
    render() {
        return (
            <Header {...this.props}/>
        )
    }
}
let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect<PropsType, PropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer)

