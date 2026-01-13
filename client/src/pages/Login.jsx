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
        <>
            <form onSubmit={handleSubmit}>
                <input type="email" name="userEmail" placeholder="Enter your email" required/>
                <input type="password" name="userPassword" placeholder="Enter your passwrod" required/>
                <button>Login</button>
            </form>
        </>
    );


}

export default Login