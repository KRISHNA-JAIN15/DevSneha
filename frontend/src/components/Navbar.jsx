import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import axios from '../api/axios';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [logoError, setLogoError] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get("/logout", { withCredentials: true });
            dispatch(logout());
            navigate("/signin");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const navLinkClass = "relative px-3 py-2 rounded-lg transition-all duration-300 hover:text-blue-400 hover:bg-gray-800/50 before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-blue-400 before:to-purple-500 before:transition-all before:duration-300 hover:before:w-full";
    const mobileNavLinkClass = "block px-4 py-3 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-blue-600/30 hover:text-white hover:shadow-lg hover:translate-x-2 border-l-4 border-transparent hover:border-blue-400";

    return (
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md border-b border-gray-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="group flex items-center space-x-3">
                            <div className="relative">
                                {!logoError ? (
                                    <img 
                                        src="/assets/logo.png" 
                                        alt="DevSneha Logo" 
                                        className="h-10 w-10 rounded-xl shadow-lg group-hover:scale-110 transition-all duration-300 group-hover:shadow-xl object-cover"
                                        onError={() => setLogoError(true)}
                                        onLoad={() => console.log('Logo loaded successfully')}
                                    />
                                ) : (
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                                        D
                                    </div>
                                )}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:via-pink-400 group-hover:to-blue-400 transition-all duration-300">
                                DevSneha
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2 text-sm font-medium">
                        <Link to="/" className={navLinkClass}>Home</Link>
                        <Link to="/about" className={navLinkClass}>About</Link>
                        <Link to="/contact" className={navLinkClass}>Contact Us</Link>

                        {isAuthenticated && (
                            <>
                                <Link to="/rakhi" className={navLinkClass}>Accessories</Link>
                                <Link to="/vastra" className={navLinkClass}>Vastra</Link>

                                {user?.role === 'admin' && (
                                    <Link to="/add-product" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center space-x-1">
                                        <span className="text-lg">+</span>
                                        <span>Add Product</span>
                                    </Link>
                                )}
                            </>
                        )}

                        {!isAuthenticated && (
                            <div className="flex items-center space-x-2">
                                <Link to="/signin" className="px-4 py-2 rounded-lg border border-gray-600 hover:border-blue-400 transition-all duration-300 hover:bg-blue-400/10 hover:text-blue-400">
                                    Login
                                </Link>
                                <Link to="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:scale-105 font-medium">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Section - User Info */}
                    {isAuthenticated && (
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-800/50 rounded-xl border border-gray-700">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-sm font-semibold">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">Hi, {user?.name}</span>
                                    {user?.role === 'admin' && (
                                        <span className="text-xs text-yellow-400 font-medium">Admin</span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors duration-300"
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6 text-white" />
                            ) : (
                                <Bars3Icon className="h-6 w-6 text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-gradient-to-br from-gray-900 via-purple-900/90 to-blue-900/90 backdrop-blur-lg text-white shadow-2xl border-t border-gray-700/50 animate-slideDown">
                    <div className="px-6 py-6 space-y-2">
                        <Link
                            to="/"
                            className={mobileNavLinkClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            🏠 Home
                        </Link>
                        <Link
                            to="/about"
                            className={mobileNavLinkClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            📖 About
                        </Link>
                        <Link
                            to="/contact"
                            className={mobileNavLinkClass}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            📧 Contact Us
                        </Link>

                        {isAuthenticated && (
                            <>
                                <Link
                                    to="/rakhi"
                                    className={mobileNavLinkClass}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    🎀 Accessories
                                </Link>
                                <Link
                                    to="/vastra"
                                    className={mobileNavLinkClass}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    👗 Vastra
                                </Link>

                                {user?.role === "admin" && (
                                    <Link
                                        to="/add-product"
                                        className="block mx-4 my-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-3 rounded-xl text-center font-medium transition-all duration-300 hover:shadow-xl hover:scale-105"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        ➕ Add Product
                                    </Link>
                                )}
                            </>
                        )}

                        {!isAuthenticated && (
                            <div className="space-y-2 pt-4 border-t border-gray-600/50">
                                <Link
                                    to="/signin"
                                    className="block mx-4 px-4 py-3 rounded-xl border-2 border-blue-400/50 hover:border-blue-400 hover:bg-blue-400/10 text-center transition-all duration-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    🔑 Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block mx-4 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-center font-medium transition-all duration-300 hover:shadow-xl hover:scale-105"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    ✨ Sign Up
                                </Link>
                            </div>
                        )}

                        {isAuthenticated && (
                            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-600/50">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center font-semibold">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <span className="block font-medium">Hi, {user?.name}</span>
                                        {user?.role === "admin" && (
                                            <span className="text-yellow-400 text-sm font-medium">Admin User</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:shadow-lg"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
