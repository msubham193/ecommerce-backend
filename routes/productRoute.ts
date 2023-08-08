import express from "express";

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();
const {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
router.post("/admin/product/create", isAuthenticatedUser, createProduct);
router.get("/products/all", getAllProduct);
router.put("/admin/product/update", isAuthenticatedUser, updateProduct);
router.delete("/admin/product/delete", isAuthenticatedUser, deleteProduct);

module.exports = router;
