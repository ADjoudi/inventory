const Product = require("../models/product.js");
const Category = require("../models/category.js");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

exports.product_list_all = asyncHandler(async (req, res, next) => {
  const [allProducts, allCategories] = await Promise.all([
    Product.find().populate("category").exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  console.log(allProducts);
  res.render("products", {
    products: allProducts,
    categories: allCategories,
    selected_category: res.selected_category,
  });
});
exports.product_list_in_category = asyncHandler(async (req, res, next) => {
  const [allProductsInCategory, allCategories] = await Promise.all([
    Product.find({ category: req.params.page }).populate("category").exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  res.render("products", {
    products: allProductsInCategory,
    categories: allCategories,
    selected_category: res.selected_category,
  });
});

exports.add_product_get = asyncHandler(async (req, res, next) => {
  const [allProducts, allCategories] = await Promise.all([
    Product.find().populate("category").exec(),
    Category.find().exec(),
  ]);

  res.render(`${req.params.page}-add-product`, {
    title: "Add Product",
    products: allProducts,
    categories: allCategories,
  });
});
exports.add_product_post = [
  body("product", "Name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category").escape(),
  body("brand", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "PRice must not be empty").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    const category = await Category.findById(req.body.category);

    const product = new Product({
      name: req.body.product,
      category: category._id,
      brand: req.body.brand,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      const [allProducts, allCategories] = await Promise.all([
        Product.find().populate("category").exec(),
        Category.find().exec(),
      ]);

      res.render("products-add-product", {
        title: "Add Product",
        products: allProducts,
        categories: allCategories,
        errors: errors.array(),
      });
    } else {
      // Data from form is valid. Save book.
      await product.save();
      res.redirect(product.url);
    }
  }),
];

exports.delete_product_post = asyncHandler(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.product_id);
  res.redirect("/products");
});
