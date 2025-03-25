import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setAuthenticated] = useState(null);
    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
            navigate("/login")
        }
    },[navigate])
    if (isAuthenticated === null) {
        return <div>loading...</div>
    } else {
        return children;
    }
}

export default ProtectedRoute;
