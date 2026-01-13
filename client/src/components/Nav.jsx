import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Nav = () => {

    const { user, logout } = useAuth();
 
    return (
        <>
            <header>
                {user === null && <Link to={"/signup"}><button>Sign up</button></Link>}
                {user === null && <Link to={"/login"}><button>Login</button></Link>}
                <Link to={"/"}><button>Home</button></Link>
                {user !== null && <Link to={"/Profile"}><button>Profile</button></Link>}
                {user !== null && <button onClick={logout}>Log Out</button>}
            </header>
        </>
    );


}

export default Nav
