import React, { useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../assets/styles/SuggestionForm.css";

const SuggestionForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !author) {
      setError("Por favor, preencha o título e o autor.");
      return;
    }

    try {
      await addDoc(collection(db, "suggestions"), {
        title: title,
        author: author,
        suggestedBy: auth.currentUser.email,
        suggestedByUid: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      setSuccess("Sugestão enviada com sucesso!");
      setTitle("");
      setAuthor("");
    } catch (err) {
      setError("Ocorreu um erro ao enviar sua sugestão. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="suggestion-form">
      <h3>Sugira um Livro!</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título do Livro"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Autor(a)"
      />
      <button type="submit">Enviar Sugestão</button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </form>
  );
};

export default SuggestionForm;
