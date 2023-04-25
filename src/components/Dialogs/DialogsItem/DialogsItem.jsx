import s from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";


const DialogsItem = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={"/dialogs/" + props.id}  className={navData => navData.isActive ? s.active : s.item}>{props.name}</NavLink>
        </div>
    )
}

export default DialogsItem;
