const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Reviews = require("../models/reviews");
const { query } = require("express");

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

module.exports = router;
