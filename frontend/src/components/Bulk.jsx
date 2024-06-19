import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/account/allproducts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error state or show a message to the user
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-200 p-4 rounded shadow-md mx-auto max-w-2xl">
      <h2>All Products</h2>
      <ul className="list-none p-0">
        {products.map(product => (
          <li key={product.productId} className="flex justify-between items-center py-2 border-b border-gray-300 hover:bg-gray-100">
            <div className="flex items-center">
              <span className="text-sm mr-2 font-medium">Company:</span>
              <span>{product.company ? product.company : 'N/A'}</span>  {/* Handle missing company data */}
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-2 font-medium">Price:</span>
              <span>{product.price}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
