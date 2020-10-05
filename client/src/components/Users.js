import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayUsers from "./DisplayUsers";
import {getJwt} from "../helpers/jwt"
import { useHistory } from "react-router-dom";



//Why only 1 person when I make the axios call?
//Need to send the user id via props so I can add it to teh useEffect function. Otherwise useEffect runs automatically wihtout adding my new data
//ONly thing I can think of is to extract the token from jwt 
function Users(props) {
    const token = getJwt()

    const history = useHistory();
    const [users, getUsers] = useState([])

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
                getUsers(response.data)
            }
           
        }) 
        .catch((error) => {
            console.log('err', error)
        })
    }, [token])

    

    return (
        <>
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