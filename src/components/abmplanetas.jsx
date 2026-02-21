import { useState, useEffect } from "react";
import FilaPlaneta from "./filaplaneta"

function Abmplanetas() {
  const [usuario] = useState(() => {
    const data = localStorage.getItem("datauser");
    return data ? JSON.parse(data) : null;
  });
  const [planetas, setPlanetas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [expandedId, setExpandedId] = useState(null)
  const [nuevoPlaneta, setNuevoPlaneta] = useState({
    nombre: "",
    nombre_cientifico: "",
    masa: "",
    diametro: "",
    caracteristicas: "",
    user: { id: "" }
  });

  const puedeCrearPlaneta =
    usuario?.rol === "ROLE_ADMIN" ||
    usuario?.rol === "ROLE_ASTRONOMO";
  const esAdmin = usuario?.rol === "ROLE_ADMIN";
  const esAstronomo = usuario?.rol === "ROLE_ASTRONOMO";

  // 🔹 Obtener todos los planetas
  useEffect(() => {
    const obtenerPlanetas = async () => {
      try {
        const response = await fetch("http://localhost:8080/abm/todoslosplanetas", {
          headers: {
            "Authorization": `Bearer ${usuario?.token}`
          }
        });

        const data = await response.json();
        setPlanetas(data);
      } catch (error) {
        console.error("Error usuarios:", error);
      }
    };

    if (usuario?.token) {
      obtenerPlanetas();
    }
  }, [usuario]);

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
        console.error("Error usuarios planetas:", error);
      }
    };

    if (usuario?.token) {
      obtenerUsuarios();
    }
  }, [usuario]);

  // 🔹 Manejar cambios de cada registro
  const handleChange = (index, field, value) => {
    const nuevosPlanetas = [...planetas];

    if (field === "id_usuario") {
      nuevosPlanetas[index].id_usuario = parseInt(value);
    } else {
      nuevosPlanetas[index][field] = value;
    }

    setPlanetas(nuevosPlanetas);
  };

  // 🔹 Actualizar planeta
  const actualizarPlaneta = async (planetaf) => {
    // const { planeta, ...rest } = planetaf;
    // const usuarioobj = { "id_usuario": id_usuario.idusuario }
    const newPlanetaAct = {
      idPlaneta: planetaf.id_planeta,
      nombre: planetaf.nombre,
      nombre_cientifico: planetaf.nombre_cientifico,
      masa: parseFloat(planetaf.masa),
      diametro: parseFloat(planetaf.diametro),
      caracteristicas: planetaf.caracteristicas,
      user: { id: planetaf.id_usuario }

    };


    try {
      const response = await fetch("http://localhost:8080/abm/actualizarplaneta", {
        method: "POST", // o PUT después
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${usuario?.token}`
        },
        body: JSON.stringify(newPlanetaAct)
      });

      if (!response.ok) {
        throw new Error("Error al actualizar planeta");
      }

      alert("Planeta actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar");
    }
  };

  // Crear Planeta
  const crearPlaneta = async () => {
    try {

      const userFinalId =
        usuario?.rol === "ROLE_ASTRONOMO"
          ? usuario.id
          : nuevoPlaneta.user.id;

      const planetaNuevoParaEnviar = {
        ...nuevoPlaneta,
        masa: parseFloat(nuevoPlaneta.masa),
        diametro: parseFloat(nuevoPlaneta.diametro),
        user: { id: userFinalId }
      };



      const response = await fetch("http://localhost:8080/abm/crearplaneta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${usuario?.token}`
        },


        body: JSON.stringify(planetaNuevoParaEnviar)
      });

      if (!response.ok) {
        throw new Error("Error al crear planeta");
      }

      const planetaCreado = await response.json();

      setPlanetas([
        ...planetas,
        {
          id: planetaCreado.id,
          nombre: planetaCreado.nombre,
          nombre_cientifico: planetaCreado.nombre_cientifico,
          masa: planetaCreado.masa,
          diametro: planetaCreado.diametro,
          caracteristicas: planetaCreado.caracteristicas,
          id_usuario: planetaCreado.user.id
        }
      ]);

      setNuevoPlaneta({
        nombre: "",
        nombre_cientifico: "",
        masa: "",
        diametro: "",
        caracteristicas: "",
        user: { id: "" }
      });

      alert("Planeta creado correctamente");

    } catch (error) {
      console.error(error);
      alert("Error al crear planeta");
    }
  };

  // Cambio en campo de nuevo plantea
  const handleNuevoChange = (field, value) => {
    if (field === "user") {
      setNuevoPlaneta({
        ...nuevoPlaneta,
        user: { id: parseInt(value) }
      });
    } else {
      setNuevoPlaneta({
        ...nuevoPlaneta,
        [field]: value
      });
    }
  };

  // Eliminar Planeta
  const eliminarPlaneta = async (planetaId) => {

    const confirmar = window.confirm("¿Está seguro que desea eliminar este Planeta?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:8080/abm/eliminarplaneta/${planetaId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${usuario?.token}`
        }
      });

      if (!response.ok) {
        throw new Error("Error al eliminar planeta");
      }

      // Actualizamos la lista quitando el usuario eliminado
      setPlanetas(planetas.filter(p => p.id_planeta !== planetaId));

      alert("Planeta eliminado correctamente");

    } catch (error) {
      console.error(error);
      alert("Error al eliminar Planeta");
    }
  };

  return (
    <main style={styles.container}>
      <h2 style={styles.title}>Lista de planetas</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Nombre cientifico</th>
              <th style={styles.th}>masa</th>
              <th style={styles.th}>diametro</th>
              <th style={styles.th}>caracteristicas</th>
              <th style={styles.th}>Usuario Creador</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {planetas.map((p, index) => {

              // ✅ LOGICA DENTRO DEL MAP
              const deshabilitado =
                usuario.rol !== "ROLE_ADMIN" &&
                usuario.id !== p.id_usuario;

              const deshabilitarChangeUser = usuario.rol !== "ROLE_ADMIN";


              return (
                <>
                  <tr key={p.id_planeta} style={styles.tr}>
                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        value={p.nombre}
                        onChange={(e) => handleChange(index, "nombre", e.target.value)}
                        disabled={deshabilitado}
                      />
                    </td>

                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        value={p.nombre_cientifico}
                        onChange={(e) => handleChange(index, "nombre_cientifico", e.target.value)}
                        disabled={deshabilitado}
                      />
                    </td>

                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        value={p.masa}
                        onChange={(e) => handleChange(index, "masa", e.target.value)}
                        disabled={deshabilitado}
                      />
                    </td>

                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        value={p.diametro}
                        onChange={(e) => handleChange(index, "diametro", e.target.value)}
                        disabled={deshabilitado}
                      />
                    </td>

                    <td style={styles.td}>
                      <input
                        style={styles.input}
                        value={p.caracteristicas}
                        onChange={(e) => handleChange(index, "caracteristicas", e.target.value)}
                        disabled={deshabilitado}
                      />
                    </td>

                    <td style={styles.td}>
                      <select
                        value={p.id_usuario}
                        style={{
                          ...styles.select,
                          ...(deshabilitarChangeUser && styles.selectDisabled)
                        }}
                        onChange={(e) => handleChange(index, "id_usuario", e.target.value)}
                        disabled={deshabilitarChangeUser}
                      >
                        {usuarios.map((usuariol) => (
                          <option key={usuariol.id} value={usuariol.id}>
                            {usuariol.username}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td style={styles.td}>
                      <button
                        style={{
                          ...styles.actualizarBtn,
                          ...(deshabilitado && styles.actualizarBtnDisabled)
                        }}
                        onClick={() => actualizarPlaneta(p)}
                        disabled={deshabilitado}

                      >
                        Actualizar
                      </button>

                      <button
                        style={{
                          ...styles.deleteBtn,
                          ...(deshabilitado && styles.deleteBtnDisabled)
                        }}
                        onClick={() => eliminarPlaneta(p.id_planeta)}
                        disabled={deshabilitado}
                      >
                        Eliminar
                      </button>

                      <button
                        style={{
                          ...styles.deleteBtn,
                          ...(deshabilitado && styles.deleteBtnDisabled)
                        }}
                        onClick={() =>
                          setExpandedId(
                            expandedId === p.id_planeta ? null : p.id_planeta
                          )
                        }
                        disabled={deshabilitado}
                      >
                        Fotos
                      </button>


                    </td>
                  </tr>


                  {expandedId === p.id_planeta && (
                    <FilaPlaneta
                      idPlaneta={p.id_planeta}
                      token={usuario?.token}
                    />
                  )}
                </>

                // AQUI TOOD UN NUEVO RETURN QU DEPENDE DE ID_PLANETA PERO HY MNERA DE "CONSTRUIRLO" EN OTRO COMPONENTE (PORQU L CODIGO ERIA MUY LARGO)

              );
            })}
          </tbody>

        </table>

      </div>

      {/* Formulario de creación de usuario */}

      {puedeCrearPlaneta && (
        <div>
          <h3 style={styles.subtitle}>Crear nuevo Planeta</h3>

          <div style={styles.createCard}>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <tbody>
                  <tr>
                    <td>
                      <input
                        style={styles.input}
                        placeholder="Nombre"
                        value={nuevoPlaneta.nombre}
                        onChange={(e) => handleNuevoChange("nombre", e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        style={styles.input}
                        placeholder="Nombre_Cientifico"
                        value={nuevoPlaneta.nombre_cientifico}
                        onChange={(e) => handleNuevoChange("nombre_cientifico", e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        style={styles.input}
                        placeholder="Masa"
                        value={nuevoPlaneta.masa}
                        onChange={(e) => handleNuevoChange("masa", e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        style={styles.input}
                        placeholder="Diametro"
                        value={nuevoPlaneta.diametro}
                        onChange={(e) => handleNuevoChange("diametro", e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        style={styles.input}
                        placeholder="Caracteristicas"
                        value={nuevoPlaneta.caracteristicas}
                        onChange={(e) => handleNuevoChange("caracteristicas", e.target.value)}
                      />
                    </td>

                    <td>
                      {esAdmin ? (

                        <select
                          style={styles.select}
                          value={nuevoPlaneta.user?.id || ""}
                          onChange={(e) => handleNuevoChange("user", e.target.value)}
                        >
                          <option value="">Seleccione un usuario creador</option>
                          {usuarios.map((userd) => (
                            <option key={userd.id} value={userd.id}>
                              {userd.username}
                            </option>
                          ))}
                        </select>

                      ) : (

                        < div >
                          <input
                            style={styles.input}
                            value={`${usuario.username} (${usuario.rol})`}
                            disabled

                          />

                        </div>

                      )}
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>

            <button
              style={styles.createBtn}
              onClick={crearPlaneta}
            >
              Crear Planeta
            </button>
          </div>
        </div>
      )
      }


    </main >

  );


}
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "40px auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "0 20px",
    color: "#333"
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    fontWeight: "600"
  },

  subtitle: {
    marginTop: "40px",
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "500"
  },

  tableWrapper: {
    overflowX: "auto",
    overflowY: "auto",
    maxHeight: "450px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#fafafa"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    fontSize: "14px"
  },

  th: {
    borderBottom: "2px solid #ccc",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#f5f5f5",
    fontWeight: "500"
  },

  tr: {
    borderBottom: "1px solid #eee",
    transition: "background-color 0.2s",
  },

  td: {
    padding: "8px",
    verticalAlign: "middle"
  },

  input: {
    width: "100%",
    padding: "6px 10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    color: "#333",
    backgroundColor: "#fff"
  },

  inputdisabled: {
    width: "100%",
    padding: "6px 10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    color: "#999",
    backgroundColor: "#f5f5f5"
  },

  actualizarBtn: {
    padding: "5px 10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.2s"
  },

  actualizarBtnDisabled: {
    cursor: "not-allowed",
    backgroundColor: "#ddd",
    color: "#888",
    opacity: 0.7,
    border: "none"
  },

  deleteBtn: {
    padding: "5px 10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#f44336",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500",
    transition: "background-color 0.2s"
  },

  deleteBtnDisabled: {
    cursor: "not-allowed",
    backgroundColor: "#ddd",
    color: "#888",
    opacity: 0.7,
    border: "none"
  },

  createCard: {
    padding: "20px",
    border: "2px solid #4caf50",
    borderRadius: "8px",
    backgroundColor: "#f6fff6",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },

  createBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "white",
    cursor: "pointer",
    fontWeight: "500"
  },

  select: {
    cursor: "pointer",
    width: "100%",
    padding: "6px 10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    color: "#333",
    backgroundColor: "#fff"
  },

  selectDisabled: {
    cursor: "not-allowed",
    color: "#888",
    opacity: 0.8,
    border: "1px solid #ccc",
    backgroundColor: "#eee"
  }
};

export default Abmplanetas;
