import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductId() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/account/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
        console.log('Response from server:', response.data);
        setProduct(response.data.product);
      })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
  }, [ProductId]);

  if (error) {
    return <div>PRODUCT POST NOT FOUND</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-200 p-4 rounded shadow-md mx-auto max-w-2xl">
      <h2>Product Details</h2>
      <ul className="list-none p-0">
        <li className="flex justify-between items-center py-2 border-b border-gray-300 hover:bg-gray-100">
          <div className="flex items-center">
            <span className="text-sm mr-2 font-medium">Company:</span>
            <span>{product.company ? product.company : 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2 font-medium">Price:</span>
            <span>{product.price}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2 font-medium">Rating:</span>
            <span>{product.rating}</span>
          </div>
          <div>
            <span className="text-sm mr-2 font-medium">Featured:</span>
            <span>{product.featured ? 'Yes' : 'No'}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ProductId;
