import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
} as MapPropsType
)
type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}
export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Navigate to="/login"/>
        return (
            <WrappedComponent {...restProps as WCP}/>
        )
    }

    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsRedirect, {})
    (RedirectComponent)

    return ConnectedAuthRedirectComponent
}

