import { useNavigate } from "react-router-dom"
import useRegisterOrganization from "../hooks/useRegisterOrganization"
import React, { useState } from "react"
import styles from "../styles/RegisterOrganization.module.css"
import InputBox from "../../../styled_components/InputBox"
import LoginButton from "../../../styled_components/LoginSignUpButton"


const RegisterOrganization = () => {
    const {handleRegisterOrganization, loading, error} = useRegisterOrganization()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        organization_name: "",
        description: "",
    })

    const handleChange = (field: string, value: string | boolean) => {
        setFormData({...formData, [field]: value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await handleRegisterOrganization(formData)
        if(success) {
            navigate("/org/dashboard")
        }
    }

    return (
        <>
        {/*Navbar to be added*/}
        <div className={styles.container}>
            <div className={styles.welcome}>Create<br/>Organization</div>
            <div className={styles.card}>
                <form onSubmit={handleSubmit}>
                    <InputBox 
                        label="EMAIL" 
                        type="email" 
                        value={formData.email} 
                        placeHolder="Enter Email"
                        onChange={(e) => handleChange("email",e.target.value)} 
                    />
                    <InputBox 
                        label="NAME" 
                        type="username" 
                        value={formData.organization_name} 
                        placeHolder="Enter Organization Name"
                        onChange={(e) => handleChange("organization_name",e.target.value)} 
                    />
                    <InputBox 
                        label="DESCRIPTION" 
                        type="text" 
                        value={formData.description} 
                        placeHolder="Enter Description"
                        onChange={(e) => handleChange("description",e.target.value)} 
                    />
                    <LoginButton type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </LoginButton>
                    {error && <p style = {{color: "red"}}>{error}</p>}
                </form>
            </div>
        </div>
        </>
    )
}

export default RegisterOrganization