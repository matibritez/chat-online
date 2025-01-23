import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/register", {
        username,
        password,
      });
      if (response.data.success) {
        const userId = response.data.id;
        localStorage.setItem("userId", userId); // Guardar el ID en el almacenamiento local
        alert(`Usuario registrado con éxito. Tu ID único es: ${userId}`);
        navigate("/dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error al registrar usuario. Intenta de nuevo.");
    }
  };
  
  return (
    <div>
      <h2>Registrarse</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Crear cuenta</button>
      {userId && <p>Tu ID único es: <strong>{userId}</strong></p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
