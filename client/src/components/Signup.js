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

    function clearForm() {
        addUser ({
            username: "",
            password: "",
            department: ""
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
       
        const url = "http://localhost:3000/api/register"

        axios.post({
            method: "post",
            url: url,
            data: user,
            headers: {
               'Content-Type': 'application/json'
            } 
        })
        .then((response) => {
            debugger
            console.log(response.data)
        })
        .then(() => clearForm())
        .catch((err)=> console.log(err))
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