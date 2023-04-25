import ProfileStatus from "../ProfileStatus";
import Preloader from "../../common/Preloader/Preloader";

const ProfileInfo = ({profile, status, updateUsersStatus}) => {
    // if (!profile) {
    //     return <Preloader/>
    // }
    return (
        <div>
            <ProfileStatus status={status} updateUsersStatus={updateUsersStatus}/>

        </div>
    )

}

export default ProfileInfo