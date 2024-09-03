import { createContext, useEffect, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  auth: null,
  user: null,
  updateProfile: () => {}
});

const AuthContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const { data: userData, error } = useFetch(BASE_URL + "/user");
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }else{
        navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (userData) {
      setProfile(userData);
    }
  }, [userData]);

//   useEffect(() => {
//     if (error) {
//       console.error("Failed to fetch user data:", error);
//     }
//   }, [error]);

  const updateProfile = (newProfile) => setProfile(newProfile);

  const value = useMemo(() => ({
    auth: token,
    user: profile,
    updateProfile
  }), [token, profile]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };