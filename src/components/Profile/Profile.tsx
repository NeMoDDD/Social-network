import MyPostsContainer from "./MyPosts/MyPostContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType
    status: string
    updateUsersStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}
const Profile: React.FC<PropsType> = props => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status}
                         updateUsersStatus={props.updateUsersStatus}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
            />
            <MyPostsContainer/>
        </div>

    )

}
const ProfileMemorized = React.memo(Profile)
export default ProfileMemorized;