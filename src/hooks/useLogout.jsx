import { useState } from 'react';
import BASE_URL from "../hooks/baseURL";
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/logout`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (response.ok) {
                setLoading(false);
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                console.error("Logout failed:", response.statusText);
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }

    return { logout, error, loading };
};

export default useLogout;
