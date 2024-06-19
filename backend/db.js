const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://harshit:jyeZvRA5dgSyCMDA@cluster0.ao4jlp5.mongodb.net/internship")

// Define the User Schema

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
  },
  products: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product'
  }
});

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, 'Product ID is required'],
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  featured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: mongoose.Decimal128,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot be more than 5']
  },
  createdAt: {
    type: Date,
    required: [true, 'Creation date is required'],
    default: Date.now
  },
  company: {
    type: String,
    required: [true, 'Company name is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Create the Product and User models (corrected typo in User model name)
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Product,
  User
};
