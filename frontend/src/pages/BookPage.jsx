import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/books/${id}`);
        if (!response.ok) throw new Error('Book not found');
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Error fetching book:', error);
        navigate('/');
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleAddToCart = () => {
    alert(`${quantity} x ${book.title} added to cart!`);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <img src={book.imageUrl} alt={book.title} style={{ width: '100%', height: 'auto' }} />
      <h2>{book.title}</h2>
      <p>by {book.author}</p>
      <p>${book.price}</p>
      <div>
        <label>Quantity: </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
        />
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={() => navigate(-1)}>Back to Home</button>
    </div>
  );
}

export default BookPage;
