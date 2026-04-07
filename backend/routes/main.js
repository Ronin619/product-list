const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Reviews = require("../models/reviews");
const { query } = require("express");
const product = require("../models/product");

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save();
  }
  res.end();
});

router.get("/products", (req, res, next) => {
  const page = req.query.page || 1;
  const limit = 9;
  const { category, price, name } = req.query;

  const filter = {};

  if (category)
    filter.category =
      category.trim().charAt(0).toUpperCase() + category.trim().slice(1);

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  let sortValue;
  if (price === "highest") {
    sortValue = -1;
  } else {
    sortValue = 1;
  }

  let sortOption = {};
  if (sortValue !== 0) sortOption.price = sortValue;

  Product.countDocuments(filter)
    .then((total) => {
      return Product.find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .then((products) => {
          res.status(200).json({
            products,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
          });
        });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get("/categories", (req, res, next) => {
  Product.distinct("category")
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server error");
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

router.post("/products", (req, res, next) => {
  const { category, name, price, image } = req.body;

  const newProduct = new Product({
    category,
    name,
    price,
    image,
  });

  newProduct
    .save()
    .then((savedProduct) => {
      res.send(savedProduct);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send("Server error");
    });
});

router.post("/products/:product/reviews", (req, res, next) => {
  const { userName, text } = req.body;
  const id = req.params.product;

  const newReview = new Reviews({
    userName,
    text,
    product: id,
  });

  newReview
    .save()
    .then((savedReview) => {
      return Product.findByIdAndUpdate(
        id,
        { $push: { reviews: savedReview._id } },
        { new: true },
      );
    })
    .then((updatedProduct) => {
      return Product.populate(updatedProduct, { path: "reviews" });
    })
    .then((populatedProduct) => {
      res.status(201).send(populatedProduct);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving review");
    });
});

router.delete("/products/:product", (req, res, next) => {
  const id = req.params.product;

  Product.findByIdAndDelete(id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).send("Product not found");
      }
      res.status(200).send(deletedProduct);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("server error");
    });
});

router.delete("/reviews/:review", (req, res, next) => {
  const id = req.params.review;

  Reviews.findByIdAndDelete({ _id: id })
    .then((deletedReview) => {
      if (!deletedReview) {
        return res.status(404).send("Review not found");
      }
      res.status(200).send(deletedReview);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("server error");
    });
});

module.exports = router;
