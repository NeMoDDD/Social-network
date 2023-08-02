import preloader from "../../../assets/images/loading.gif"
import React from "react";

const Preloader:React.FC = () => {
    return (
        <div>
            <img src={preloader}/>
        </div>
    )
}

export default Preloader