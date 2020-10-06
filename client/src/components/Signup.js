import React, { useState } from "react";
import axios from "axios";
import Header from "../common/Header"
import SignUpForm from "./SignUpForm"
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';


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

    function handleSubmit(event) {

        event.preventDefault()
        const url = "http://localhost:3000/api/register"
        axios({
            method: "post",
            url: url,
            data: user,
            headers: {
               'Content-Type': 'application/json'
            } 
        })
        .then(function(response)  {
            if (response.status === 200)  {
                const token = response.data.token
                localStorage.setItem("token", token)
                toast.success("Success!")
                history.push({
                    pathname: '/users',
                    state: { userId: response.data.token.split(".")[1]}
                  })
            }
            
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