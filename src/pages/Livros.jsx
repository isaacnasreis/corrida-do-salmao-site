import React, { useState, useEffect } from "react";
import "../assets/styles/Livros.css";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import BookItem from "../components/BookItem";

const Livros = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      } catch (error) {
        console.error("Erro ao buscar livros: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books
    .filter((book) => {
      if (filter === "todos") {
        return true;
      }
      return book.status === filter;
    })
    .filter((book) => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();
      const search = searchTerm.toLowerCase();
      return title.includes(search) || author.includes(search);
    });

  if (loading) {
    return <div className="loading-message">Carregando livros...</div>;
  }

  return (
    <div className="livros-container">
      <h2>Nossa Corrida Literária</h2>
      <p>
        Aqui você encontrará todos os livros que já lemos e os que estão por
        vir. Prepare-se para a aventura!
      </p>

      <div className="controls-container">
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

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
