import ProfileStatus from "../ProfileStatus";
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
            {/*<button onClick={() => console.log(profile.photos.large)}></button>*/}
            {/*<img src={profile.photos.large || userPhoto} className={style.mainPhoto} alt="ava"/>*/}
            {isOwner && <input type="file" onChange={onMainPhotosSelected}/>}
            <ProfileStatus status={status} updateUsersStatus={updateUsersStatus}/>
        </div>
    )

}

export default ProfileInfo