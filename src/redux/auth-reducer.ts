import {authAPI} from "../Api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = "SET_USER_DATA"

let initialState = {
    email: null as string | null,
    login: null as string | null,
    id: null as number | null,
    isAuth: false
}
type InitialStateType = typeof initialState
const authReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default: {
            return {...state}
        }
    }
}
type ActionsType = SetUserDataActionType

type UserDataActionPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: UserDataActionPayloadType
}
export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean):SetUserDataActionType => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}}
)
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getAuthStatus = ():ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.getAuth()

        if (data.resultCode === 0) {
            let {id, login, email} = data.data
            dispatch(setUserData(id, email, login, true))
        }
    }
}

export const login = (email, password, rememberMe):ThunkType => {
    return async (dispatch) => {
        let data = await authAPI.login(email, password, rememberMe)
        if (data.resultCode === 0) {
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
        if (data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false))
        }
    }
}

export default authReducer;