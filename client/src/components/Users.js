import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayUser from "./DisplayUser";
import {getJwt} from "../helpers/jwt"
import { useHistory } from "react-router-dom";
import LogOut from "./LogOut"
import Header from "../common/Header"
import { toast } from 'react-toastify';
import getApiUsers from "../helpers/UsersHelper"

function Users(props) {
    const history = useHistory();


    //REMOVE this from state:
    // const userId = props.location.state.userId 
    const jwt = getJwt()
        if (!jwt) {
            toast.info("Please login or signup")
            history.push("/signin")
        }
    
    const [users, getUsers] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        getApiUsers(jwt)
        .then((response) => {
            if (response.status === 200 ) {
                return getUsers(response.data)
            }
        }) 
        .catch((error) => {
            const message = error.response.data.error
            const status = error.response.status
            const userErrors = {
                message: message, 
                status: status
            }
            setErrors(userErrors)
            history.push("/Signup")
        })

    }, [jwt])

    function handleLogout(event) {
        event.preventDefault()
        localStorage.removeItem("token")
        history.push("/signin")
    }

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