import { useState } from "react";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await axios.post("/signin", { email, password }, { withCredentials: true });
            dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
            navigate("/");
        } catch (err) {
            const message = err?.response?.data?.message || "Invalid email or password.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#1e1e2f] via-[#2b2b45] to-[#1e1e2f] px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl dark:bg-black/20 transition-all duration-300">
                <h2 className="text-3xl font-bold text-white text-center mb-6 font-inter">Welcome Back 👋</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-2 bg-white/5 text-white border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="relative">
                        <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-2 bg-white/5 text-white border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-md font-semibold transition-all duration-300 ${
                            loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white"
                        }`}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-400 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Signin;
