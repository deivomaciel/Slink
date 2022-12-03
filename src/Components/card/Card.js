import React, { useState } from "react"
import CardSettins from "../cardSettins/CardSettins"
import { BsLink45Deg, BsCheckCircle } from "react-icons/bs"
import { FiCopy, FiCheck, FiTrash2, FiEdit2 } from "react-icons/fi"
import { TbMenu } from "react-icons/tb"
import "./styles.css"

function Card(props) {
    const url = `${props.link}`
    const linkIcon = `https://www.google.com/s2/favicons?domain=${props.link}`

    let [showSettins, setSettins] = useState(false)
    let [clicked, setClick] = useState(false)

    const copyLink = link => {
        navigator.clipboard.writeText(link)
        setClick(clicked = !clicked)
    }
    
    return (
        <div>
            <div className="link-div">
                <div className="title-area">
                    <div className="top-card">
                        <img className="icon" src={linkIcon} title={props.imgTitle} height="24" width="24"/>
                        <button className="menu-btt" onClick={() => setSettins(showSettins = !showSettins)}>
                            <TbMenu />
                            <div className="card-settins-container">
                                <button className="edit-btt">
                                    <div className="arrowTop"></div>
                                    Editar
                                    <span>
                                        <FiEdit2 />
                                    </span> 
                                </button>

                                <button className="delet-btt">
                                    Excluir
                                    <span>
                                        <FiTrash2 />
                                    </span>
                                </button>
                            </div>
                        </button>

                    </div>
                    <h1>{props.title}</h1>
                </div>
            
                <div className="desc-link-area">
                    <p>{props.description}</p>
                    <a href={url}>
                        <span>
                            <BsLink45Deg />
                        </span>
                        {props.link}
                    </a>
                </div>

                <div className="button-container">
                    <button onClick={() => copyLink(props.link)}>
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