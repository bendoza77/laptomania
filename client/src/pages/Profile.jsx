import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLaptop } from "../context/LaptopContext";
import Catalog from "../components/utils/Catalog";
import { useCart } from "../context/Cart.content";

const Profile = () => {
    const [open, useOpen] = useState(false);
    const { user } = useAuth();
    const { createLaptop } = useLaptop();


    const handleCreate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("brand", e.target.brand.value);
        formData.append("model", e.target.model.value);
        formData.append("processor", e.target.processor.value);
        formData.append("ram", e.target.ram.value);
        formData.append("storage", e.target.storage.value);
        formData.append("graphicsCard", e.target.graphicsCard.value);
        formData.append("screenSize", e.target.screenSize.value);
        formData.append("price", e.target.price.value);

        for (let i = 0; i < e.target.images.files.length; i++) {
            formData.append("images", e.target.images.files[i]);
        }
        createLaptop(formData);
        useOpen(false);
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Profile</h1>
                
                <div className="space-y-4">
                    <div className="border-b pb-4">
                        <p className="text-sm text-gray-600">Full Name</p>
                        <p className="text-lg font-semibold text-gray-800">{user?.fullname}</p>
                    </div>
                    
                    <div className="border-b pb-4">
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
                    </div>
                    
                    <div className="border-b pb-4">
                        <p className="text-sm text-gray-600">Phone Number</p>
                        <p className="text-lg font-semibold text-gray-800">{user?.phoneNumber}</p>
                    </div>
                    
                    <div className="border-b pb-4">
                        <p className="text-sm text-gray-600">Role</p>
                        <p className="text-lg font-semibold text-gray-800">{user?.role}</p>
                    </div>
                    
                    <div className="pb-4">
                        <p className="text-sm text-gray-600">Verification Status</p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${user?.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {user?.isVerified ? "Verified" : "Not Verified"}
                        </span>
                    </div>
                </div>
            </div>

            {["admin", "moderator"].includes(user?.role) && <Catalog />}

            {/* Create Form Modal */}
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <form onSubmit={handleCreate} encType="multipart/form-data" className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
                        <h3 className="text-2xl font-bold mb-6">Create Laptop</h3>
                        <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="brand" placeholder="Brand" required/>
                        <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="model" placeholder="Model" required/>
                        <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="processor" placeholder="Processor" required/>
                        <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="ram" placeholder="RAM" required/>
                        <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="storage" placeholder="Storage" required/>
                        <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="graphicsCard" placeholder="Graphic Card" required/>
                        <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" name="screenSize" placeholder="Screen Size" required/>
                        <input className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" name="price" placeholder="Price" required/>
                        <input className="w-full mb-6 p-2 border border-gray-300 rounded-lg" type="file" name="images" multiple required/>
                        <div className="flex gap-3">
                            <button className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition">Create</button>
                            <button onClick={() => useOpen(false)} className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {user?.role === "admin" && (
                <button 
                    onClick={() => useOpen(true)}
                    className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
                >
                    Create Laptop
                </button>
            )}
        </div>
    );
}

export default Profile;