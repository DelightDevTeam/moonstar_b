import { useState } from 'react';

const useHandleSubmit = () => {
  const [error, setError] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputSubmit = async (url, inputData) => {
    setLoading(true);
    setError(null);
    setErrMsg(null);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(inputData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422) {
          setError(data.errors);
        } else if (res.status === 401) {
          setErrMsg(data.message);
        } else {
          setError("An unexpected error occurred.");
        }
        return; // Early return on error
      }

      return data; // Return the successful response data

    } catch (error) {
      console.error("Error during fetch:", error);
      setError("An error occurred during the deposit process. Please try again.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return { inputSubmit, error, loading, errMsg };
};

export default useHandleSubmit;
