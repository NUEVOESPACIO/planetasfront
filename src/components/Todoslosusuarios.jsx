import { useState, useEffect } from "react";

function Todoslosusuarios() {
  const [usuario] = useState(() => {
    const data = localStorage.getItem("datauser");
    return data ? JSON.parse(data) : null;
  });

  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    password: "",
    rol: { id: "" }
  });

  // 🔹 Obtener usuarios
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:8080/abm/todoslosusuarios", {
          headers: {
            "Authorization": `Bearer ${usuario?.token}`
          }
        });

        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error usuarios:", error);
      }
    };

    if (usuario?.token) {
      obtenerUsuarios();
    }
  }, [usuario]);

  // 🔹 Obtener roles
  useEffect(() => {
    const obtenerRoles = async () => {
      try {
        const response = await fetch("http://localhost:8080/abm/todoslosroles", {
          headers: {
            "Authorization": `Bearer ${usuario?.token}`
          }
        });

        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error("Error roles:", error);
      }
    };

    if (usuario?.token) {
      obtenerRoles();
    }
  }, [usuario]);

  // 🔹 Manejar cambios
  const handleChange = (index, field, value) => {
    const nuevosUsuarios = [...usuarios];

    if (field === "rol") {
      nuevosUsuarios[index].rol.id = parseInt(value);
    } else {
      nuevosUsuarios[index][field] = value;
    }

    setUsuarios(nuevosUsuarios);
  };

  // 🔹 Actualizar usuario
  const actualizarUsuario = async (user) => {
    const { rol, ...rest } = user;
    const rolobj = { "id": rol.id }
    const newUser = {
      id: user.id,
      ...rest,
      role: rolobj
    };


    try {
      const response = await fetch("http://localhost:8080/abm/actualizarusuario", {
        method: "POST", // o PUT después
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${usuario?.token}`
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error("Error al actualizar usuario");
      }

      alert("Usuario actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar");
    }
  };

  const crearUsuario = async () => {
    const newUser = {
      ...nuevoUsuario,
      role: { id: nuevoUsuario.rol.id }
    };

    try {
      const response = await fetch("http://localhost:8080/abm/crearusuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${usuario?.token}`
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error("Error al crear usuario");
      }

      const usuarioCreado = await response.json();

      // Lo agregamos a la lista sin recargar
      setUsuarios([...usuarios, {
        id: usuarioCreado.id,
        nombre: usuarioCreado.nombre,
        apellido: usuarioCreado.apellido,
        email: usuarioCreado.email,
        username: usuarioCreado.username,
        rol: usuarioCreado.role
      }]);

      // Limpiamos formulario
      setNuevoUsuario({
        nombre: "",
        apellido: "",
        email: "",
        username: "",
        password: "",
        rol: { id: "" }
      });

      alert("Usuario creado correctamente");

    } catch (error) {
      console.error(error);
      alert("Error al crear usuario");
    }
  };

  const handleNuevoChange = (field, value) => {
    if (field === "rol") {
      setNuevoUsuario({
        ...nuevoUsuario,
        rol: { id: parseInt(value) }
      });
    } else {
      setNuevoUsuario({
        ...nuevoUsuario,
        [field]: value
      });
    }
  };

  const eliminarUsuario = async (userId) => {

    const confirmar = window.confirm("¿Está seguro que desea eliminar este usuario?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:8080/abm/eliminarusuario/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${usuario?.token}`
        }
      });

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }

      // Actualizamos la lista quitando el usuario eliminado
      setUsuarios(usuarios.filter(u => u.id !== userId));

      alert("Usuario eliminado correctamente");

    } catch (error) {
      console.error(error);
      alert("Error al eliminar usuario");
    }
  };

  return (
    <main style={styles.container}>
    <h2 style={styles.title}>Lista de usuarios</h2>
  
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Apellido</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Rol</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
  
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} style={styles.tr}>
              <td style={styles.td}>
                <input
                  style={styles.input}
                  value={u.nombre}
                  onChange={(e) => handleChange(usuarios.indexOf(u), "nombre", e.target.value)}
                />
              </td>
              <td style={styles.td}>
                <input
                  style={styles.input}
                  value={u.apellido}
                  onChange={(e) => handleChange(usuarios.indexOf(u), "apellido", e.target.value)}
                />
              </td>
              <td style={styles.td}>
                <input
                  style={styles.input}
                  value={u.email}
                  onChange={(e) => handleChange(usuarios.indexOf(u), "email", e.target.value)}
                />
              </td>
              <td style={styles.td}>
                <input
                  style={styles.input}
                  value={u.username}
                  onChange={(e) => handleChange(usuarios.indexOf(u), "username", e.target.value)}
                />
              </td>
              <td style={styles.td}>
                <select
                  style={styles.select}
                  value={u.rol.id}
                  onChange={(e) => handleChange(usuarios.indexOf(u), "rol", e.target.value)}
                >
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
              </td>
              <td style={styles.td}>
                <button style={styles.updateBtn} onClick={() => actualizarUsuario(u)}>
                  Actualizar
                </button>
                <button style={styles.deleteBtn} onClick={() => eliminarUsuario(u.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    {/* Formulario de creación de usuario */}
    <h3 style={styles.subtitle}>Crear nuevo usuario</h3>
    <div style={styles.createCard}>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td><input style={styles.input} placeholder="Nombre" value={nuevoUsuario.nombre} onChange={(e)=>handleNuevoChange("nombre",e.target.value)}/></td>
              <td><input style={styles.input} placeholder="Apellido" value={nuevoUsuario.apellido} onChange={(e)=>handleNuevoChange("apellido",e.target.value)}/></td>
              <td><input style={styles.input} placeholder="Email" value={nuevoUsuario.email} onChange={(e)=>handleNuevoChange("email",e.target.value)}/></td>
              <td><input style={styles.input} placeholder="Username" value={nuevoUsuario.username} onChange={(e)=>handleNuevoChange("username",e.target.value)}/></td>
              <td><input style={styles.input} type="password" placeholder="Password" value={nuevoUsuario.password} onChange={(e)=>handleNuevoChange("password",e.target.value)}/></td>
              <td>
                <select style={styles.select} value={nuevoUsuario.rol.id} onChange={(e)=>handleNuevoChange("rol",e.target.value)}>
                  <option value="">Seleccione un rol</option>
                  {roles.map((rol)=>(
                    <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <button style={styles.createBtn} onClick={crearUsuario}>Crear Usuario</button>
    </div>
  </main>
  
  );
  
  
}
const styles = {

  tableWrapper: {
    overflowX: "auto",     // Scroll horizontal si la tabla es más ancha que el contenedor
    overflowY: "auto",     // Scroll vertical si querés limitar altura
    maxHeight: "400px",    // Opcional: define altura máxima para scroll vertical
    marginBottom: "20px"
  }
,  
  container: {
    maxWidth: "1200px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
    padding: "0 20px"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  subtitle: {
    marginTop: "40px",
    marginBottom: "15px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px"
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#f2f2f2"
  },
  tr: {
    borderBottom: "1px solid #ddd"
  },
  td: {
    padding: "8px",
    verticalAlign: "middle"
  },
  input: {
    width: "100%",
    padding: "6px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  select: {
    width: "100%",
    padding: "6px 8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  updateBtn: {
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#2196F3",
    color: "white",
    cursor: "pointer"
  },
  deleteBtn: {
    padding: "5px 10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#f44336",
    color: "white",
    cursor: "pointer"
  },
  createCard: {
    padding: "20px",
    border: "2px solid #4CAF50",
    borderRadius: "8px",
    backgroundColor: "#f6fff6"
  },
  createBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer"
  }

  
};

export default Todoslosusuarios;
