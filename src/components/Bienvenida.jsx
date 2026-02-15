import { useState } from "react";

function Bienvenida() {
  const [usuario] = useState(() => {
    const data = localStorage.getItem("datauser");
    return data ? JSON.parse(data) : null;
  });

  return (
    <main className="center">
      <h2>
        Bienvenido {usuario?.nombre} {usuario?.apellido}</h2>
        <h2>Tu rol es {usuario?.rol}</h2>
        <h2>Tu email es es {usuario?.email}</h2>
        <h2>Tu nombre de Usuario es {usuario?.username}</h2>      
      <p>Practica hecha en React por Sebastian</p>
    </main>
  );
}

export default Bienvenida;