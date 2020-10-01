
import React from 'react';

//Key point: update value and add a change handler to prevent controlled componetns
function SignUpForm(props) {

    const {username, password, department} = props.user

    return (
        <>
        <form onSubmit={props.onSubmit}>
        <div className="form-group">
            <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={props.onChange}
                />
        
            <label>Password</label>
                <input
                    type="text"
                    name="password"
                    value={password}
                    onChange={props.onChange}
                />

            <label>Department</label>
                <input
                    type="text"
                    name="department"
                    value={department}
                    onChange={props.onChange}
                />
        </div>
    </form>
    <input 
        type="submit" 
        value="Save" 
        className="btn btn-primary" 
    />
    </>
    )
}
export default SignUpForm;