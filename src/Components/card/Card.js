import React, { useEffect, useState } from "react"
import { BsLink45Deg, BsCheckCircle } from "react-icons/bs"
import { FiCopy, FiTrash } from "react-icons/fi"
import "./styles.css"

function Card(props) {
    let url = props.link
    let desc = props.description
    const maxUrlCaracter = 38
    const maxDescCaracter = 32
    const maxTitleCaracter = 11
    const linkIcon = `https://www.google.com/s2/favicons?domain=${props.link}`
    let [clicked, setClick] = useState(false)
    let [buttonCalss, setButtonClass] = useState('uncopy')
    let title = props.title

    url.length > maxUrlCaracter && (url = `${url.substr(0, 30)}...`)
    desc.length > maxDescCaracter && (desc = `${desc.substr(0, 30)}...`)
    title.length > maxTitleCaracter && (title = `${title.substr(0, maxTitleCaracter)}...`)
    
    const getTitle = link => {
        const regex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)\./
        const match = regex.exec(link)
        
        if (match && match.length > 1) return match[1]
        else return null 
    }

    const copyLink = link => {
        navigator.clipboard.writeText(link)
        setClick(clicked = !clicked)
        setButtonClass('copy')

        setTimeout(() => {
            setClick(clicked = !clicked)
            setButtonClass('uncopy')
        }, 2000)
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
                        <div className="img-container">
                            <img className="icon" src={linkIcon} title={props.imgTitle} height="24" width="24"/>
                            <h1>{title}</h1>
                        </div>
                        <button className="menu-btt" onClick={() => props.dispatch(showDeletePopUp(true))}>
                            <FiTrash />
                        </button>
                    </div>
                </div>
            
                <div className="desc-link-area">
                    <p>{desc}</p>
                    <a href={props.link} target="_blank">
                        <span>
                            <BsLink45Deg />
                        </span>
                        {url}
                    </a>
                </div>
                <div className="button-container">
                    <button className={`${buttonCalss}-btn`} onClick={() => copyLink(props.link)}>
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