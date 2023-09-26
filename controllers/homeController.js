const Product = require("../models/product.js");
const Category = require("../models/category.js");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.product_list_all = asyncHandler(async (req, res, next) => {
  const [allProducts, allCategories] = await Promise.all([
    Product.find().exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);
  res.render("index", {
    products: allProducts,
    categories: allCategories,
    selected_category: res.selected_category,
  });
});
exports.product_list_in_category = asyncHandler(async (req, res, next) => {
  const [allProductsInCategory, allCategories] = await Promise.all([
    Product.find({ category: req.params.page }).exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);
  res.render("index", {
    products: allProductsInCategory,
    categories: allCategories,
    selected_category: res.selected_category,
  });
});
