import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);
const API_URL = import.meta.env.VITE_CLIENT_URL

const AuthProviver = ({children}) => {

    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {

            try {

                const req = await fetch(`${API_URL}/api/auth/autho-login`, {
                    method: "POST",
                    credentials: "include"
                })

                const res = await req.json();

                if (!req.ok) {
                    throw new Error('User is not login');
                }
                
                setUser(res.data.user);
                navigate("/profile")

            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const logout = async () => {

        try {
            const req = await fetch(`${API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            })

            const res = await req.json();
            alert(res.message);
            setUser(null);
            navigate("/login");


        } catch (error) {
            console.log(error);
        }


    }

    const signup = async (formObj) => {


        try {

            const req = await fetch(`${API_URL}/api/auth/signup`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj)
            });

            const res = await req.json();
            if (!req.ok) {
                alert(res.message);
            }

            setUser(res.data.user);
            alert(res.message);
            navigate("/profile")

        } catch (error) {
            console.log(error);
        }


    }

    const login = async (formObj) => {

        try {

            const req = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj)
            });

            const res = await req.json();

            if (!req.ok) {
                alert(res.message);
            }

            setUser(res.data.user);
            alert(res.message);
            navigate("/profile")

        } catch (error) {
            console.log(error);
        }

    }




    return (
        <>
            <AuthContext.Provider value={{signup, login, user, logout}}>
                {children}
            </AuthContext.Provider>
        </>
    );

}

export { useAuth, AuthProviver };