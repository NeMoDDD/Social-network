import ProfileStatus from "../ProfileStatus";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user-photos.png"
import style from "./ProfileInfo.module.css"

const ProfileInfo = ({profile, status, updateUsersStatus, isOwner, savePhoto}) => {
    // if (!profile) {
    //     return <Preloader/>
    // }
    const onMainPhotosSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    return (
        <div>
            {/*<img src={profile.photos.large || userPhoto} className={style.mainPhoto}/>*/}
            {isOwner && <input type="file" onChange={onMainPhotosSelected}/>}
            <ProfileStatus status={status} updateUsersStatus={updateUsersStatus}/>
        </div>
    )

}

export default ProfileInfo