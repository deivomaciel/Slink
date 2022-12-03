import React from "react";
import { FiSettings, FiLogOut } from "react-icons/fi"
import { MdOutlineLightMode } from "react-icons/md"
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import "./styles.css"

function Menu() {
    const userInfo = JSON.parse(localStorage.userInfo)
    let success = false
    const [signOut, loading, error] = useSignOut(auth)

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
                <span>
                    <p>T</p>
                </span>
                <p>{userInfo.email}</p>
            </div>
                <button>
                    <span>
                        <FiSettings />
                    </span>
                    Configurações
                </button>
                <button>
                    <span>
                        <MdOutlineLightMode />
                    </span>
                    Tema
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

export default Menu
