import { useEffect } from "react";
import { useLaptop } from "../context/LaptopContext";
import Laptop from "../components/Laptop";

const Products = () => {

    const { getLaptops, laptops } = useLaptop();

    useEffect(() => {
        getLaptops();
    }, []);

    return (
        <>
            <h1>Product Page</h1>
            {laptops.length === 0 ? (
                <h1>No laptops found</h1>
            ) : (
                laptops.map(el => <Laptop key={el._id} el={el} />)
            )}
        </>
    );


}

export default Products