import React from "react";
import "./styles.css"
import { useState } from "react";
import logo from "../../assets/logo.png"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom"

function Login() {
    let userInfo = {
        name: null,
        email: null,
        uid: null,
        accessToken: null
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth)

    const handleLogin = e => {
        e.preventDefault()
        try {
            signInWithEmailAndPassword(email, password)
        } catch (er) {
            alert(`Não foi possível concluir a solicitação! Erro: ${error}`)
        }
    }

    if(loading) {return <h1>Carregando</h1>}
    if(user) {
        userInfo.name = user.user.name
        userInfo.email = user.user.email
        userInfo.uid = user.user.uid
        userInfo.accessToken = user.user.accessToken
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
    } 

    return (
        localStorage.userInfo ? <Navigate to="/home" /> : (
            <div className="total-container">
                <div className="logo-container">
                    <img src={logo} alt="Logo" />
                </div>
                
                <p>Para continuar, faça login no Slink.</p>

                <form className="form-content">
                    <div className="inputs-container">
                        <div className="mail-container">
                            <label for="mail">E-mail</label>
                            <input 
                                id="mail"  
                                className="mail-input" 
                                type="email" 
                                placeholder="E-mail"
                                onChange={e => setEmail(e.target.value)}
                            />
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
                        </div>
                    </div>
                    <div className="submit-container">
                        <a className="forgot-pass" href="#">Esqueceu sua senha?</a>
                        <div className="enter-content">
                            <label className="check-container">
                                <input className="check" type="checkbox" />
                                Lambrar de mim
                            </label>
                            <button className="submit-btt" onClick={handleLogin}>
                                ENTRAR
                            </button>
                        </div>
                    </div>
                </form>
                <div className="signup-container">
                    <p>Não tem uma conta?</p>
                    <Link to="/singup">
                        CRIAR UMA CONTA NO SLINK
                    </Link>
                </div>
            </div>
        )
    )
}

export default Login