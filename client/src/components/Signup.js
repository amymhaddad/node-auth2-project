import React, { useState } from "react";
import Header from "../common/Header"
import SignUpForm from "./SignUpForm"
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import postApiSignup from "../helpers/SignupHelper"


function Signup() {
    let history = useHistory();
    const [errors, setErrors] = useState({})

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

    function handleSuccessfulSignup(token) {
        localStorage.setItem("token", token)
        toast.success("Success!")
        history.push({
            pathname: '/users',
            state: { userId: token.split(".")[1]}
          })
    }
  
    function handleSubmit(event) {
        event.preventDefault()
        postApiSignup(user)
        .then(function(response)  {
            if (response.status === 201)  handleSuccessfulSignup(response.data.token)
            
        })
        .then(() => clearForm())
        .catch(function(error)  {
            const message = error.response.data.error
            const status = error.response.status
            const userErrors = {
                message: message, 
                status: status
            }
            setErrors(userErrors)
            localStorage.removeItem("token")
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

        {errors && (
            <div>
                {errors.message} {"   "}
                {errors.status}
            </div>
        )}

        </>

    )
}

export default Signup;