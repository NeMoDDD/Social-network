import React from "react";
import Contact from "./Contact";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

class ContactContainer extends React.Component<MapPropsType, OwnPropsType> {
    render() {
        return (
            <Contact {...this.props}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        socialMedia: state.contactPage.contactPage.socialMedia
    }
}
export type SocialMediaType = {
    socialMediaSrc: string
    hrefSocialMedia: string
}
type MapPropsType = {
    socialMedia: Array<SocialMediaType>
}
type OwnPropsType = {}
export default connect(mapStateToProps, null)(ContactContainer) as React.ComponentType