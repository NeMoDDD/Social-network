const ADD_DIALOGS = "ADD_DIALOGS"
const SEND_MESSAGE = "SEND_MESSAGE"


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
    newMessagesBody: "",
    newDialogsBody: ""
}

type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case ADD_DIALOGS:
            let newDialogs = {
                name: action.newDialogsBody, id: 7
            }
            return {
                ...state,
                dialogs: [...state.dialogs, newDialogs],
                newDialogsBody: ""
            }
        case SEND_MESSAGE:
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
type ActionsType = SendMessageActionCreatorType | AddDialogsActionCreatorType

type SendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE
    newMessagesBody: string
}
export const sendMessageActionCreator = (newMessagesBody: string):SendMessageActionCreatorType => ({type: SEND_MESSAGE, newMessagesBody })
type AddDialogsActionCreatorType = {
    type: typeof ADD_DIALOGS
    newDialogsBody: string
}
export const addDialogsActionCreator = (newDialogsBody: string):AddDialogsActionCreatorType => ({type: ADD_DIALOGS, newDialogsBody})

export default profileReducer;