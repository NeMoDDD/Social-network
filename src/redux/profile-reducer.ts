import {PhotosType, PostsType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {usersAPI} from "../Api/users-apiI";
import {profileAPI} from "../Api/profile-api";
import {ResultCodesEnum} from "../Api/api";

const ADD_POST = "ADD_POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_USER_STATUS = "SET_USER_STATUS"
const SET_PHOTO = "SET_PHOTO"

let initialState = {
    posts: [
        {id: 1, message: "Post 1", likescount: 44},
        {id: 2, message: "Post 2", likescount: 24},
        {id: 3, message: "Post 3", likescount: 56},
        {id: 4, message: "Post 4", likescount: 1},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: null,
    newPostBody: ""
}
type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5, message: action.newPostBody, likescount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostBody: "",
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile,
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case SET_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photo} as ProfileType
            }
        default:
            return {...state}
    }
}
type ActionsType = AddPostActionCreatorType | SetUserProfileType | SetUserStatusType | SetPhotoSuccessType

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostBody: string
}
export const addPostActionCreator = (newPostBody:string): AddPostActionCreatorType => ({type: ADD_POST, newPostBody})
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType):SetUserProfileType => ({type: SET_USER_PROFILE, profile})
type SetUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string | null
}
export const setUserStatus = (status: string | null):SetUserStatusType => ({type: SET_USER_STATUS, status})
type SetPhotoSuccessType = {
    type: typeof SET_PHOTO
    photo: PhotosType
}
export const setPhotoSuccess = (photo:PhotosType):SetPhotoSuccessType => ({type: SET_PHOTO, photo})

type ThunkType = ThunkAction<Promise<any>, AppStateType, unknown, ActionsType>

export const setUsersProfile = (userId:number):ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data))
    }
}
export const getUsersStatus = (userId:number):ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(setUserStatus(data))
    }
}
export const updateUsersStatus = (status:string | null):ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(setUserStatus(status))
        }
    }
}
export const savePhoto = (photo: File):ThunkType => {
    return async (dispatch) => {
        let data= await profileAPI.savePhoto(photo)
        if (data.resultCode === ResultCodesEnum.Success) {
            console.log(data.data.photos)
            dispatch(setPhotoSuccess(data.data.photos))
        }
    }
}

export default profileReducer;