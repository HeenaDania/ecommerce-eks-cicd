import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function CartPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // In a real app, you would fetch cart items from your backend
  const cartItems = [
    { id: 1, title: 'Sample Book', price: 9.99, quantity: 2 }
  ];

  const handleCheckout = () => {
    alert('Checkout complete!');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Your Cart</h2>
      {user && <p>Hello, {user.attributes?.email}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Checkout
      </button>
      <button onClick={() => navigate('/')}>Continue Shopping</button>
    </div>
  );
}

export default CartPage;
