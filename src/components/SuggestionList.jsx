import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import "../assets/styles/SuggestionList.css";

const SuggestionList = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const suggestionsRef = collection(db, "suggestions");
        const q = query(suggestionsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const suggestionsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSuggestions(suggestionsData);
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading) {
    return <p>Carregando sugestões...</p>;
  }

  return (
    <div className="suggestion-list-container">
      <h3>Sugestões da Comunidade</h3>
      {suggestions.length === 0 ? (
        <p>Ainda não há sugestões. Seja o primeiro!</p>
      ) : (
        <ul className="suggestion-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="suggestion-item">
              <p className="suggestion-title">"{suggestion.title}"</p>
              <p className="suggestion-author">por {suggestion.author}</p>
              <small>Sugerido por: {suggestion.suggestedBy}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionList;
