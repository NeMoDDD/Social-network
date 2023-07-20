import s from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";
import React from "react";

type PropsType = {
    id: number | null
    name: string | null
}
const DialogsItem:React.FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={"/dialogs/" + props.id}  className={navData => navData.isActive ? s.active : s.item}>{props.name}</NavLink>
        </div>
    )
}

export default DialogsItem;
