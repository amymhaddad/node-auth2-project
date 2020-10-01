import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../common/Header"
import SignUpForm from "./SignUpForm"


function SignUp() {
    const [user, addUser] = useState({
        username: "",
        password: "",
        department: ""
    })

    function handleInputChange(event) {
        const newUser = {...user, [event.target.name]: event.target.value}
        addUser(newUser)
    }

    function handleSubmit(event) {
        
    }

    return (

        <>
            <Header />

            <SignUpForm 
                user = {user}
                onChange = {handleInputChange}
                onSubmit = {handleSubmit}
            />
        </>

    )
}

export default SignUp