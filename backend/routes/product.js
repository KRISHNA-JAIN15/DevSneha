const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const checkAdmin = require("../middleware/admin");

const {
    addProduct,
    updateProduct,
    getProducts,
    getProductsByTag,
    deleteProduct
} = require("../controller/product");

router.post("/add", checkAdmin, upload.single("image"), addProduct);

router.put("/update/:id", checkAdmin, upload.single("image"), updateProduct);

router.get("/", getProducts);

router.get("/tag/:tag", getProductsByTag);

router.delete("/:id", checkAdmin , deleteProduct);

module.exports = router;
