import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import "../assets/styles/BookDetails.css";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(db, "books", bookId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBook({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Nenhum documento encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar o livro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return <div className="loading-message">Carregando detalhes...</div>;
  }

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
