import React from "react";
import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostBody,
    }
}

const MyPostsContainer = connect(mapStateToProps, {
    addPost: actions.addPost
})(MyPosts)

export default MyPostsContainer;