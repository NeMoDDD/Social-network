import ProfileStatus from "../ProfileStatus";
import {ProfileType} from "../../../types/types";
import React, {ChangeEvent} from "react";

type PropsType = {
    profile: ProfileType
    status: string
    updateUsersStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
}
const ProfileInfo: React.FC<PropsType> = ({profile, status, updateUsersStatus, isOwner, savePhoto}) => {
    // if (!profile) {
    //     return <Preloader/>
    // }
    const onMainPhotosSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files.length) {
            savePhoto(e.target?.files[0])
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