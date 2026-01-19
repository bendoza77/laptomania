import { useEffect } from "react";
import { useLaptop } from "../../context/LaptopContext";
import Laptop from "../Laptop";

const Catalog = () => {

    const { getLaptops, laptops } = useLaptop();

    useEffect(() => {
        getLaptops();
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
            {laptops.map(el => (
                <Laptop key={el.id} el={el} />
            ))}
        </div>
    );
}

export default Catalog;
