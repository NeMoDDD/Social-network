import React from "react";
import Contact from "./Contact";
import {connect} from "react-redux";

class ContactContainer extends React.Component {
    render() {
        return (
            <Contact {...this.props}/>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        socialMedia: state.contactPage.contactPage.socialMedia
    }
}

export default connect(mapStateToProps, null)(ContactContainer)