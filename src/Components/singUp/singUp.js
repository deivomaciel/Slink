import React, { useState } from "react";
import "./styles.css"
import logo from "../../assets/logo.png"
import Loader from "../loader/Loader";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../services/firebaseConfig";
import { Link, Navigate } from "react-router-dom";

function SingUp() {
    let userInfo = {
        name: null,
        email: null,
        uid: null,
        accessToken: null
    }

    let formInfo = {
        invalidEmail: false,
        invalidPass: false,
        emailAlreadyInUse: false,
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth)

    const handleSingUp = e => {
        e.preventDefault()
        try {
            createUserWithEmailAndPassword(email, password)
        } catch (er) {
            alert(`Não foi possível concluir a solicitação! Erro: ${error}`)
        }
    }

    const validateForm = (e) => {
        e.preventDefault()
        const inputs = document.querySelectorAll('input')

        if(name == '' || email == '' || password == '') {
            formInfo.emailAlreadyInUse = false
            inputs.forEach(input => {
                input.value == '' ? (input.style.border = '2px solid #D25E4A') : (input.style.border = '1px solid #333333')
            })

        } else if(password.length < 8) {
            formInfo.invalidPass = true
            inputs[2].style.border = '2px solid #D25E4A'
            alert('A senha deve ter no mínimo 8 dígitos.')

        } else {
            inputs.forEach(input => {
                input.style.border = '1px solid #333333'
            })
            handleSingUp(e)
        }
    }

    const addNewDocumentUser = async uid => {
        await setDoc(doc(db, "users", uid), {
            name: name,
            email: email
          })
    } 

    if(error && error.code == 'auth/email-already-in-use') {
        const mainInput = document.querySelector('#mail')
        mainInput.style.border = '2px solid #D25E4A'
        formInfo.emailAlreadyInUse = true
    }

    if(user) {
        userInfo.name = user.user.name
        userInfo.email = user.user.email
        userInfo.uid = user.user.uid
        userInfo.accessToken = user.user.accessToken
        addNewDocumentUser(user.user.uid)
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
    }

    return (
        localStorage.userInfo ? <Navigate to="/home" /> : (
            <div className="total-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" />
                </div>

                <div className="form-group">
                    <div>
                        <p className="singup-p">Para continuar, crie uma conta no Slink.</p>
                    </div>
                    <form className="singup-form-content">
                        <div className="inputs-container">
                            <div className="name-container">
                                <label for="name">Nome</label>
                                <input 
                                    id="name" 
                                    className={`mail-input ${name}`}
                                    type="text" 
                                    placeholder="Nome"
                                    onChange={e => {setName(e.target.value)}}
                                />
                            </div>
                            <div className="mail-container">
                                <label for="mail">E-mail</label>
                                <input 
                                    id="mail" 
                                    className="mail-input" 
                                    type="email" 
                                    placeholder="E-mail"
                                    onChange={e => setEmail(e.target.value)}
                                />
                                {formInfo.emailAlreadyInUse && <p>Esse e-mail já está em uso.</p>}
                            </div>
                            <div className="pass-container">
                                <label for="pass">Senha</label>
                                <input 
                                    id="pass" 
                                    className="pass-input" 
                                    type="password" 
                                    placeholder="Senha"
                                    onChange={e => setPassword(e.target.value)}
                                />
                                {formInfo.invalidPass && <p>Esse e-mail já está em uso.</p>}
                                
                            </div>
                        </div>
                        <div className="create-container">
                            <div className="create-content">
                                <button className="create-btt"onClick={e => validateForm(e)}>
                                {!loading ? 'CRIAR CONTA' : <Loader />}
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="login-container">
                        <p>Já tem uma conta?</p>
                        <Link to="/">
                            ENTRAR NO SLINK
                        </Link>
                    </div>
                </div>
            </div>
        )
    )
}

export default SingUp