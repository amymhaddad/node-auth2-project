import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../common/Header"
import SignUpForm from "./SignUpForm"
import { useHistory } from "react-router-dom";

function SignUp() {
    let history = useHistory();

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
        console.log("user", user)
        axios({
            method: "post",
            url: url,
            data: user,
            headers: {
               'Content-Type': 'application/json'
            } 
        })
        .then(function(response)  {
            if (response.status === 200)  history.push("/users");
    
            console.log(response.data)
        })
        .then(() => clearForm())
        .catch(function(error)  {
            debugger
        })

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