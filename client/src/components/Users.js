import React, { useState, useEffect } from "react";
import DisplayUser from "./DisplayUser";
import {getJwt} from "../helpers/jwt"
import { useHistory } from "react-router-dom";
import LogOut from "./LogOut"
import Header from "../common/Header"
import { toast } from 'react-toastify';
import getApiUsers from "../helpers/UsersHelper"

function Users() {
    const history = useHistory();

    const jwt = getJwt()
        if (!jwt) {
            toast.info("Please login or signup")
            history.push("/signin")
        }
    
    const [users, getUsers] = useState([])
    const [errors, setErrors] = useState([])

    function handleUnSuccessfulRequest(error) {
        const message = error.response.data.error
        const status = error.response.status
        const userErrors = {
            message: message, 
            status: status
        }
            setErrors(userErrors)
            history.push("/Signup")
    }

    function handleLogout(event) {
        event.preventDefault()
        localStorage.removeItem("token")
        history.push("/signin")
    }

    useEffect(() => {
        getApiUsers(jwt)
        .then((response) => {
            if (response.status === 200 ) return getUsers(response.data)
        }) 
        .catch((error) => handleUnSuccessfulRequest(error))
    }, [jwt])

    return (
        <div>
            <Header />
            {errors && (
            <div>
                {errors.message} {"   "}
                {errors.status}
            </div>
            )}

            <ul>
            {users.map(user => (
                <DisplayUser 
                    id = {user.id}
                    eachUser = {user.username}
                />
            ))}
            </ul>

            <LogOut 
                onSubmit = {handleLogout}
            />
        </div>
    )
}

export default Users;