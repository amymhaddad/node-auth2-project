
import React from 'react';
import SignUp from "./SignUp"

//Key point: update value and add a change handler to prevent controlled componetns
function SignUpForm(props) {

    const {username, password, department} = props.user

    return (
        <>
        <form>
        <div className="form-group">
            <label>Username</label>
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={username}
                    onChange={props.onChange}
                />
        
            <label>Password</label>
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={password}
                    onChange={props.onChange}
                />

            <label>Department</label>
                <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={department}
                    onChange={props.onChange}
                />
        </div>
    </form>
    <input type="submit" value="Save" className="btn btn-primary" />
    </>
    )
}
export default SignUpForm;