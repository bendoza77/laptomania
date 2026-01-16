import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navStyles = "flex items-center justify-between bg-gray-800 text-white px-6 py-4 shadow-lg";
const buttonStyles = "mx-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-200";
const linkStyles = "text-white text-lg font-bold";

const Nav = () => {
    const { user, logout } = useAuth();
 
    return (
        <header className={navStyles}>
            <Link to="/" className={linkStyles}>Laptomania</Link>
            <nav className="flex items-center space-x-4">
                {user === null && <Link to="/signup"><button className={buttonStyles}>Sign up</button></Link>}
                {user === null && <Link to="/login"><button className={buttonStyles}>Login</button></Link>}
                <Link to="/"><button className={buttonStyles}>Home</button></Link>
                {user !== null && <Link to="/profile"><button className={buttonStyles}>Profile</button></Link>}
                {user !== null && <button onClick={logout} className={buttonStyles}>Log Out</button>}
                {user !== null && <Link to="/products"><button className={buttonStyles}>Products</button></Link>}
            </nav>
        </header>
    );
};

export default Nav;