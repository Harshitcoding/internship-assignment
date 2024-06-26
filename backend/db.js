const mongoose = require('mongoose');

mongoose.connect("Your_Mongo_DB_URL")


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


const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
  Product,
  User
};
