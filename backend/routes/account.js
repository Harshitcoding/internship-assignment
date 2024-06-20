const express = require("express");
const { Product } = require("../db");
const { authMiddleware } = require('../middleware');
const app = express();
app.use(express.json());


const router = express.Router();

router.post('/products', authMiddleware, async (req, res) => {
    
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
        }); 
        res.json(newProduct);
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
        const featuredProducts = await Product.find({ featured: true }); 
        res.json(featuredProducts); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching featured products' }); 
    }
});


router.get('/products/belowPrice', authMiddleware, async (req, res) => {
    const { maxPrice } = req.query; 
    if (!maxPrice) {
      return res.status(400).json({ message: 'Missing required parameter: maxPrice' });
    }
  
    try {
      const products = await Product.find({ price: { $lt: maxPrice } }); 
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  });


  router.get('/minRating', authMiddleware, async (req, res) => {
    const { minRating } = req.query; 
    try {
      let products;
      if (minRating) {
        
        products = await Product.find({ rating: { $gte: minRating } });
      } else {
        
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
