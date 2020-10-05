
import React, { useState } from "react";
import axios from "axios";
import Header from "../common/Header"
import SignInForm from "./SignInForm"
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify"


//Don't I need to extract the payload from the token 
//Can I store multiple tokens at once?
//IF user provides invalid credentials, I want to let them know and then redirect. How do I redirct AFTER showing the message?
function SignIn() {
    let history = useHistory();
    const [errors, setErrors] = useState({})
    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    })

    function handleChange(event)  {
        const updateUserCredentials = {...userCredentials, [event.target.name]: event.target.value}
        setUserCredentials(updateUserCredentials)
    }


    function handleSubmit(event) {
        event.preventDefault()
        
        let url = "http://localhost:3000/api/login"
        axios({
            method: "post",
            url: url,
            data: userCredentials,
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' }
           })
        .then((response) => {
            if (response.status === 200)  {
                const token = response.data.token
                // const token = response.data.token.split(".")[1]
                localStorage.setItem("token", token)
                toast.success("Success!")
                history.push({
                    pathname: '/users',
                    state: { userId: response.data.token.split(".")[1]}
                  })
            }
    
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
