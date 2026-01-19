import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const LaptopContext = createContext();
const API_URL = import.meta.env.VITE_CLIENT_URL
const useLaptop = () => useContext(LaptopContext);

const LaptopProvider = ({ children }) => {
    
    const [laptops, setLaptops] = useState([]);

    const getLaptops = async () => {

        try {
            const req = await fetch(`${API_URL}/api/laptops`, {
                credentials: "include"
            });

            const res = await req.json();

            if (!req.ok) {
                throw new Error("Cant get laptops");
            }

            setLaptops(res);

        } catch (error) {
            console.log(error);
        }

    }

    const laptopDelete = async (laptopId) => {

        const toastId = toast.loading("Deleting laptop...");

        try {

            const req = await fetch(`${API_URL}/api/laptops/${laptopId}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (!req.ok) {
                throw new Error("Cant delete laptop");
            }

            setLaptops(laptops.filter(laptop => laptop._id !== laptopId));

            toast.update(toastId, {
                render: "Laptop deletd succassefuly",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })

        } catch (error) {
            toast.update(toastId, {
                render: `Error: ${error}`,
                type: "error",
                isLoading: false,
                autoClose: 2000
            })
        }


    }

    const pacthLaptop = async (laptopsId, formData) => {

        const toastId = toast.loading("Updateing laptop...");

        try {

            const req = await fetch(`${API_URL}/api/laptops/${laptopsId}`, {
                method: "PATCH",
                credentials: "include",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const res = await req.json();
            console.log(res);

            if (!req.ok) {
                throw new Error("Cant update laptop");
            }

            setLaptops(prev => {
                return prev.map(el => {
                    return el._id === laptopsId ? res : el
                })
            })

            toast.update(toastId, {
                render: "Laptop update succassefuly",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })

        } catch (error) {
            toast.update(toastId, {
                render: `Error ${error}`,
                type: "error",
                isLoading: false,
                autoClose: 2000
            })
        }

    }

    const createLaptop = async (formData) => {

        const toastId = toast.loading("creating laptop...");
        

        try {

            const req = await fetch(`${API_URL}/api/laptops`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const res = await req.json();

            if (!req.ok) {
                throw new Error("Cant create laptop");
            }

            setLaptops(prev => [...prev, res]);
            toast.update(toastId, {
                render: "Laptop created succassefuly",
                type: "success",
                isLoading: false,
                autoClose: 2000
            })

        } catch (error) {
            toast.update(toastId, {
                render: `Error ${error}`,
                type: "error",
                isLoading: false,
                autoClose: 2000
            })
        }


        
    }


    return (
        <>
            <LaptopContext.Provider value={{laptops, getLaptops, laptopDelete, pacthLaptop, createLaptop}}>
                {children}
            </LaptopContext.Provider>
        </>
    );

}

export { LaptopProvider, useLaptop };