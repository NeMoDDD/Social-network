import './App.css';
import Nav from "./components/Navbar/Nav";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {withRouter} from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializedApp} from "./redux/app-reducer";
import React, {lazy, Suspense} from "react";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {getUsersStatus, setUsersProfile} from "./redux/profile-reducer";
import Home from "./components/Home/Home";
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'))
const Login = lazy(() => import('./components/Login/Login'))
const ContactContainer = lazy(() => import('./components/Contact/ContactContainer'))

class App extends React.Component {
    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="App">
                <div className="main">
                    <HeaderContainer/>
                    <Nav/>
                    <div className="content">
                        <Suspense fallback={<div><Preloader/></div>}>
                            <Routes>
                                <Route path='*' element={<Home/>}/>
                                <Route path='/profile' element={<ProfileContainer/>}>
                                    <Route path=":userId" element={<ProfileContainer/>}/>
                                </Route>
                                <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                                <Route path="/contact" element={<ContactContainer/>}/>
                                <Route path="/users" element={<UsersContainer/>}/>
                                <Route path="/login" element={<Login/>}/>
                            </Routes>
                        </Suspense>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializedApp}))(App);

const SamuraiJsApp = (props) => {
    return <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
}

export default SamuraiJsApp;