import React from "react";
import "../assets/styles/BookItem.css";

const BookItem = ({ book }) => {
  return (
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
  );
};

export default BookItem;
