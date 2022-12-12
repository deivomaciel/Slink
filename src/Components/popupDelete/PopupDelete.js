import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"
import { connect } from "react-redux";
import "./styles.css"
import { useState } from "react";
import Loader from "../loader/Loader";

function PopupDelete({ modules, dispatch }) {
    let [loadFlag, setLoadFlag] = useState(false) 
    const linkIcon = `https://www.google.com/s2/favicons?domain=${modules.link}`
    const hidePopUp = popUp => {
        return {
            type: 'SHOW_DELET_POP_UP',
            popUp
        }
    }

    const removeLocalCard = id => {
        return {
            type: "DELET_CARD" ,
            id
        }
    }
    
    const deleteCard = async () => {
        dispatch(removeLocalCard(modules.id))
        const uid = JSON.parse(localStorage.userInfo).uid
        try {
            setLoadFlag(true)
            await deleteDoc(doc(db, `users/${uid}/cards`, modules.id))
            setLoadFlag(false)

        } catch (error) {
            console.log('Não foi possível concluir a solicitação')
        }
        dispatch(hidePopUp(false))
    }

    return (
        <div className="pop-up">
            <div className="pop-up-container-delete">
                <h1>Deseja excluir este card?</h1>
                <div className="card-info-container">
                    <img className="icon" src={linkIcon} title={modules.title} height="24" width="24"/>
                    <h1>{modules.title}</h1>
                </div>
                <div className="button-container-delete">
                    <button className="delete-btn" onClick={() => deleteCard()}>
                        {!loadFlag ? 'Excluir' : (
                            <Loader
                                width='24'
                                height='24'
                                color='#fff'
                            />
                        )}
                    </button>

                    <button className="cancel-btn" onClick={() => dispatch(hidePopUp(false))}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default connect(state => ({ modules: state.confirmDelete }))(PopupDelete)