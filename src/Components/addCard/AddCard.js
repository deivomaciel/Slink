import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import React, { useState } from "react";
import { BsImage } from "react-icons/bs"
import { connect } from "react-redux";
import { generateValue } from "random-var";
import "./styles.css"

const hidePopUp = (popUp) => {
    return {
        type: 'HIDE_POP_UP',
        popUp
    }
}

const addNewCard = (newCard) => {
    return {
        type: "ADD_CARD",
        newCard
    }
}

function AddCard({ modules, dispatch }) {
    const total = 32
    let [totalDescCaracter, setTotalDescCaracter] = useState(total)
    let [title, setTitle] = useState("")
    const [link, setLink] = useState("")
    const [desc, setDesc] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [urlValid, setValid] = useState(false)
    const linkRegExp = /(https|http)[:][\/][\/](www|)(.|)[a-zA-Z0-9]+[-|.]([a-zA-Z0-9]+|com)(.|)(com|org|github.io|.vercel|)/

    const getDesc = e => {
        const descContent = e.target.value
        const remainder = total - descContent.length
        console.log(remainder)

        if(remainder >= 0) {
            setTotalDescCaracter(remainder)
            setDesc(descContent)
            console.log(totalDescCaracter)
        } else e.target.value = desc
    }

    const getTitle = link => {
        const regex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\./
        const match = regex.exec(link)
        if (match && match.length > 1) return match[1]
        else return null 
    }

    const setValidInfo = element => {
        if(linkRegExp.test(element)) {
            title = getTitle(element)
            setTitle(title)
            setLink(element)
            setImgUrl(`https://www.google.com/s2/favicons?domain=${linkRegExp.exec(element)[0]}`)
            setValid(true)
        } else setValid(false)
    }

    const addNewCardOnFirestore = async uid => { // Coloar em um arquivo de CRUD's
        const randomId = generateValue(4, ['upCase', 'lowerCase', 'number'])
        await setDoc(doc(db, `users/${uid}/cards`, `${randomId}`), {
            id: randomId,
            title: title,
            link: link,
            discription: desc
        });
    }

    const getInfo = () => {
        if(title != '' && urlValid) {
            const uid = JSON.parse(localStorage.userInfo).uid
            try {
                addNewCardOnFirestore(uid)
                dispatch(addNewCard({ 
                    title: title,
                    link: link,
                    description: desc
                }))
            } catch (error) {
                alert("Um erro ocorreu!")
            }
        }
    }

    return (
        <div className="pop-up">
            <div className="pop-up-container">
                <div className="card-header">
                    <div className="img">
                        {!urlValid ? (<div className="img-block"><BsImage size={50}/></div>) : <img className="icon" src={imgUrl} height="50" width="50"/>}
                        {title == "" ? <h1>Título</h1> : <h1>{title}</h1>}
                    </div>
                </div>
                <div className="link-and-desc">
                    <div className="mail-container">
                        <label htmlFor="link">Link</label>
                        <input 
                            id="link" 
                            className="mail-input" 
                            type="text" 
                            placeholder="Link"
                            onChange={e=> {
                                setValidInfo(e.target.value)
                            }}
                        />   
                    </div>
                    <div className="pass-container">
                        <label htmlFor="desc">Descrição</label>
                        <div className="desc-input-container">
                            <input 
                                id="desc" 
                                className="pass-input" 
                                type="text" 
                                placeholder="Descrição"
                                onChange={e => getDesc(e)}
                            />

                            <span>{totalDescCaracter}/{total}</span>
                        </div>
                    </div>
                </div>
                <div className="bttn-area">
                    <button className="add-bttn" onClick={getInfo}>
                        Adicionar
                    </button>
                    <button className="cancel-bttn" onClick={() => dispatch(hidePopUp(false))}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default connect(state => ({ modules: state.links }))(AddCard)