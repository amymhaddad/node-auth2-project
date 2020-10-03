import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayUsers from "./DisplayUsers";
import {getJwt} from "../helpers/jwt"
import { useHistory } from "react-router-dom";
import { use } from "../../../server/router/usersRouter";


//Why only 1 person when I make the axios call?
function Users(props) {
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
            // debugger
            getUsers(response.data)

            // if (response.status === 200 ) 
        }) 
        .catch((error) => {
            console.log('err', error)
        })
    }, [])

    

    return (
        <>
        <DisplayUsers

        />
            {/* {users.map(user => (
                <DisplayUsers 
                    eachUser = {user}
                />
            ))} */}
        </>
    )

}

export default Users;