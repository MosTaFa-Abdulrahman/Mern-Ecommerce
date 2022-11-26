const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

// Create Product (Admin)
router.post("/create", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Update Product (Admin)
router.put("/update/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Product (Admin)
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Product
router.get("/get/:id", async (req, res, next) => {
  try {
    const getProduct = await Product.findById(req.params.id);
    res.status(200).json(getProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Product
router.get("/", async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
