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

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userName" placeholder="Enter your name" required/>
                <input type="email" name="userEmail" placeholder="Enter your email" required/>
                <input type="password" name="userPassword" placeholder="Enter your passwrod" required/>
                <input type="text" name="userNumber" placeholder="Enter your phone number" required />
                <button>Sign up</button>
            </form>
        </>
    );


}

export default Signup