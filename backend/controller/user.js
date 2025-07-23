const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.getSignin = (req, res) => {
    return res.status(200).json({ message: "Signin route is active" });
};

exports.getSignup = (req, res) => {
    return res.status(200).json({ message: "Signup route is active" });
};

exports.postSignup = async (req, res) => {
    const { name, email, phone, password } = req.body;
    
    // Detailed validation
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: "All fields are required: name, email, phone, and password" });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if phone is valid (Indian phone number - 10 digits starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: "Invalid phone number. Please enter a valid 10-digit phone number" });
    }

    // Password length validation
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    try {
        // Check if user already exists with email or phone
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });
        
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ error: "User already exists with this email" });
            }
            if (existingUser.phone === phone) {
                return res.status(400).json({ error: "User already exists with this phone number" });
            }
        }

        // Create user
        const user = await User.create({ name, email, phone, password });
        
        // Don't send password back in response
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        };

        return res.status(201).json({ 
            message: "User created successfully", 
            user: userResponse 
        });
    } catch (error) {
        console.error("Signup error:", error);
        
        // Handle specific mongoose errors
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errors.join(', ') });
        }
        
        if (error.code === 11000) {
            // Handle duplicate key error
            if (error.keyPattern.email) {
                return res.status(400).json({ error: "User already exists with this email" });
            }
            if (error.keyPattern.phone) {
                return res.status(400).json({ error: "User already exists with this phone number" });
            }
        }
        
        return res.status(500).json({ error: "User creation failed", details: error.message });
    }
};

exports.postSignin = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const { token, user } = await User.matchPasswordandGenerateToken(email, password);

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none', // Allow cross-origin requests
            secure: true,     // Required when sameSite is 'none' and for HTTPS
            maxAge: 24 * 60 * 60 * 1000 // Optional: set expiration (24 hours)
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(401).json({ error: "Invalid email or password" });
    }
};  

exports.logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
};

exports.getMe = async (req, res) => {
    try {
        const { user } = req; // assuming you're using middleware to decode token
        if (!user) return res.status(401).json({ error: "Not authenticated" });

        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        console.error("getMe error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
