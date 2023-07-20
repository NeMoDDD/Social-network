import {getAuthStatus} from "./auth-reducer"
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_INITIALIZED_SUCCESS = "SET_INITIALIZED_SUCCESS"

let initialState = {
    initialized: false
}
type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default: {
            return {...state}
        }
    }
}
type ActionsType = InitializedSuccessActionType
type InitializedSuccessActionType = {
    type: typeof SET_INITIALIZED_SUCCESS
}
export const initializedSuccess = ():InitializedSuccessActionType => ({type: SET_INITIALIZED_SUCCESS})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

// Надо вернуться
export const initializedApp = () => (dispatch) => {
    let promise = dispatch(getAuthStatus())
    Promise.all([promise])
        .then( () => {
            dispatch(initializedSuccess())
        })
}
export default appReducer;