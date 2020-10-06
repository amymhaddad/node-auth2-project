import React from "react";
import { NavLink } from 'react-router-dom';


function Header() {
    const activeStyle = {color: "navy"}

    return (
        <>
        <NavLink activeStyle={activeStyle} to="/Signup">Sign Up</NavLink>
        {' | '}
        <NavLink activeStyle={activeStyle} to="/signin">Sign In</NavLink>
        {' | '}
        <NavLink activeStyle={activeStyle} to="/users">See Users</NavLink>
        </>
    )
}

export default Header;