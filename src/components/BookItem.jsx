import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/BookItem.css";

const BookItem = ({ book }) => {
  return (
    <Link to={`/livros/${book.id}`} className="book-card-link">
      <div className="book-card">
        <img
          src={book.coverImageUrl}
          alt={`Capa do livro ${book.title}`}
          className="book-cover"
        />
        <div className="book-details">
          <h3>{book.title}</h3>
          <p>Por {book.author}</p>
          <span className={`book-status status-${book.status}`}>
            {book.status}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
