
import React, { useState } from "react";
import axios from "axios";
import Header from "../common/Header"
import SignInForm from "./SignInForm"
import { useHistory } from "react-router-dom";

function SignIn() {
    const [errors, setErrors] = useState({})
    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })

    function handleChange(event)  {
        const updateUserCredentials = {...userCredentials, [event.target.name]: event.target.value}
        setUserCredentials(updateUserCredentials)
    }


    //The problem is with the loginRouter: it takes a username ONLY, which I'm trying to pass down to
    function handleSubmit(event) {
        event.preventDefault()
        // debugger
        
        let url = "http://localhost:3000/api/login"
        axios({
            method: "post",
            url: url,
            data: userCredentials,
            // data: userCredentials.username,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
           })
        .then((response) => {
            debugger
        })
        .catch(function(error) {
            const message  = error.response.data.error
            const status = error.response.stats
            const userError = {
                message: message, 
                status: status
            }
            setErrors(userError)
        })


    }

    return (
        <>

            <Header />

            <SignInForm 
                userCredentials= {userCredentials}
                onChange = {handleChange}
                onSubmit = {handleSubmit}
            />

            {errors && (
                <div>
                    {errors.message} {"  "}
                    {errors.status}
                </div>

            )}
        </>

    )
}

export default SignIn;
