import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <h3 className="text-xl font-bold">JobBoard</h3>
          <p className="text-sm mt-2 text-gray-400">Connecting talent with opportunity.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/jobs" className="hover:underline">Browse Jobs</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-300">Email: support@jobboard.com</p>
          <p className="text-sm text-gray-300">Phone: +254 456 7890</p>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500 text-xs border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} JobBoard. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
