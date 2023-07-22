import {PhotosType, PostsType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../Api/profile-api";
import {ResultCodesEnum} from "../Api/api";

let initialState = {
    posts: [
        {id: 1, message: "Post 1", likescount: 44},
        {id: 2, message: "Post 2", likescount: 24},
        {id: 3, message: "Post 3", likescount: 56},
        {id: 4, message: "Post 4", likescount: 1},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "" as string | null,
}

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD_POST':
            let newPost = {
                id: 5, message: action.newPostBody, likescount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case 'SN/PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile,
            }
        case 'SN/PROFILE/SET_USER_STATUS':
            return {
                ...state,
                status: action.status,
            }
        case 'SN/PROFILE/SET_PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: action.photo} as ProfileType
            }
        default:
            return {...state}
    }
}
export const actions = {
    addPost: (newPostBody:string) => ({type: 'SN/PROFILE/ADD_POST', newPostBody} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setUserStatus: (status: string | null) => ({type: 'SN/PROFILE/SET_USER_STATUS', status} as const),
    setPhotoSuccess: (photo:PhotosType) => ({type: 'SN/PROFILE/SET_PHOTO', photo} as const),
}

export const setUsersProfile = (userId:number):ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data))
    }
}
export const getUsersStatus = (userId:number):ThunkType => {
    return async (dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(actions.setUserStatus(data))
    }
}
export const updateUsersStatus = (status:string | null):ThunkType => {
    return async (dispatch) => {
        if (status != null) {
            let data = await profileAPI.updateStatus(status)
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.setUserStatus(status))
            }
        }
    }
}
export const savePhoto = (photo: File):ThunkType => {
    return async (dispatch) => {
        let data= await profileAPI.savePhoto(photo)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setPhotoSuccess(data.data.photos))
        }
    }
}
type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>


export default profileReducer;