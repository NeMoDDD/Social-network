import React from "react"
import Profile from "./Profile"
import {connect} from "react-redux";
import {getUsersStatus, savePhoto, setUsersProfile, updateUsersStatus} from "../../redux/profile-reducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.router.params.userId
        if (userId === undefined) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.setUsersProfile(userId)
        this.props.getUsersStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile isOwner={!this.props.router.params.userId}
                        {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateUsersStatus={this.props.updateUsersStatus}
                         authorizedUserId={this.props.authorizedUserId}
                         savePhot={this.props.savePhoto}
                />
            </div>
        )
    }
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})
export default compose(
    connect(mapStateToProps, {setUsersProfile, getUsersStatus, updateUsersStatus, savePhoto}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
