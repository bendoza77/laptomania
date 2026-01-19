import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLaptop } from "../context/LaptopContext";
import { useCart } from "../context/Cart.content";

const Laptop = (el) => {

    const pro = el.el
    const { user } = useAuth();
    const { laptopDelete, pacthLaptop } = useLaptop();
    const [isOpen, setIsOpen] = useState(false);
    const { addCart } = useCart();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            brand: e.target.brand.value,
            model: e.target.model.value,
            processor: e.target.processor.value,
            ram: e.target.ram.value,
            storage: e.target.storage.value,
            graphicCard: e.target.graphicCard.value,
            screenSize: e.target.screenSize.value,
            price: e.target.price.value
        }
        pacthLaptop(pro._id, formData);
        setIsOpen(false);
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                
                {/* Images Section */}
                <div className="flex flex-wrap gap-4 p-6 bg-gray-100">
                    {pro.images.map((image, index) => (
                        <img 
                            key={index} 
                            className="w-32 h-32 object-cover rounded-lg shadow" 
                            src={image.url} 
                            alt="" 
                        />
                    ))}
                </div>

                {/* Details Section */}
                <div className="p-6">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">{pro.brand} {pro.model}</h2>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <p className="text-gray-700"><span className="font-semibold">Processor:</span> {pro.processor}</p>
                        <p className="text-gray-700"><span className="font-semibold">RAM:</span> {pro.ram}</p>
                        <p className="text-gray-700"><span className="font-semibold">Storage:</span> {pro.storage}</p>
                        <p className="text-gray-700"><span className="font-semibold">Graphic Card:</span> {pro.graphicCard}</p>
                        <p className="text-gray-700"><span className="font-semibold">Screen Size:</span> {pro.screenSize}</p>
                        <p className="text-2xl font-bold text-blue-600">Price: ${pro.price}</p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 flex-wrap">
                        {["admin", "moderator"].includes(user?.role) && (
                            <>
                                <button 
                                    onClick={() => laptopDelete(pro._id)}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
                                >
                                    Delete Laptop
                                </button>
                                <button 
                                    onClick={() => setIsOpen(true)}
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
                                >
                                    Update Laptop
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => addCart(pro)} 
                            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 active:scale-95 transition-all duration-200">
                            Add to Cart
                        </button>
                    </div>
                </div>


                {/* Update Form Modal */}
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
                            <h3 className="text-2xl font-bold mb-6">Update Laptop</h3>
                            <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="brand" placeholder="Brand" />
                            <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="model" placeholder="Model" />
                            <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="processor" placeholder="Processor" />
                            <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="ram" placeholder="RAM" />
                            <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="storage" placeholder="Storage" />
                            <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="graphicCard" placeholder="Graphic Card" />
                            <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="screenSize" placeholder="Screen Size" />
                            <input className="w-full mb-6 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" name="price" placeholder="Price" />
                            <input className="w-full mb-6 p-2 border border-gray-300 rounded-lg" type="file" name="images" multiple/>
                            <div className="flex gap-3">
                                <button type="submit" className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition">Update</button>
                                <button type="button" className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition">Cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Laptop;