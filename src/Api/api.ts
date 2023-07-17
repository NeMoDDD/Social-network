import axios from "axios";
import {UsersType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": '291f6809-1bd0-4a8f-b53b-310c85b50fe5'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'

})
export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}


export enum ResultCodesEnum {
    Success = 0,
    Error = 1,

}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}