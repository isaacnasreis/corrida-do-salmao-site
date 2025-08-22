import React, { useState } from "react";
import "../assets/styles/Livros.css";
import books from "../data/books";
import BookItem from "../components/BookItem";

const Livros = () => {
  const [filter, setFilter] = useState("todos");

  const filteredBooks = books.filter((book) => {
    if (filter === "todos") {
      return true;
    }
    return book.status === filter;
  });

  return (
    <div className="livros-container">
      <h2>Nossa Corrida Literária</h2>
      <p>
        Aqui você encontrará todos os livros que já lemos e os que estão por
        vir. Prepare-se para a aventura!
      </p>
      <div className="filter-buttons">
        <button
          className={
            filter === "todos" ? "filter-button active" : "filter-button"
          }
          onClick={() => setFilter("todos")}
        >
          Todos
        </button>
        <button
          className={
            filter === "atual" ? "filter-button active" : "filter-button"
          }
          onClick={() => setFilter("atual")}
        >
          Atual
        </button>
        <button
          className={
            filter === "futuro" ? "filter-button active" : "filter-button"
          }
          onClick={() => setFilter("futuro")}
        >
          Futuro
        </button>
        <button
          className={
            filter === "passado" ? "filter-button active" : "filter-button"
          }
          onClick={() => setFilter("passado")}
        >
          Passado
        </button>
      </div>
      <div className="book-list">
        {filteredBooks.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Livros;
