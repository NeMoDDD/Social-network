import React from "react";
import {connect} from "react-redux";
import {
    follow,
    unfollow, requestsUsers, FilterType
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers, getUsersFilter
} from "../../redux/users-selector";
import {UsersType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    isFetching: boolean
    filter: FilterType
}
type MapDispatchToPropsType = {
    getUsers: (currentPage: number, pageSize: number, term: string) => void
    follow: () => void
    unfollow: () => void
    // onPageChanged: (currentPage: number, pageSize: number) => void
}
type OwnPropsType = {

}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType
class UsersContainer extends React.Component<PropsType, null> {
    componentDidMount() {
        let {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize, "")
    }

    onPageChanged = (currentPage: number, pageSize: number) => {
        let {filter} = this.props
        this.props.getUsers(currentPage, pageSize, filter.term)
    }
    onFilterChanged = (filter: FilterType) => {
        let {pageSize} = this.props
        this.props.getUsers(1, pageSize, filter.term)
    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       onFilterChanged={this.onFilterChanged}
                       users={this.props.users}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}
// Errrrrooooor
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        userId: state.usersPage.userId,
        filter: getUsersFilter(state)
    }
}
export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {follow, unfollow, getUsers: requestsUsers}
    ),
    withAuthRedirect
)(UsersContainer)