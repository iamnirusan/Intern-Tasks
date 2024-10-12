const express = require("express");
const router = express.Router();
const productscontroller = require("../controllers/productscontroller"); // Import the products controller

// View All Records - Home page to list all products
router.get("/", productscontroller.view);

// Add New Record - Render form to add new product
router.get("/addproduct", productscontroller.addproduct);

// Save New Record - Handle form submission to add product
router.post("/addproduct", productscontroller.save);

// Edit Record - Render form with existing product details for editing
router.get("/editproduct/:id", productscontroller.editproduct);

// Update Record - Handle form submission to update product details
router.post("/editproduct/:id", productscontroller.edit);

// Delete Record - Remove a product by its ID
router.get("/deleteproduct/:id", productscontroller.deleteproduct);

// View Single Record - Display details of a single product
router.get("/showproduct/:id", productscontroller.viewproduct);

module.exports = router; // Export the router to be used in other parts of the application
