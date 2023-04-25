import s from "./User.module.css"
import React from "react"
import userPhoto from "../../assets/images/user-photos.png"
import {NavLink} from "react-router-dom";
const User = ({user, followingInProgress, unfollow, follow}) => {

    return (
        <div>
            <div>
                <div>
                    <NavLink to={"/profile/" + user.id}>
                        {user.photos.small !== null ?
                            <img className={s.img} src={user.photos.small} alt={"userPhoto"}/>
                            : <img className={s.img} src={userPhoto} alt={"userPhoto"}/>}
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}>Follow</button>}
                </div>
                <div>{user.name}</div>
                <div>{user.status}</div>
                {/*<div>{user.location.country}, {user.location.city}</div>*/}
            </div>
        </div>
)
}

export default User;