import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";

const Signup = () => {
    const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Phone number validation
    const validatePhone = (phone) => {
        // Indian phone number validation (10 digits)
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        // Validate phone number before submitting
        if (!validatePhone(form.phone)) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }
        
        setLoading(true);
        try {
            await axios.post("/signup", form);
            navigate("/signin");
        } catch (err) {
            const message = err?.response?.data?.error || "Please fill all fields correctly.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#1e1e2f] via-[#2b2b45] to-[#1e1e2f] px-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl dark:bg-black/20 transition-all duration-300">
                <h2 className="text-3xl font-bold text-white text-center mb-6 font-inter">Create an Account 🚀</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <FiUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2 bg-white/5 text-white border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="relative">
                        <FiMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-2 bg-white/5 text-white border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="relative">
                        <FiPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone number (10 digits)"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            maxLength="10"
                            pattern="[6-9][0-9]{9}"
                            className="w-full pl-10 pr-4 py-2 bg-white/5 text-white border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="relative">
                        <FiLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={form.password}
                            onChange={handleChange}
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
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-400 mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/signin")}
                        className="text-blue-400 hover:underline cursor-pointer"
                    >
                        Sign In
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;