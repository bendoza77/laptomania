import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const LaptopContext = createContext();
const API_URL = import.meta.env.VITE_CLIENT_URL
const useLaptop = () => useContext(LaptopContext);

const LaptopProvider = ({ children }) => {
    
    const [laptops, useLaptops] = useState([]);

    const getLaptops = async () => {

        try {
            const req = await fetch(`${API_URL}/api/laptops`, {
                credentials: "include"
            });

            const res = await req.json();

            if (!req.ok) {
                throw new Error("Cant get laptops");
            }

            useLaptops(res);

        } catch (error) {
            console.log(error);
        }

    }

    const laptopDelete = async (laptopId) => {

        try {

            const req = await fetch(`${API_URL}/api/laptops/${laptopId}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (!req.ok) {
                throw new Error("Cant delete laptop");
            }

            useLaptops(laptops.filter(laptop => laptop._id !== laptopId));

        } catch (error) {
            console.log(error);
        }


    }

    const pacthLaptop = async (laptopsId, formData) => {

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

            if (!req.ok) {
                throw new Error("Cant update laptop");
            }

            useLaptops(prev => {
                return prev.map(el => {
                    return el._id === laptopsId ? res : el
                })
            })

        } catch (error) {
            console.log(error);
        }

    }

    const createLaptop = async (formData) => {

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

            useLaptops(prev => [...prev, res]);

        } catch (error) {
            console.log(error);
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