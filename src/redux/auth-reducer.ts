import {ResultCodesEnum} from "../Api/api";
import {stopSubmit} from "redux-form";
import { BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../Api/auth-api";

let initialState = {
    email: null as string | null,
    login: null as string | null,
    id: null as number | null,
    isAuth: false
}
const authReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'SN/AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        default: {
            return {...state}
        }
    }
}

export const actions = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        {type: 'SN/AUTH/SET_USER_DATA', payload: {id, email, login, isAuth} as const}
    )
}
export const getAuthStatus = ():ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.getAuth()

        if (data.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = data.data
            dispatch(actions.setUserData(id, email, login, true))
        }
    }
}

export const login = (email:string, password:string, rememberMe:boolean):ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthStatus())
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
}

export const logout = ():ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.logout()
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setUserData(null, null, null, false))
        }
    }
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default authReducer;