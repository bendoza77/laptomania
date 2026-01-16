const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-indigo-600">Laptomania</h1>
                </div>
            </nav>
            
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Laptomania</h2>
                    <p className="text-xl text-gray-600">Discover the best laptops for your needs</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="h-48 bg-gray-300"></div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Laptop {item}</h3>
                                <p className="text-gray-600 mb-4">High-performance laptop for professionals</p>
                                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;