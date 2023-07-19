import {BaseThunkType, InferActionsTypes} from "./redux-store";

type DialogsType = {
    name: string
    id: number
}
type MessagesType = {
    message: string
    id: number
}
let initialState = {
    dialogs: [
        { name: "User1", id: 1},
        { name: "User2", id: 2},
        { name: "User3", id: 3},
        { name: "User4", id: 4},
        { name: "User5", id: 5},
        { name: "User6", id: 6},
    ] as Array<DialogsType>,
    messages: [
        { message: "Hello", id: 1,},
        { message: "Hi", id: 2},
        { message: "By", id: 3},
        { message: "Blabla", id: 4},
        { message: "Thanks", id: 5},
        { message: "Beka", id: 6}
    ] as Array<MessagesType>,
    newMessagesBody: "" as string | null,
    newDialogsBody: "" as string | null
}

const profileReducer = (state = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/ADD_DIALOGS':
            let newDialogs = {
                name: action.newDialogsBody, id: 7
            }
            return {
                ...state,
                dialogs: [...state.dialogs, newDialogs],
                newDialogsBody: ""
            }
        case 'SN/DIALOGS/SEND_MESSAGE':
            let newMessages = {
                message: action.newMessagesBody, id: 6
            }
            return {
                ...state,
                messages: [...state.messages, newMessages],
                newMessagesBody: ""
            }
        default: {
            return {...state}
        }
    }
}

export const actions = {
    sendMessageActionCreator: (newMessagesBody: string) => ({type: 'SN/DIALOGS/SEND_MESSAGE', newMessagesBody} as const),
    addDialogsActionCreator: (newDialogsBody: string) => ({type: 'SN/DIALOGS/ADD_DIALOGS', newDialogsBody} as const)
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
export default profileReducer;