import { createContext, useEffect, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";

const AuthContext = createContext({
  auth: null,
  user: null,
  updateProfile: () => {},
  updateLanguage: () => {},
});

const AuthContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [url, setUrl] = useState("")
  const { data: userData, error } = useFetch(url ?? "");
  const [profile, setProfile] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (!userData) {
      localStorage.removeItem("token");
    } else if (token) {
      setUrl(BASE_URL + "/user");
      setProfile(userData);
    }
  }, [token, userData]);
  

  const updateProfile = (newProfile) => setProfile(newProfile);
  const updateLanguage = (newLanguage) => setLanguage(newLanguage);

  const value = useMemo(
    () => ({
      auth: token,
      user: profile,
      lan: language,
      updateProfile,
      updateLanguage,
    }),
    [token, profile, language]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };