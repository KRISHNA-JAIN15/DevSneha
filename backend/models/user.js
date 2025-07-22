const mongoose = require("mongoose");
const crypto = require("crypto");
const { createToken } = require("../services/auth");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate: {
            validator: function(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: "Please enter a valid email address"
        }
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        validate: {
            validator: function(phone) {
                // Indian phone number validation (10 digits starting with 6-9)
                return /^[6-9]\d{9}$/.test(phone);
            },
            message: "Please enter a valid 10-digit phone number"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    salt: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });

userSchema.static("matchPasswordandGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvided = crypto.createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    if (hashedPassword !== userProvided) throw new Error("Incorrect Password");

    const token = createToken(user);
    return { token, user };
});

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    const salt = crypto.randomBytes(16).toString();
    const hashedPassword = crypto.createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;