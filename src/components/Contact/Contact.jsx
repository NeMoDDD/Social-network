import SocialMedia from "./SocialMedia/SocialMedia";

const Contact = (props) => {
    let socialMediaSrcElements = props.socialMedia.map((src, index) => <SocialMedia key={index} socialMediaSrc={src.socialMediaSrc} hrefSocialMedia={src.hrefSocialMedia}/>)
    return (
        <div>
            {socialMediaSrcElements}
        </div>
    )
}

export default Contact;