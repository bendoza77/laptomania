import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

        const toastId = toast.loading("User Logout...");

        try {
            const req = await fetch(`${API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            })

            const res = await req.json();
            setUser(null);
            navigate("/login");

            toast.update(toastId, {
                render: "You logout succassefuly",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })


        } catch (error) {
            toast.update(toastId, {
                render: `Errro: ${error}`,
                type: "error",
                isLoading: false,
                autoClose: 2000
            })
        }


    }

    const signup = async (formObj) => {

        const toastId = toast.loading("User signup...");

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
                throw new Error(res.message);
            }

            setUser(res.data.user);
            navigate("/profile")
            toast.update(toastId, {
                render: "You singup succassefuly",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })

        } catch (error) {
            toast.update(toastId, {
                render: `Errro: ${error}`,
                type: "error",
                isLoading: false,
                autoClose: 2000
            })
        }


    }

    const login = async (formObj) => {

        const toastId = toast.loading("User login...");

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
                throw new Error(res.message);
            }

            setUser(res.data.user);
            navigate("/profile")
            toast.update(toastId, {
                render: "You login succassefuly",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })

        } catch (error) {
            toast.update(toastId, {
                render: `Errro: ${error}`,
                type: "error",
                isLoading: false,
                autoClose: 2000
            })
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