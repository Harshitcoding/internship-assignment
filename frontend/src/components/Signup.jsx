import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    async function handleSubmit() {
        const response = await axios.post("https://internship-assignment-rouge.vercel.app/api/v1/user/signup", {
            firstName,
            lastName,
            username,
            password
        });
        localStorage.setItem('token', response.data.token);
        navigate('/add')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <input
                    type="text"
                    required
                    placeholder="First Name"
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    required
                    placeholder="Last Name"
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="text"
                    required
                    placeholder="Username"
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    required
                    placeholder="Password"
                    className="w-full p-3 mb-4 border border-gray-300 rounded"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    onClick={handleSubmit} 
                    className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default Signup;
