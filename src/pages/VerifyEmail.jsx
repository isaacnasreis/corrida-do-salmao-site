import React from "react";
import { auth } from "../firebase/config";
import { sendEmailVerification } from "firebase/auth";
import "../assets/styles/AuthForm.css";

const VerifyEmail = () => {
  const handleResendEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      alert("E-mail de verificação reenviado com sucesso!");
    } catch (error) {
      console.log(error);
      alert("Erro ao reenviar o e-mail. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Verifique seu E-mail</h2>
        <p>
          Um link de verificação foi enviado para{" "}
          <strong>{auth.currentUser?.email}</strong>.
        </p>
        <p>
          Por favor, verifique sua caixa de entrada (e a pasta de spam) e clique
          no link para ativar sua conta.
        </p>
        <button onClick={handleResendEmail}>Reenviar E-mail</button>
      </div>
    </div>
  );
};

export default VerifyEmail;
