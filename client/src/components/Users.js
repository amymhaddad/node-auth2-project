import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayUsers from "./DisplayUsers";
import {getJwt} from "../helpers/jwt"
import { useHistory } from "react-router-dom";
import LogOut from "./LogOut"
import Header from "../common/Header"
import { toast } from 'react-toastify';

function Users(props) {

    const userId = props.location.state.userId
    const history = useHistory();
    const [users, getUsers] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const jwt = getJwt()
        if (!jwt) {
            history.push("/signin")
        }
        const url = "http://localhost:3000/api/users"
        axios({
            method: "get",
            url: url,
            data: jwt,
            headers: {
                Authorization: `Bearer ${jwt}`
            } 
        })
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

    }, [userId])

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
                <DisplayUsers 
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