import React, { useState } from "react";
import axios from "axios";
import Header from "../common/Header"
import SignUpForm from "./SignUpForm"
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

//Get toast to work
//Try redirect instead of push 


function SignUp() {
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
                // const token = token.split(".")[1]
                // debugger
                localStorage.setItem("token", token)
                toast.success("Success!")
                history.push("/users" );
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

export default SignUp

//Tried to add another axios call to auto log in the user
// .then(function(response)  {
//     if (response.status === 200)  {
//         const username = response.data.username
//         const password = user.password
//         const userCredentials = {username: username, password: password}
//         debugger
//         const url = "http://localhost:3000/api/login"
//         axios({
//             method: "post",
//             url: url,
//             data: userCredentials,
//             headers: {
//                'Content-Type': 'application/json'
//             } 
//         })
//         .then(function(response) {
//             debugger
//             // console.log("HERE", response.data)
//             // history.push("/users");
//         })
//     }
    
// })

// If the user is created successfully, take the returned token, save it to the browser's local storage and redirect the user to the /users route, where they should see the list of users.
//I don't create the token until the login page 