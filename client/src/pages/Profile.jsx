import { useAuth } from "../context/AuthContext";

const Profile = () => {

    const { user } = useAuth();
    
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
        </div>
    );
}

export default Profile;