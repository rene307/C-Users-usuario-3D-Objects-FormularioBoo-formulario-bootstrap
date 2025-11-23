// src/App.jsx
import Auth from './Auth.jsx';
import Formulario from './Formulario.jsx';

export default function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Ejercicio 3 - React + Firebase</h1>

      {/* Bloque de autenticación */}
      <Auth />

      <hr className="my-4" />

      {/* Bloque del formulario */}
      <Formulario />
    </div>
  );
}
