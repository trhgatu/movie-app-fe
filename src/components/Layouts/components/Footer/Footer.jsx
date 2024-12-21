// src/components/Footer/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; 2024 MovieApp. All Rights Reserved.
        </p>
        <div className="mt-4">
          <a href="/privacy" className="hover:text-gray-400 text-sm mx-2">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-400 text-sm mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
