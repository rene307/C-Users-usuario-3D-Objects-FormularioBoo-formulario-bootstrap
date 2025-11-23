// src/Auth.jsx
import { useState } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from './firebase';

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const registrar = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setMensaje("✔ Usuario creado: " + user.user.email);
      })
      .catch((err) => setMensaje("❌ " + err.message));
  };

  const ingresar = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setMensaje("✔ Sesión iniciada: " + user.user.email);
      })
      .catch((err) => setMensaje("❌ " + err.message));
  };

  return (
    <div className="card p-3">
      <h2 className="mb-3">Autenticación</h2>

      <div className="mb-2">
        <label className="form-label">Correo</label>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Contraseña</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-flex gap-2 mb-2">
        <button
          className="btn btn-success"
          type="button"
          onClick={registrar}
        >
          Registrarse
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={ingresar}
        >
          Iniciar sesión
        </button>
      </div>

      {mensaje && <p className="mt-2">{mensaje}</p>}
    </div>
  );
}

