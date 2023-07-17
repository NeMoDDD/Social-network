import {ResultCodesEnum} from "../Api/api";

export type PostsType = {
    id: number
    message: string
    likescount: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    aboutMe: string | null
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullname: string
    contacts: ContactsType
    photos: PhotosType
}

export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

// export type PutResponseType = {
//     resultCode: ResultCodesEnum
//     messages: Array<string>
//     data: {}
// }