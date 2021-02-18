const express = require("express");
const PizzaController = require("../controllers/pizzaController");
const cache = require("../middlewares/cacheMiddleware");

const router = express.Router();

router.get("/", [cache.get, PizzaController.list, cache.set]);

router.get("/:id", [cache.get, PizzaController.findById, cache.set]);

router.post("/", [cache.clear, PizzaController.insert]);

router.delete("/:id", [cache.clear, PizzaController.removeById]);

router.patch("/:id", [cache.clear, PizzaController.patchById]);

module.exports = router;
