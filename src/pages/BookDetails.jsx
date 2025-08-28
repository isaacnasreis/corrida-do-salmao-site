import React from "react";
import { useParams, Link } from "react-router-dom";
import books from "../data/books";
import "../assets/styles/BookDetails.css";

const BookDetails = () => {
  const { bookId } = useParams();

  const book = books.find((b) => b.id === parseInt(bookId));

  if (!book) {
    return (
      <div className="book-details-container">
        <h2>Livro não encontrado!</h2>
        <Link to="/livros" className="back-link">
          Voltar para a lista
        </Link>
      </div>
    );
  }

  return (
    <div className="book-details-container">
      <div className="book-details-content">
        <img
          src={book.coverImageUrl}
          alt={`Capa de ${book.title}`}
          className="book-details-cover"
        />
        <div className="book-info">
          <h1>{book.title}</h1>
          <h2>Por {book.author}</h2>
          <p>{book.description}</p>
          <span className={`book-status status-${book.status}`}>
            {book.status}
          </span>
          <Link to="/livros" className="back-link">
            ← Voltar para a lista
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
