import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Refresh({apiUrl, authToken}) {
    const [response, setResponse] = useState(null);

    const token = JSON.parse(localStorage.getItem("token"))



    const navigate = useNavigate()
    useEffect(() => {
        console.log(token)
        axios.post(`${apiUrl}/refresh`, { accessToken: token.accessToken, refreshToken: token.refreshToken })
        .then((res) => {
            setResponse(res)
            console.log(res)
            localStorage.setItem("token", JSON.stringify({accessToken: res.data.token, refreshToken: res.data.refreshToken}))
        })
        .then(() => {
            navigate('/')
        })
        .catch(err => {
            if(err.response.status == 401) navigate("/login")
        })

        
    }, [])
    
}