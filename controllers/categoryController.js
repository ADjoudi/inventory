const Product = require("../models/product.js");
const Category = require("../models/category.js");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.add_category_get = asyncHandler(async (req, res, next) => {
  const [allProducts, allCategories] = await Promise.all([
    Product.find().exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);
  res.render(`${req.params.page}-add-category`, {
    title: "Add Category",
    products: allProducts,
    categories: allCategories,
  });
});
exports.add_category_post = [
  body("category", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({ name: req.body.category });

    if (!errors.isEmpty()) {
      const [allProducts, allCategories] = await Promise.all([
        Product.find().exec(),
        Category.find().sort({ name: 1 }).exec(),
      ]);
      res.render(`${req.params.page}-add-category`, {
        title: "Add Category",
        products: allProducts,
        categories: allCategories,
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      const categoryExists = await Category.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (categoryExists) {
        res.redirect(`/${req.params.page}`);
      } else {
        await category.save();
        res.redirect(`/${req.params.page}`);
      }
    }
  }),
];
exports.delete_category_post = asyncHandler(async (req, res, next) => {
  const [category, allProductsInCategory, allCategories] = await Promise.all([
    Category.findById(req.params.category_id).exec(),
    Product.find({ category: req.params.category_id }).exec(),
    Category.find().sort({ name: 1 }).exec(),
  ]);

  console.log(category, !allProductsInCategory.length);
  allProductsInCategory.length > 0
    ? res.render("products", {
        products: allProductsInCategory,
        categories: allCategories,
        selected_category: res.selected_category,
        show: true,
      })
    : await Category.findByIdAndRemove(category._id);

  res.redirect("/products");
});
