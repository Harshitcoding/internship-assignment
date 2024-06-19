import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav >
      <ul className='flex'>
        <li>
          <button
            className="px-4 py-2 rounded text-white font-bold bg-blue-500 hover:bg-blue-700"
            onClick={() => handleNavigate('/add')}
          >
            Add
          </button>
        </li>
        <li>
          <button
            className="px-4 py-2 rounded text-white font-bold bg-gray-400 hover:bg-gray-500"
            onClick={() => handleNavigate('/')}
          >
            Home
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
