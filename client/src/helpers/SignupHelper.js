import axios from "axios";


function postApiSignup(user) {
    const url = "http://localhost:3000/api/register"
    return axios({
        method: "post",
        url: url,
        data: user,
            withCredentials: true,
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

export default postApiSignup