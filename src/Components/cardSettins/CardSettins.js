import React from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi"
import "./styles.css"

function CardSettins() {
    return (
        <div className="container">
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
    )
}

export default CardSettins