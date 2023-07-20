import SocialMedia from "./SocialMedia/SocialMedia";
import {SocialMediaType} from "./ContactContainer";
import React from "react";

type PropsType = {
    socialMedia: Array<SocialMediaType>
}
const Contact: React.FC<PropsType> = (props) => {
    let socialMediaSrcElements = props.socialMedia.map((src, index) => <SocialMedia key={index}
                                                                                    socialMediaSrc={src.socialMediaSrc}
                                                                                    hrefSocialMedia={src.hrefSocialMedia}/>)
    return (
        <div>
            {socialMediaSrcElements}
        </div>
    )
}

export default Contact;