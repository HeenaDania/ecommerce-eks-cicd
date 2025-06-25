import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import "../App.css";

function HomePage() {
  const { user } = useAuth();
  console.log("User:", user);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/books`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="hero-section">
        <h1>Welcome to Our Book Store</h1>
        <p>Discover your next great read!</p>
        {user && <p>Hello, {user.attributes?.email}</p>}
      </div>
      <div className="books-carousel">
        {books.map((book) => (
          <div key={book.id} className="book-carousel-item">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="book-carousel-image"
            />
            <div className="book-carousel-title">{book.title}</div>
          </div>
        ))}
      </div>
      {/* If you want the grid view as well, uncomment below */}
      {/* <div className="book-list">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.imageUrl} alt={book.title} className="book-image" />
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">by {book.author}</p>
            <p className="book-price">${book.price}</p>
            <Link to={`/book/${book.id}`} className="add-cart-btn">
              View Details
            </Link>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default HomePage;
