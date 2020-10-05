import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayUsers from "./DisplayUsers";
import {getJwt} from "../helpers/jwt"
import { useHistory } from "react-router-dom";



//Why only 1 person when I make the axios call?
//state --> users --> is NOT getting updated on call 
//Need to send the user id via props so I can add it to teh useEffect function. Otherwise useEffect runs automatically wihtout adding my new data
//ONly thing I can think of is to extract the token from jwt 
function Users(props) {
    const history = useHistory();
    const [users, getUsers] = useState([])
    const [errors, setErrors] = useState([])


    useEffect(() => {
        const jwt = getJwt()
        if (!jwt) {
            console.log("NO JWT")
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
                console.log(response.data)
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
            localStorage.removeItem("token")
        })
    }, [])




    return (
        <>
            {errors && (
            <div>
                {errors.message} {"   "}
                {errors.status}
            </div>
            )}

            {users.map(user => (
                <DisplayUsers 
                    id = {user.id}
                    eachUser = {user.username}
                />
            ))}
        </>
    )

}

export default Users;