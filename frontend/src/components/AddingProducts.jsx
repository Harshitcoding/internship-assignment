import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddingProducts() {
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [featured, setFeatured] = useState(false);
    const [rating, setRating] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [company, setCompany] = useState("");

    const navigate = useNavigate()

    async function handleSubmit() {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/account/products", {
                productId,
                name,
                price,
                featured,
                rating,
                createdAt,
                company
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data); 
            navigate('/')
        } catch (error) {
            console.error(error); // Handle error (e.g., show error notification)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
                <input
                    type="text"
                    required
                    placeholder="Product ID"
                    value={productId}
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setProductId(e.target.value)}
                />
                <input
                    type="text"
                    required
                    placeholder="Name"
                    value={name}
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    required
                    placeholder="Price"
                    value={price}
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        checked={featured}
                        className="mr-2"
                        onChange={(e) => setFeatured(e.target.checked)}
                    />
                    <label>Featured</label>
                </div>
                <input
                    type="number"
                    required
                    placeholder="Rating"
                    value={rating}
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setRating(e.target.value)}
                />
                <input
                    type="date"
                    required
                    value={createdAt}
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setCreatedAt(e.target.value)}
                />
                <input
                    type="text"
                    required
                    placeholder="Company"
                    value={company}
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setCompany(e.target.value)}
                />
                <button 
                    onClick={handleSubmit} 
                    className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
                >
                    Add Product
                </button>
            </div>
        </div>
    );
}

export default AddingProducts;
