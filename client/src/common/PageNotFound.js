import React from 'react';
import { Link } from "react-router-dom";


function PageNotFound() {

    return(
        <>  
            404 Error: page not found. 
            <Link to="/signup"><h2>Signup</h2></Link>

        </>
    )
}

export default PageNotFound