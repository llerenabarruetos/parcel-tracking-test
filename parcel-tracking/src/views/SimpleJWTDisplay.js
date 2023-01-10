import React, {useEffect, useState} from "react";

async function getJWT() {
    return fetch("http://localhost:8080/jwt").then((res)=>res.json());
}

export default function SimpleJWTDisplay() {
    // jwt token variable:
    const [jwtToken, setJwtToken] = useState("Loading token...");
    
    // call getJWT() upon loading page:
    useEffect(() => {
        getJWT().then((data) => {
            setJwtToken(data.token);
        })
    }, [])

    return(
        <div>
            <b>The JWT token received is: </b>
            { jwtToken }
        </div>
    );
}