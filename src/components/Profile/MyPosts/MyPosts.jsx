import s from "./MyPosts.module.css"
import Post from "../Post/Post";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {required} from "../../../utils/validators/validators";

const MyPosts = React.memo(props => {
    let postsElements = props.posts.map((p, index) => <Post message={p.message} likescount= {p.likescount} key={index}/>)
    let addPost = (values) => {
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
})

const addPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newPostBody" validate={[required]}/>
            <button>Отправить</button>
        </form>
    )
}
const AddPostFormRedux = reduxForm({form: "addPostForm"})(addPostForm)
export default MyPosts;