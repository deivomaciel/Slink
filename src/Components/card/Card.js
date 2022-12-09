import React, { useState } from "react"
import { BsLink45Deg, BsCheckCircle } from "react-icons/bs"
import { FiCopy, FiTrash } from "react-icons/fi"
import "./styles.css"

function Card(props) {
    let url = props.link
    const linkIcon = `https://www.google.com/s2/favicons?domain=${props.link}`
    let [clicked, setClick] = useState(false)

    url.length > 38 && (url = `${url.substr(0, 30)}...`)

    const copyLink = link => {
        navigator.clipboard.writeText(link)
        setClick(clicked = !clicked)
        clicked && (document.querySelector('.copy-btn').style.background = '#4AD295')
    }

    const addCardToDelete = cardInfo => {
        return {
            type: "ADD_CARD_TO_DELETE",
            cardInfo
        }
    }

    const showDeletePopUp = popUp => {
        props.dispatch(addCardToDelete({
            id: props.id,
            title: props.title,
            link: props.link
        }))

        return {
          type: 'SHOW_DELET_POP_UP',
          popUp
        }        
      }

    return (
        <div>
            <div className="link-div">
                <div className="title-area">
                    <div className="top-card">
                        <img className="icon" src={linkIcon} title={props.imgTitle} height="24" width="24"/>
                        <button className="menu-btt" onClick={() => props.dispatch(showDeletePopUp(true))}>
                            <FiTrash />
                        </button>

                    </div>
                    <h1>{props.title}</h1>
                </div>
            
                <div className="desc-link-area">
                    <p>{props.description}</p>
                    <a href={props.link}>
                        <span>
                            <BsLink45Deg />
                        </span>
                        {url}
                    </a>
                </div>
                <div className="button-container">
                    <button className="copy-btn" onClick={() => copyLink(props.link)}>
                        {clicked ? <BsCheckCircle size={24} /> : <div>
                            Copiar 
                            <span>
                                <FiCopy />
                            </span>
                        </div>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card 