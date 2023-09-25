var express = require("express");
var router = express.Router();
const fakeproducts = [
  {
    image: "/images/1.jpg",
    name: "Macbook Laptop Pro M3",
    brand: "Apple",
    rating: 4.9,
    number_of_ratings: 900,
    price: 1200,
  },
  {
    image: "/images/1.jpg",
    name: "Macbook Laptop Pro M3",
    brand: "Apple",
    rating: 4.9,
    number_of_ratings: 900,
    price: 1200,
  },
  {
    image: "/images/1.jpg",
    name: "Macbook Laptop Pro M3",
    brand: "Apple",
    rating: 4.9,
    number_of_ratings: 900,
    price: 1200,
  },
];
const fakecategories = [
  { name: "Computer" },
  { name: "Laptops" },
  { name: "Chairs" },
];
/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/home");
});
router.get("/home", function (req, res, next) {
  res.render("index", { products: fakeproducts, categories: fakecategories });
});
router.get("/products", function (req, res, next) {
  res.render("products", {
    products: fakeproducts,
    categories: fakecategories,
  });
});
router.get("/:page/add-category", function (req, res, next) {
  res.render(`${req.params.page}-add-category`, {
    title: "Add Category",
    products: fakeproducts,
    categories: fakecategories,
  });
});
router.get("/:page/add-product", function (req, res, next) {
  res.render(`${req.params.page}-add-product`, {
    title: "Add Product",
    products: fakeproducts,
    categories: fakecategories,
  });
});

module.exports = router;
