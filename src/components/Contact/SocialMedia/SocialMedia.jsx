import s from "./SocialMedia.module.css"
const socialMedia = (props) => {
    return (
        <div>
            <a href={props.hrefSocialMedia}><img className={s.logo} src={props.socialMediaSrc}/></a>
        </div>
    )
}

export default socialMedia;