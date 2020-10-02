import React from "react";

function SignInForm(props) {


    const {username, password} = props.userCredentials
    return (
        <>
         <form onSubmit={props.onSubmit}>
            <label className="register-form">
                Username
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={props.onChange}
                />
                Password
                <input
                    type="text"
                    name="password"
                    value={password}
                    onChange={props.onChange}
                />
                </label>

                <input type="submit" value="submit" className="btn" />
            </form> 
        </>
    )

}

export default SignInForm;
