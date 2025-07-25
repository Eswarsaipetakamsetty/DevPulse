import { useNavigate } from "react-router-dom"
import useRegister from "../hooks/useRegister"
import React, { useState } from "react"
import styles from "../styles/Register.module.css"
import InputBox from "../../../styled_components/InputBox"
import LoginButton from "../../../styled_components/LoginSignUpButton"


const Register = () => {
    const {handleRegister, loading, error} = useRegister()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        user_email: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        organization_id: "",
        is_manager: false,
    })

    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (field: string, value: string | boolean) => {
        setFormData({...formData, [field]: value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await handleRegister(formData)
        if(success) {
            navigate("/login")
        }
    }

    return (
        <>
        {/*Navbar to be added*/}
        <div className={styles.container}>
            <div className={styles.welcome}>Hi!<br/>WELCOME</div>
            <div className={styles.card}>
                <form onSubmit={handleSubmit}>
                    <InputBox 
                        label="EMAIL" 
                        type="email" 
                        value={formData.user_email} 
                        placeHolder="Enter Email"
                        onChange={(e) => handleChange("user_email",e.target.value)} 
                    />
                    <InputBox 
                        label="USERNAME" 
                        type="username" 
                        value={formData.username} 
                        placeHolder="Enter Username"
                        onChange={(e) => handleChange("username",e.target.value)} 
                    />
                    <InputBox 
                        label="FIRST NAME" 
                        type="text" 
                        value={formData.first_name} 
                        placeHolder="Enter First Name"
                        onChange={(e) => handleChange("first_name",e.target.value)} 
                    />
                    <InputBox 
                        label="LAST NAME" 
                        type="text" 
                        value={formData.last_name} 
                        placeHolder="Enter Last Name"
                        onChange={(e) => handleChange("last_name",e.target.value)} 
                    />
                    <InputBox 
                        label="ORGANIZATION ID" 
                        type="text" 
                        value={formData.organization_id} 
                        placeHolder="Enter Organization ID"
                        onChange={(e) => handleChange("organization_id",e.target.value)} 
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
                    <div className={styles.checkboxWraper}>
                        <label>
                            <input
                            type="checkbox"
                            checked={formData.is_manager}
                            onChange={(e) => handleChange("is_manager", e.target.checked)}
                            />
                            Register as Manager
                        </label>
                    </div>
                    <br />
                    <LoginButton type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </LoginButton>
                    {error && <p style = {{color: "red"}}>{error}</p>}
                </form>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
        </>
    )
}

export default Register