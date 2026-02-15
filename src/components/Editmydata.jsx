import { useState } from "react";

function Editmydata() {
  const [usuario, setUsuario] = useState(() => {
    const data = localStorage.getItem("datauser");
    const ndata=JSON.parse(data);    
    return ndata ? ndata : null;
  });

  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || "",
    apellido: usuario?.apellido || "",
    email: usuario?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No estás autenticado");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/abm/edituser/${usuario.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
          
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      }

      // Tu backend devuelve { status: "ok" }
      await response.json();

      // Actualizamos manualmente el usuario
      const updatedUser = {
        ...usuario,
        ...formData,
      };

      setUsuario(updatedUser);
      localStorage.setItem("datauser", JSON.stringify(updatedUser));

      alert("Datos actualizados correctamente ✅");
    } catch (error) {
      console.error(error);
      alert("Hubo un error al actualizar");
    }
  };

  return (
    <main className="center">
      <h2>
        Bienvenido {usuario?.nombre} {usuario?.apellido}
      </h2>
      <h2>Tu rol es {usuario?.rol}</h2>
      <h2>Tu email es {usuario?.email}</h2>
      <h2>Tu nombre de Usuario es {usuario?.username}</h2>

      <hr />

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Actualizar datos</button>
      </form>

      <p>Practica hecha en React por Sebastian</p>
    </main>
  );
}

export default Editmydata;
