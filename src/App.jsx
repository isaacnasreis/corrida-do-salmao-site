import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Corrida do Salmão</h1>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <h2>Bem-vindos ao nosso clube do livro!</h2>
          <p>Onde a leitura é a nossa maior aventura.</p>
        </section>
      </main>

      <footer className="footer">
        <p>
          &copy; 2025 Corrida do Salmão. Todos os direitos reservados.
          Desenvolvido por Isaac N. Reis -{" "}
          <a
            href="https://github.com/isaacnasreis"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
