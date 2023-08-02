import s from "./Header.module.css"
import {NavLink} from "react-router-dom";

export type PropsType = {
    isAuth: boolean
    login: string
    logout: () => void
}
const Header:React.FC<PropsType> = (props) => {
	return <header className={s.header}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png" alt=""/>
                <div className={s.loginBlock}>
                    { props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={"/login"}>Login</NavLink>}
                </div>
            </header>
};

export default Header;


