var express = require("express");
var router = express.Router();
const homeController = require("../controllers/homeController");
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");

router.get("/:page/add-category", categoryController.add_category_get);
router.post("/:page/add-category", categoryController.add_category_post);

router.get("/:page/add-product", productController.add_product_get);
router.post("/:page/add-product", productController.add_product_post);

router.get("/", function (req, res, next) {
  res.redirect("/home/all");
});
router.get("/home", (req, res, next) => res.redirect("/home/all"));
router.get("/home/:page/", (req, res, next) => {
  res.selected_category = req.params.page;
  next();
});
router.get("/home/all", homeController.product_list_all);
router.get("/home/:page", homeController.product_list_in_category);

router.get("/products", function (req, res, next) {
  res.redirect("/products/all");
});
router.get("/products/:page/", (req, res, next) => {
  res.selected_category = req.params.page;
  next();
});
router.get("/products/all", productController.product_list_all);
router.get("/products/:page/", productController.product_list_in_category);
router.post(
  "/products/category/:category_id/delete",
  categoryController.delete_category_post
);
router.post(
  "/products/product/:product_id/delete",
  productController.delete_product_post
);

module.exports = router;
