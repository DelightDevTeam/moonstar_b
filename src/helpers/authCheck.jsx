import { useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

const authCheck = () => {
    const { auth } = useContext(AuthContext);
    let navigate = useNavigate();
    if (!auth) {
        useEffect(() => {
            navigate('/login')
        }, [auth, navigate]);
    }
}

export default authCheck;