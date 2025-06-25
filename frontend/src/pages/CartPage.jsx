import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import "../App.css";

function CartPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // In a real app, you would fetch cart items from your backend
  const cartItems = [
    { id: 1, title: "Sample Book", price: 9.99, quantity: 2 },
  ];

  const handleCheckout = () => {
    alert("Checkout complete!");
  };

  return (
    <div>
      <Navbar />
      <div className="cart-page">
        <h2>Your Cart</h2>
        {user && <p>Hello, {user.attributes?.email}</p>}
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <span className="cart-item-title">{item.title}</span>
                <span>
                  ${item.price} x {item.quantity}
                </span>
              </li>
            ))}
          </ul>
        )}
        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Checkout
        </button>
        <button className="continue-shopping-btn" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CartPage;
