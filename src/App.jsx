import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Corrida do Salmão</h1>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Início
          </NavLink>
          <NavLink
            to="/livros"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Livros
          </NavLink>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
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
