import {ResultCodesEnum, usersAPI} from "../Api/api";
import {updateObjectInArray} from "../utils/helpers/object-helpers";
import {UsersType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";

const SET_USERS = "SET_USERS"
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const FOLLOWING_IN_PROGRESS = "FOLLOWING_IN_PROGRESS"

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    userId: 0 as number
}
type InitialStateType = typeof initialState
const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }


        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {...state, users: [...action.users]}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case FOLLOWING_IN_PROGRESS:
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
            }
        default:
            return {...state}
    }
}
type ActionsType = FollowSuccesType | UnfollowSuccesType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType |
    ToggleIsFetchingType | ToggleFollowingInProgressType

type FollowSuccesType = {
    type: typeof FOLLOW
    userId: number
}
export const followSucces = (userId: number): FollowSuccesType => ({type: FOLLOW, userId})
type UnfollowSuccesType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSucces = (userId: number): UnfollowSuccesType => ({type: UNFOLLOW, userId})
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersType => ({type: SET_USERS, users})
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_COUNT, totalCount})
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})
type ToggleFollowingInProgressType = {
    type: typeof FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingInProgress = (isFetching: boolean, userId: number): ToggleFollowingInProgressType => ({
    type: FOLLOWING_IN_PROGRESS,
    isFetching,
    userId
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const requestsUsers = (currentPage: number, pageSize: number):ThunkType => {
    return async (dispatch) => {
        dispatch(setCurrentPage(currentPage))
        dispatch(toggleIsFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(toggleIsFetching(false))
    }
}
const _followUnfollowFlow = async (apiMethod: any, userId: number, dispatch:Dispatch<ActionsType>, actionCreator: (userId:number) => FollowSuccesType | UnfollowSuccesType) => {
    dispatch(toggleFollowingInProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
}
export const unfollow = (userId: number):ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(usersAPI.unFollowToUsers, userId, dispatch, unfollowSucces)
    }
}

export const follow = (userId: number):ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(usersAPI.followToUsers, userId, dispatch, followSucces)
    }
}

export default usersReducer;