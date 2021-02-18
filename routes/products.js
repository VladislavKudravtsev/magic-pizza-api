const express = require("express");
const ProductController = require("../controllers/productController");
const cache = require("../middlewares/cacheMiddleware");

const router = express.Router();

router.get("/", [cache.get, ProductController.list, cache.set]);

router.get("/:id", [cache.get, ProductController.findById, cache.set]);

router.post("/", [cache.clear, ProductController.insert]);

router.delete("/:id", [cache.clear, ProductController.removeById]);

router.patch("/:id", [cache.clear, ProductController.patchById]);

module.exports = router;
