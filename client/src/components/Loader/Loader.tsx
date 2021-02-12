import React from "react";
import logo from './../../assets/img/logo.png'
import s from './Loader.module.scss'

const Loader = () => {
    return(
        <div className={s.loaderContainer}>
            <img src={logo} className={s.loaderImage}/>
        </div>
    )
}

export default Loader