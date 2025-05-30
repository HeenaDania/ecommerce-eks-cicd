import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/books`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Welcome to Our Book Store</h1>
      {user && <p>Hello, {user.attributes?.email}</p>}
      <h2>Featured Books</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {books.map((book) => (
          <div key={book.id} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', maxWidth: '300px' }}>
            <img src={book.imageUrl} alt={book.title} style={{ width: '100%', height: 'auto' }} />
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <p>${book.price}</p>
            <Link to={`/book/${book.id}`}>View Details</Link>
          </div>
        ))}
      </div>
      <nav style={{ marginTop: '24px' }}>
        <Link to="/cart">View Cart</Link>
      </nav>
    </div>
  );
}

export default HomePage;
