import { useNavigate } from "react-router-dom"
import useLogin from "../hooks/useLogin"
import React, { useState } from "react"
import styles from "../styles/Login.module.css"
import InputBox from "../../../styled_components/InputBox"
import LoginButton from "../../../styled_components/LoginSignUpButton"


const Login = () => {
    const {handleLogin, loading, error} = useLogin()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (field: string, value: string | boolean) => {
        setFormData({...formData, [field]: value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await handleLogin(formData)
        if(success) {
            navigate("/dashboard")
        }
    }

    return (
        <>
        {/*Navbar to be added*/}
        <div className={styles.container}>
            <div className={styles.welcome}>Hi!<br/>WELCOME BACK</div>
            <div className={styles.card}>
                <form onSubmit={handleSubmit}>
                    <InputBox 
                        label="EMAIL" 
                        type="email" 
                        value={formData.username} 
                        placeHolder="Enter Email"
                        onChange={(e) => handleChange("username",e.target.value)} 
                    />
                    <div className={styles.passwordcontainer}>
                        <InputBox
                            type={showPassword ? "text" : "password"}
                            label="PASSWORD"
                            value={formData.password}
                            placeHolder="Enter Password"
                            onChange={(e) => handleChange("password", e.target.value)}
                        />
                        <button type="button" onClick={() => {setShowPassword(! showPassword)}}>
                            {showPassword? "Hide"  : "Show"}
                        </button>
                    </div>
                    <a className={styles.forgotpassword} href="/reset/password">forgot password?</a>
                    <LoginButton type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </LoginButton>
                    {error && <p style = {{color: "red"}}>{error}</p>}
                </form>
                <p className={styles.footer}>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
        </>
    )
}

export default Login