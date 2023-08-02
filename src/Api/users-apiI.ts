import {APIResponseType, GetItemsType, instance} from "./api";

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string="") {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`).then(response => response.data)
    },

    followToUsers(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`,).then(response => response.data)
    },
    unFollowToUsers(id: number) {
        return instance.delete(`follow/${id}`,).then(response => response.data) as Promise<APIResponseType>
    }
}