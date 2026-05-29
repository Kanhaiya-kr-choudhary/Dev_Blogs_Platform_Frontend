import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-10">
            <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-indigo-600">
                    DevBlogs ✍️
                </Link>

                {/* Links */}
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-gray-600 hover:text-indigo-600">
                        Home
                    </Link>

                    {user ? (
                        <>
                            <span className="text-gray-500">Hi, {user.username} 👋</span>
                            <Link
                                to="/create"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                            >
                                Write Blog
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
}

export default Navbar;