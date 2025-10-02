import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { auth } from "./firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>
          <NavLink to="/" className="home-link">
            Corrida do Salmão
          </NavLink>
        </h1>
        <nav>
          <NavLink
            to="/livros"
            className={({ isActive }) =>
              isActive ? "active-link nav-link" : "nav-link"
            }
          >
            Livros
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "active-link nav-link" : "nav-link"
                }
              >
                Painel
              </NavLink>
              <div className="user-actions">
                <span className="user-email">{user.email}</span>
                <button onClick={handleLogout} className="logout-button">
                  Sair
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "active-link nav-link" : "nav-link"
                }
              >
                Entrar
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "active-link nav-link" : "nav-link"
                }
              >
                Cadastrar
              </NavLink>
            </>
          )}
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
