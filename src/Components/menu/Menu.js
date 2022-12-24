import React, { useState } from "react";
import { FiSettings, FiLogOut } from "react-icons/fi"
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md"
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import { connect } from "react-redux";
import "./styles.css"

function Menu({ modules, dispatch }) {
    const [darkTheme, setDarkTheme] = useState(false)
    const userInfo = JSON.parse(localStorage.userInfo)
    const [signOut, loading, error] = useSignOut(auth)
    let success = false

    const logOut = async () => {
        success = await signOut()
        if(success) {
            localStorage.clear()
            window.location.reload()
        }
    }

    return (
        <div className="menu-container">
            <div className="user-email">
                <span></span>
                <p>{userInfo.email}</p>
            </div>
                <button>
                    <span>
                        <FiSettings />
                    </span>
                    Configurações
                </button>
            <div className="line">
                <hr/>
            </div>
            <div className="menu-button-container">
                <button onClick={logOut}>
                    <span>
                        <FiLogOut />
                    </span>
                    Sair
                </button>
            </div>
        </div>
    )
}

export default connect(state => ({ modules: state.theme }))(Menu)

