
import React, { useState } from "react";
import postApiLogin from "../helpers/LoginHelper"
import Header from "../common/Header"
import SignInForm from "./SignInForm"
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify"

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

    function clearForm() {
        setUserCredentials({
            username: "",
            password: ""
        })
    }

    //think: what does this function need? it only needs the token
    function handleSuccussfulLogin(token) {
        localStorage.setItem("token", token)
        toast.success("Success!")
        history.push({
            pathname: '/users',
            state: { userId: token.split(".")[1]}
          })
    }

    function handleUnsuccessfulLogin(error) {
        const message  = error.response.data.error
        const status = error.response.stats
        const userError = {
            message: message, 
            status: status
        }
            setErrors(userError)
            clearForm()
    }

    //Extracted the axios call -- fewer dependencies so it can go in its own file 
    //Created a separate function here to handle the response. I did this in the code bc otherwise I'd have to pass in: toast, history, response
    function handleSubmit(event) {
        event.preventDefault()
        postApiLogin(userCredentials)
        .then((response) => {
            if (response.status === 200)  {
                const token = response.data.token
                handleSuccussfulLogin(token)
            }
        })
        .catch(function(error) {
           handleUnsuccessfulLogin(error)
            // setErrors(userError)
            // clearForm()
        //extract this as its own function 
        // function handleErrors(errors)
        // .catch(function(error) {
            // const message  = error.response.data.error
            // const status = error.response.stats
            // const userError = {
            //     message: message, 
            //     status: status
            // }
            // setErrors(userError) 
            // clearForm()
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
