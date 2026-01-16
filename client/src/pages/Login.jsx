import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formObj = {
            email: e.target.userEmail.value,
            password: e.target.userPassword.value
        }

        login(formObj);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" 
                        name="userEmail" 
                        placeholder="Enter your email" 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="password" 
                        name="userPassword" 
                        placeholder="Enter your password" 
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;