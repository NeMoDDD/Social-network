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
import {AppStateType} from "../../redux/redux-store";
import {RouteComponentProps} from "react-router";
import {ProfileType} from "../../types/types";


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    setUsersProfile: (profile: ProfileType) => void
    getUsersStatus: (userId: number) => void
    updateUsersStatus: (status: string) => void
    savePhoto: (file: File) => void
}
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

type PathParamsType = {
    userId: number
}
class ProfileContainer extends React.Component<MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>, null> {
    refreshProfile() {
        // todo: Посмотреть router
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
                         profile={this.props.profile as ProfileType}
                         status={this.props.status as string}
                         updateUsersStatus={this.props.updateUsersStatus}
                         authorizedUserId={this.props.authorizedUserId}
                         savePhot={this.props.savePhoto}
                />
            </div>
        )
    }
}


let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth
})
export default compose<React.ComponentType>(
    connect(mapStateToProps, {setUsersProfile, getUsersStatus, updateUsersStatus, savePhoto}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
