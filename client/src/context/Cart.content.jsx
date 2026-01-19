import { useState } from "react";
import { useContext, createContext } from "react";
import { GetLocalStorage, SetLocalStorage } from "../utils/LocalStorage";

const CartContext = createContext();
const useCart = () => useContext(CartContext);

const CartProvider = ({children}) => {

    const [cart, setCart] = useState(GetLocalStorage("cart") || []);
    const [side, setSide] = useState(false);

    const addCart = (laptop) => {

        const chek = cart.find(el => el._id === laptop._id);

        if (chek) {
            const updateCart = cart.map(el => el._id === laptop._id ? {...laptop, quantity: el.quantity + 1} : el);
            setCart(prev => {
                SetLocalStorage("cart", updateCart);
                return updateCart
            })
        } else {
            setCart(prev => {
                SetLocalStorage("cart", [...prev, {...laptop, quantity: 1}])
                return [...prev, {...laptop, quantity: 1}];
            })
        }

        setSide(true);

    }

    const deleteCart = (laptopId) => {

        const updateCart = cart.filter(el => el._id !== laptopId);

        setCart(prev => {
            SetLocalStorage("cart", updateCart);
            return updateCart;
        })

    }

    const handleMinus = (laptop) => {

        if (laptop.quantity > 1) {
            const updateCart = cart.map(el => el._id === laptop._id ? {...laptop, quantity: el.quantity - 1} : el);
            setCart(prev => {
                SetLocalStorage("cart", updateCart);
                return updateCart
            })
        } else {
            const updateCart = cart.filter(el => el._id !== laptop._id);
            setCart(prev => {
                SetLocalStorage("cart", updateCart);
                return updateCart
            })
        }

    }

    const handlePlus = (laptop) => {
        const updateCart = cart.map(el => el._id === laptop._id ? {...laptop, quantity: el.quantity + 1} : el);
        setCart(prev => {
            SetLocalStorage("cart", updateCart);
            return updateCart
        })
    }

    const handleClearCart = () => {
        setCart(prev => {
            SetLocalStorage("cart", []);
            return [];
        })
    }


    return (
        <>
            <CartContext.Provider value={{cart, addCart, deleteCart, handleMinus, handlePlus, handleClearCart, side, setSide}}>
                {children}
            </CartContext.Provider>
        </>
    );


}

export { useCart, CartProvider }
