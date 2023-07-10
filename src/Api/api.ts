import axios from "axios";
import {ContactsType, PhotosType, ProfileType} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": '291f6809-1bd0-4a8f-b53b-310c85b50fe5'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'

})
type GetUsersResponseUserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
type GetUsersResponseType = {
    items: Array<GetUsersResponseUserType>
    totalCount: number
    error: string
}
type FollowUnfollowResponseToUsersType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

export const usersAPI = {
    getUsers(currentPage:number, pageSize:number) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },

    followToUsers(id:number) {
        return instance.post<FollowUnfollowResponseToUsersType>(`follow/${id}`,).then(response => response.data)
    },
    unFollowToUsers(id:number) {
        return instance.delete<FollowUnfollowResponseToUsersType>(`follow/${id}`,).then(response => response.data)
    },

    getProfile(userId:number) {
        return profileAPI.getProfile(userId)
    }
}

type UpdateStatusResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}
type SavePhotoResponseType = {
    data: PhotosType
    resultCode: ResultCodesEnum
    messages: Array<string>
}
export const profileAPI = {
    getProfile(userId:number) {
        return instance.get<ProfileType>(`profile/` + userId).then(response => response.data)
    },
    getStatus(userId:number) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status:string) {
        return instance.put<UpdateStatusResponseType>(`profile/status`, { status: status})
    },
    savePhoto(photo:any) {
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put<SavePhotoResponseType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,

}

type GetAuthResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LogoutResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    getAuth() {
        return instance.get<GetAuthResponseType>(`auth/me`).then(response => response.data)
    },
    login(email:string, password:string, rememberMe:boolean = false) {
        return instance.post<LoginResponseType>("auth/login", {email, password, rememberMe}).then(response => response.data)
    },
    logout() {
        // Вернуться
        return instance.delete<LogoutResponseType>("auth/login").then(response => response.data)
    }
}
