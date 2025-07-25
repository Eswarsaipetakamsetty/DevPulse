import { Route, Routes } from "react-router-dom"
import Register from "../components/auth/components/Register"
import Login from "../components/auth/components/Login"
import RegisterOrganization from "../components/auth/components/RegisterOrganization"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path = "/register" element = {<Register/>} />
            <Route path = "/login" element = {<Login/>} />
            <Route path = "/org/register" element = {<RegisterOrganization/>} />
        </Routes>
    )
}

export default AppRoutes