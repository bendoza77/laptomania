import { useAuth } from "../context/AuthContext";

const Profile = () => {

    const { user } = useAuth();
    
    return (
        <>
            <h1>Welcome to profile page</h1>
            <p>Full name: {user?.fullname}</p>
            <p>Email: {user?.email}</p>
            <p>Phone Number: {user?.phoneNumber}</p>
            <p>Role: {user?.role}</p>
            <p>Is Verified: {user?.isVerified ? "Yes" : "No"}</p>
        </>
    );


}

export default Profile