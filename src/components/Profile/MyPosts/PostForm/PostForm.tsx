import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../../common/FormsControls/FormsControls";
import {required} from "../../../../utils/validators/validators";
import React from "react";

type PropsType = {}

export type AddPostFormValuesType = {
    newPostBody: string
}
type PostFormValuesKeys = GetStringKeys<AddPostFormValuesType>
const addPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<PostFormValuesKeys>("Ваш пост", "newPostBody", [required], Textarea)}
            <button>Отправить</button>
        </form>
    )
}
export const AddPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: "addPostForm"})(addPostForm)