// src/Formulario.jsx
import { useState } from 'react';

import {
  addDoc,
  collection,
} from 'firebase/firestore';
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

import {
  db,
  storage,
} from './firebase';

export default function Formulario() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [archivo, setArchivo] = useState(null);

  const [mensajeError, setMensajeError] = useState("");
  const [mensajeOk, setMensajeOk] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !mensaje) {
      setMensajeError("Todos los campos son obligatorios");
      setMensajeOk("");
      return;
    }

    let urlArchivo = null;

    try {
      // subir archivo a Storage (si hay)
      if (archivo) {
        const archivoRef = ref(storage, "archivos/" + archivo.name);
        await uploadBytes(archivoRef, archivo);
        urlArchivo = await getDownloadURL(archivoRef);
      }

      // guardar en Firestore
      await addDoc(collection(db, "contactos"), {
        nombre,
        email,
        mensaje,
        archivoUrl: urlArchivo,
      });

      setMensajeError("");
      setMensajeOk("✔ Datos guardados correctamente");

      setNombre("");
      setEmail("");
      setMensaje("");
      setArchivo(null);
    } catch (err) {
      console.error(err);
      setMensajeError("❌ Error al guardar");
      setMensajeOk("");
    }
  };

  return (
    <div className="card p-3">
      <h2 className="mb-3">Formulario de Contacto</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

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
          <label className="form-label">Mensaje</label>
          <textarea
            className="form-control"
            rows="3"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Archivo (opcional)</label>
          <input
            className="form-control"
            type="file"
            onChange={(e) => setArchivo(e.target.files[0])}
          />
        </div>

        {mensajeError && (
          <div className="alert alert-danger mt-2">{mensajeError}</div>
        )}
        {mensajeOk && (
          <div className="alert alert-success mt-2">{mensajeOk}</div>
        )}

        <button className="btn btn-primary mt-2" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}
