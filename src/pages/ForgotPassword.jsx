import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';
import "../assets/styles/AuthForm.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Se uma conta existir para este e-mail, um link de recuperação foi enviado. Verifique sua caixa de entrada.');
    } catch (err) {
      setError('Ocorreu um erro. Por favor, tente novamente.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Recuperar Senha</h2>
        <p>Digite o e-mail associado à sua conta e enviaremos um link para redefinir sua senha.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail de cadastro"
          required
        />
        <button type="submit">Enviar Link de Recuperação</button>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;