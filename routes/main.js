const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Reviews = require("../models/reviews");
const { query } = require("express");
const reviews = require("../models/reviews");

// router.get("/generate-fake-data", (req, res, next) => {
//   for (let i = 0; i < 90; i++) {
//     let product = new Product();

//     product.category = faker.commerce.department();
//     product.name = faker.commerce.productName();
//     product.price = faker.commerce.price();
//     product.image = "https://via.placeholder.com/250?text=Product+Image";

//     product.save();
//   }
//   res.end();
// });

router.get("/products", (req, res, next) => {
  const page = req.query.page || 1;
  const limit = 9;

  Product.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/products/:product", (req, res, next) => {
  const id = req.params.product;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.send(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

router.get("/products/:product/review", (req, res, next) => {
  const pages = req.query.page || 1;
  const id = req.params.product;
  const limit = 4;

  Product.findById(id)
    .populate("reviews")
    .then((product) => {
      if (!product) {
        return res.status(404).send("Product not found");
      }

      const start = (pages - 1) * limit;
      const end = pages * limit;

      const paginatedReviews = product.reviews.slice(start, end);

      if (paginatedReviews.length === 0) {
        return res.status(404).send("No reviews found");
      }

      res.send(paginatedReviews);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

module.exports = router;
