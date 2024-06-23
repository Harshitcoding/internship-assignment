import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://internship-assignment-rouge.vercel.app/api/v1/account/allproducts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
     
      }
    };

    fetchProducts();
  }, []);

  return (
<<<<<<< HEAD
    <div class="bg-gray-300 p-8 rounded-lg shadow-lg mx-auto max-w-2xl">
=======
   <div class="bg-gray-300 p-8 rounded-lg shadow-lg mx-auto max-w-2xl">
>>>>>>> 6e19da3039caa0d4e039b2ccb739332308be2813
    <h2 class="text-2xl font-bold text-gray-800">All Products</h2>
    <ul class="list-none p-0">
      {products.map(product => (
        <li key={product.productId} class="flex justify-between items-center py-4 hover:bg-gray-200">
          <div class="flex items-center space-x-4">
            <span class="text-base font-medium text-gray-700 leading-loose">Company:</span>
            <span class="text-base text-gray-600">{product.company ? product.company : 'N/A'}</span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-base font-medium text-gray-700 leading-loose">Name:</span>
            <span class="text-base text-gray-600">{product.name}</span>
          </div>
          <div class="flex items-center space-x-4 sm:flex">
            <span class="text-base font-medium text-gray-700 leading-loose">Price:</span>
            <span class="text-base text-gray-600">{product.price}</span>
          </div>
          <div class="flex items-center space-x-4 sm:flex">
            <span class="text-base font-medium text-gray-700 leading-loose">Rating:</span>
            <span class="text-base text-gray-600">{product.rating.$numberDecimal}</span>
          </div>
          <div class="mt-2">  <a href={`/product/${product.productId}`} class="text-blue-500 text-base font-medium hover:underline">Read More</a>
          </div>
        </li>
      ))}
    </ul>
  </div>
  
  
    );
};

export default ProductList;
