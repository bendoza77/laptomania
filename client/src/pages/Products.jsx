import { useEffect } from "react";
import { useLaptop } from "../context/LaptopContext";
import Laptop from "../components/Laptop";

const Products = () => {
    const { getLaptops, laptops } = useLaptop();

    useEffect(() => {
        getLaptops();
    }, [getLaptops]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-5xl font-bold text-white mb-12 text-center">
                    Our Products
                </h1>
                
                {laptops.length === 0 ? (
                    <div className="flex items-center justify-center h-96">
                        <h2 className="text-3xl font-semibold text-gray-300">
                            No laptops found
                        </h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {laptops.map(el => (
                            <Laptop key={el._id} el={el} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;