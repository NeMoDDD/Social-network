import s from "./SocialMedia.module.css"
import React from "react";

type PropsType = {
    hrefSocialMedia: string
    socialMediaSrc: string
}
const socialMedia: React.FC<PropsType> = (props) => {
    return (
        <div>
            <a href={props.hrefSocialMedia}><img className={s.logo} src={props.socialMediaSrc}/></a>
        </div>
    )
}

export default socialMedia;