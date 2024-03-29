import {ResultCodesEnum} from "../Api/api";
import {updateObjectInArray} from "../utils/helpers/object-helpers";
import {UsersType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../Api/users-apiI";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    userId: 0 as number,
    filter: {
        term: ""
    }
}
const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'SET_USERS':
            return {...state, users: [...action.users]}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET_TOTAL_COUNT':
            return {...state, totalUsersCount: action.totalCount}
        case 'SET_FILTER':
            return {...state, filter: action.payload}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'FOLLOWING_IN_PROGRESS':
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
            }
        default:
            return {...state}
    }
}
export const actions = {
    followSucces: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSucces: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (term: string) => ({type: 'SET_FILTER', payload: {term}} as const),
    setTotalUsersCount: (totalCount: number) => ({type: 'SET_TOTAL_COUNT', totalCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
        type: 'FOLLOWING_IN_PROGRESS',
        isFetching,
        userId
    } as const),
}
export const requestsUsers = (currentPage: number, pageSize: number, term: string):ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(term))
        dispatch(actions.toggleIsFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize, term)
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
        dispatch(actions.toggleIsFetching(false))
    }
}
const _followUnfollowFlow = async (apiMethod: any, userId: number, dispatch:Dispatch<ActionsType>, actionCreator: (userId:number) => ActionsType) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingInProgress(false, userId))
}
export const unfollow = (userId: number):ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(usersAPI.unFollowToUsers, userId, dispatch, actions.unfollowSucces)
    }
}

export const follow = (userId: number):ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(usersAPI.followToUsers, userId, dispatch, actions.followSucces)
    }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default usersReducer;