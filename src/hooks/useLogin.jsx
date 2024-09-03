import { useState } from 'react';
import axios from 'axios';
import BASE_URL from "../hooks/baseURL";
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (user_name, password) => {
        setLoading(true);
        let inputData = { user_name, password };
        try {
            const res = await axios.post(BASE_URL +  "/login", inputData);
            if (res.status === 200) {
                setError();
                setLoading(false);
                localStorage.setItem('token', res.data.data.token);
                navigate('/')
                return res.data.user;
            }
        } catch (e) {
            setLoading(false);
            setError(e.response.data.errors);
        }
        return null;
    };

    return { login, error, loading };
};

export default useLogin;
