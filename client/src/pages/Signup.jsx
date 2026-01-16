import { useAuth } from "../context/AuthContext";

const Signup = () => {
    const { signup } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formObj = {
            fullname: e.target.userName.value,
            email: e.target.userEmail.value,
            password: e.target.userPassword.value,
            phoneNumber: e.target.userNumber.value
        }
        signup(formObj);
        e.target.reset();
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="userName" placeholder="Enter your name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    <input type="email" name="userEmail" placeholder="Enter your email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    <input type="password" name="userPassword" placeholder="Enter your password" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    <input type="text" name="userNumber" placeholder="Enter your phone number" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg transition duration-200">Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;