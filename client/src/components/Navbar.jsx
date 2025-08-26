import React from "react";
import { ShoppingCart, User } from "lucide-react"; // icons

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left - Logo */}
      <div className="logo">
        <img src="/vite.svg" alt="Logo" />
        <h2>CollabMart</h2>
      </div>

      {/* Middle - Search */}
      <div className="search">
        <input type="text" placeholder="Search products, brands..." />
        <button>Search</button>
      </div>

      {/* Right - Links */}
      <div className="nav-links">
        <div className="nav-item">
          <span>Hello, Sign in</span>
          <strong>Account & Lists</strong>
        </div>
        <div className="nav-item">
          <span>Returns</span>
          <strong>& Orders</strong>
        </div>
        <div className="cart">
          <ShoppingCart size={24} />
          <span className="cart-count">3</span>
        </div>
        <User size={24} />
      </div>
    </nav>
  );
}

export default Navbar;
