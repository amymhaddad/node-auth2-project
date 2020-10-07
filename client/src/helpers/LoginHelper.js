import axios from "axios";


function postApiLogin(userCredentials){
    let url = "http://localhost:3000/api/login"
    return axios({
        method: "post",
        url: url,
        data: userCredentials,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
   })
   
}
export default postApiLogin
