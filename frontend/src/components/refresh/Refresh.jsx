import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Refresh({apiUrl}) {
    const [response, setResponse] = useState(null);
    const [requestSent, setRequestSent] = useState(false);

    console.log("request", requestSent)
    console.log("response", response)
    const navigate = useNavigate()
    useEffect(() => {
        if(!requestSent) {
            const localToken = JSON.parse(localStorage.getItem("token"))
            axios.post(`${apiUrl}/refresh`, { refreshToken: localToken.refreshToken })
            .then((res) => {
                setResponse(res)
                setRequestSent(true)
                console.log(res)
                localStorage.setItem("token", JSON.stringify({token: res.data.token, refreshToken: res.data.refreshToken}))
            })
            .then(() => {
                navigate('/')
            })

        }
        
    }, [])
    
}