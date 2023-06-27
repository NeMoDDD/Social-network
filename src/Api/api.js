import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": '291f6809-1bd0-4a8f-b53b-310c85b50fe5'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'

})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },

    followToUsers(id) {
        return instance.post(`follow/${id}`,).then(response => response.data)
    },
    unFollowToUsers(id) {
        return instance.delete(`follow/${id}`,).then(response => response.data)
    },

    getProfile(userId) {
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId).then(response => response.data)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status})
    },
    savePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`).then(response => response.data)
    },
    login(email, password, rememberMe = false) {
        return instance.post("auth/login", {email, password, rememberMe}).then(response => response.data)
    },
    logout() {
        return instance.delete("auth/login").then(response => response.data)
    }
}
