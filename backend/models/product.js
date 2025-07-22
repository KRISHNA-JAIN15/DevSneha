const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
},
    description: String,
    price: { 
        type: Number, 
        required: true 
    },
    tag: { 
        type: String, enum: ["rakhi", "Vastra"], 
        required: true 
    },
    imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
