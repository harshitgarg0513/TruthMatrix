import React from 'react';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-semibold text-gray-900">
            TruthMatrix
          </div>

          {/* Menu */}
          <div className="space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
