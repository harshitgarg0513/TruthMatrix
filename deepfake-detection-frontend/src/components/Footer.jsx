import React from 'react';

function Footer() {
  return (
    <footer className="bg-white py-4 mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} TruthMatrix. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
