import axios from "axios";


function getApiUsers(jwt) {
    const url = "http://localhost:3000/api/users"
    return axios({
        method: "get",
        url: url,
        data: jwt,
        headers: {
            Authorization: `Bearer ${jwt}`
        } 
    })
}

export default getApiUsers;