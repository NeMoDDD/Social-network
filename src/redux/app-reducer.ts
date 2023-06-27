import {getAuthStatus} from "./auth-reducer"

const SET_INITIALIZED_SUCCESS = "SET_INITIALIZED_SUCCESS"

let initialState = {
    initialized: false
}
type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: any):InitialStateType => {
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
type InitializedSuccessActionType = {
    type: typeof SET_INITIALIZED_SUCCESS
}
export const initializedSuccess = ():InitializedSuccessActionType => ({type: SET_INITIALIZED_SUCCESS})
export const initializedApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthStatus())
    Promise.all([promise])
        .then( () => {
            dispatch(initializedSuccess())
        })
}
export default appReducer;