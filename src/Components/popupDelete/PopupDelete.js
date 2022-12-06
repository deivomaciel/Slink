import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebaseConfig"
import { connect } from "react-redux";
import "./styles.css"

function PopupDelete({ modules, dispatch }) {
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
        const uid = JSON.parse(localStorage.userInfo).uid
        try {
          await deleteDoc(doc(db, `users/${uid}/cards`, modules.id))

        } catch (error) {
            // alert('Não foi possível concluir a solicitação')
        }
        dispatch(removeLocalCard(modules.id))
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
                        Excluir
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