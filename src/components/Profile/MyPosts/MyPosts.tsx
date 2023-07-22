import s from "./MyPosts.module.css"
import Post from "../Post/Post";
import React from "react";
import {AddPostFormRedux, AddPostFormValuesType} from "./PostForm/PostForm";
import {PostsType} from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostsType>
}
export type DispatchPropsType = {
    addPost: (newPostBody: string) => void
}
const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    let postsElements = props.posts.map((p, index) => <Post message={p.message} likescount={p.likescount} key={index}/>)
    let addPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostBody);
    }

    return (
        <div className={s.myPost}>
            My posts
            <div>
                <AddPostFormRedux onSubmit={addPost}/>
            </div>
            {postsElements}

        </div>
    )
}

const MyPostMemorized = React.memo(MyPosts)
export default MyPostMemorized;