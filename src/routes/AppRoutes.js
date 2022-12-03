import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Components/login/Login.js"
import SingUp from "../Components/singUp/singUp"
import PrivateRoute from "./PrivateRoutes.js";

export function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/singup" element={<SingUp />} />
                <Route path="/home" element={<PrivateRoute />} />
            </Routes>
        </BrowserRouter>
    )
}