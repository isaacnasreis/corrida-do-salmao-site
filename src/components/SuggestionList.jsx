import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, query, orderBy, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import "../assets/styles/SuggestionList.css";

const SuggestionList = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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

  const handleVote = async (suggestionId, currentVotes) => {
    if (!user) {
      alert('Você precisa estar logado para votar!');
      return;
    }

    const suggestionRef = doc(db, 'suggestions', suggestionId);
    const userHasVoted = currentVotes?.includes(user.uid);

    try {
      if (userHasVoted) {
        await updateDoc(suggestionRef, {
          votes: arrayRemove(user.uid)
        });
      } else {
        await updateDoc(suggestionRef, {
          votes: arrayUnion(user.uid)
        });
      }
      
      setSuggestions(prevSuggestions => 
        prevSuggestions.map(s => {
          if (s.id === suggestionId) {
            const newVotes = userHasVoted 
              ? s.votes.filter(uid => uid !== user.uid)
              : [...(s.votes || []), user.uid];
            return { ...s, votes: newVotes };
          }
          return s;
        })
      );

    } catch (error) {
      console.error("Erro ao registrar voto:", error);
      alert('Ocorreu um erro ao registrar seu voto.');
    }
  };

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
          {suggestions.map(suggestion => {
            const userHasVoted = suggestion.votes?.includes(user?.uid);
            return (
              <li key={suggestion.id} className="suggestion-item">
                <div>
                  <p className="suggestion-title">"{suggestion.title}"</p>
                  <p className="suggestion-author">por {suggestion.author}</p>
                  <small>Sugerido por: {suggestion.suggestedBy}</small>
                </div>
                <div className="vote-section">
                  <span className="vote-count">{suggestion.votes?.length || 0}</span>
                  <button 
                    onClick={() => handleVote(suggestion.id, suggestion.votes || [])} 
                    disabled={!user}
                    className={`vote-button ${userHasVoted ? 'voted' : ''}`}
                  >
                    {userHasVoted ? '✓ Votado' : 'Votar'}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SuggestionList;
