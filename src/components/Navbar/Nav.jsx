import s from "./Nav.module.css"
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <nav className={s.nav}>
            <div><NavLink to="/home" className={navData => navData.isActive ? s.active : s.item}>Home</NavLink></div>
            <div><NavLink to="/profile" className={navData => navData.isActive ? s.active : s.item}>Profile</NavLink>
            </div>
            <div><NavLink to="/dialogs" className={navData => navData.isActive ? s.active : s.item}>Message</NavLink>
            </div>
            <div><NavLink to="/contact" className={navData => navData.isActive ? s.active : s.item}>Contact</NavLink></div>
            <div><NavLink to="/about" className={navData => navData.isActive ? s.active : s.item}>About</NavLink></div>
            <div><NavLink to="/users" className={navData => navData.isActive ? s.active : s.item}>Users</NavLink></div>
        </nav>)
};

export default Nav;