import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import Home from '../Components/Home/Home'

function PrivateRoute({modules}) {
    let userInfo
    localStorage.length && (userInfo = JSON.parse(localStorage.userInfo))

    return (
        userInfo ? <Home /> : <Navigate to="/" />
    )
}

export default PrivateRoute