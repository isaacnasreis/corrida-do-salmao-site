import React from "react";
import "../assets/styles/Livros.css";
import books from "../data/books";
import BookItem from "../components/BookItem";

const Livros = () => {
  return (
    <div className="livros-container">
      <h2>Nossa Corrida Literária</h2>
      <p>
        Aqui você encontrará todos os livros que já lemos e os que estão por
        vir. Prepare-se para a aventura!
      </p>
      <div className="book-list">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Livros;
