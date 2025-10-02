import React from "react";
import SuggestionForm from "../components/SuggestionForm";
import SuggestionList from "../components/SuggestionList";
import "../assets/styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Área Exclusiva para Membros</h2>
      <p>Bem-vindo(a) ao coração do nosso clube!</p>
      <p>
        Aqui você terá acesso a discussões exclusivas, votações para o próximo
        livro e muito mais.
      </p>

      <div className="dashboard-content">
        <SuggestionForm />
        <SuggestionList />
      </div>
    </div>
  );
};

export default Dashboard;
