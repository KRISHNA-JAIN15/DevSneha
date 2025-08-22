const express = require("express")
const path = require("path")
const app = express();
require("dotenv").config()
const cookieParser = require("cookie-parser")

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));


const cors = require("cors");

app.use(cors({
  origin: [
    process.env.CLIENT_URL || "http://localhost:5173", // local frontend
    "https://dev-sneha.vercel.app" ,                    // deployed frontend
    "https://devsneha.krishnajain.tech"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));



const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const { checkForAuthenticationCookie } = require("./middleware/auth");

const PORT = process.env.PORT || 8000;
// app.set("view engine" , "ejs")
// app.set("views" , path.resolve("./views"));

app.use(express.json())

app.use(express.urlencoded({extended : false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

// app.get("/" , async (req , res) => {
//     res.render("homepage" ,{
//         user : req.user,
//     });
// })


app.use("/user" , userRoutes)
app.use("/product", productRoutes);

app.listen(PORT , () => console.log(`Server started on port ${PORT}`))
