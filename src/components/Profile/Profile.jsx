import MyPostsContainer from "./MyPosts/MyPostContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";


const Profile = React.memo(props => {

    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status}
                         updateUsersStatus={props.updateUsersStatus}
                         authorizedUserId={props.authorizedUserId}
            />
            <MyPostsContainer store={props.store}/>
        </div>

    )

})

export default Profile;