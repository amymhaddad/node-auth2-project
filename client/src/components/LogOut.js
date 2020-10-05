import React, { useState } from "react";

function LogOut(props) {

    return (
        <>
             <form onSubmit={props.onSubmit}>
                    <input 
                        type="submit" 
                        value="logout" 
                        className="btn btn-primary" 
                />
            </form>
        </>

    )
}
export default LogOut;