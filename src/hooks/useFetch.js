import { useState, useEffect } from "react";

const useFetch = (url, method = "GET") => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(null);

    // Function to handle POST/PUT requests
    const postData = (data, method) => {
        setOptions({
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    };

    // ✅ Move fetchData OUTSIDE useEffect so it can be returned
    const fetchData = async (fetchOptions = {}) => {
        setIsLoading(true);

        try {
            const res = await fetch(url, { method, ...fetchOptions });
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const result = await res.json();
            console.log("API Response:", result); // ✅ Debugging API response
            setData(result);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.log(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (method === "GET") {
            fetchData();
        } else if (options) {
            console.log("POST/PUT Options:", options);
            fetchData(options);
        }
    }, [url, options, method]);

    return { data, isLoading, error, postData, refetch: fetchData };
};

export default useFetch;
