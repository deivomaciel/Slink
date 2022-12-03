import React, { useState } from "react";
import Menu from "../menu/Menu";
import Logo from "../../assets/logo.png"
import { BiUser } from "react-icons/bi"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import "./styles.css"

function Header() {
    let [state, setState] = useState(false)

    return (
        <header>
            <div className="logo-div">
                <img src={Logo} alt="Slink Logo" />
            </div>
            <div className="user-div" onClick={() => setState(state = !state)}>
                <div className="user">
                    <BiUser />
                </div>
                <div className="arrow">
                    <MdOutlineKeyboardArrowDown />
                </div>  
                {state && <Menu />}
            </div>
        </header>
    )
}

export default Header