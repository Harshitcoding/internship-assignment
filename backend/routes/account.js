const express = require("express");
const { Product } = require("../db"); // Assuming Product model is defined here
const { authMiddleware } = require('../middleware');
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Add a product
const router = express.Router();

router.post('/products', authMiddleware, async (req, res) => {
    // Adjust property names based on your model definition
    const { productId, name, price, featured, rating, createdAt, company } = req.body;

    try {
        const newProduct = await Product.create({
            productId,
            name,
            price,
            featured,
            rating,
            createdAt,
            company
        }); // Create product
        res.json(newProduct); // Send newly created product in response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product' }); // Handle errors
    }
});

router.get('/allproducts', authMiddleware, async (req, res) => {
    try {
        const products = await Product.find();
        return res.json({
            products
        }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' }); // Handle errors
    }
});


router.put('/updateProduct/:productId', authMiddleware, async (req, res) => {
    const { productId } = req.params;
    const { name, price, featured, rating, createdAt, company } = req.body;

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { productId: productId },
            {
                name,
                price,
                featured,
                rating,
                createdAt,
                company
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product' });
    }
});

router.delete('/deleteProduct/:productId', authMiddleware, async (req, res) => {
    const { productId } = req.params;

    try {
        const deletedProduct = await Product.findOneAndDelete({ productId: productId });

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({
            msg: "product is deleted"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product' });
    }
});


router.get('/featuredproducts', authMiddleware, async (req, res) => {
    try {
        const featuredProducts = await Product.find({ featured: true }); // Find products where featured is true
        res.json(featuredProducts); // Send the list of featured products in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching featured products' }); // Handle errors
    }
});


router.get('/products/belowPrice', authMiddleware, async (req, res) => {
    const { maxPrice } = req.query; // Get the maxPrice from query parameters
  
    if (!maxPrice) {
      return res.status(400).json({ message: 'Missing required parameter: maxPrice' });
    }
  
    try {
      const products = await Product.find({ price: { $lt: maxPrice } }); // Find products where price is less than maxPrice
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  });


  router.get('/minRating', authMiddleware, async (req, res) => {
    const { minRating } = req.query; // Get the minRating from query parameters
    try {
      let products;
      if (minRating) {
        // Find products with rating greater than or equal to minRating
        products = await Product.find({ rating: { $gte: minRating } });
      } else {
        // Fetch all products if no minRating provided (original behavior)
        products = await Product.find();
      }
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  });



  router.get('/products/:productId', authMiddleware, async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching product' });
    }
});


module.exports = router;
