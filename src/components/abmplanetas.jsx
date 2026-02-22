import { useState, useEffect } from "react";
import FilaPlaneta from "./filaplaneta";

function Abmplanetas() {
  const [usuario] = useState(() => {
    const data = localStorage.getItem("datauser");
    return data ? JSON.parse(data) : null;
  });

  const [planetas, setPlanetas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

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

  /* ================= FETCH ================= */

  useEffect(() => {
    if (!usuario?.token) return;

    fetch("http://localhost:8080/abm/todoslosplanetas", {
      headers: { Authorization: `Bearer ${usuario.token}` }
    })
      .then(res => res.json())
      .then(setPlanetas)
      .catch(err => console.error(err));
  }, [usuario]);

  useEffect(() => {
    if (!usuario?.token) return;

    fetch("http://localhost:8080/abm/todoslosusuarios", {
      headers: { Authorization: `Bearer ${usuario.token}` }
    })
      .then(res => res.json())
      .then(setUsuarios)
      .catch(err => console.error(err));
  }, [usuario]);

  /* ================= HANDLERS ================= */

  const handleChange = (index, field, value) => {
    const nuevos = [...planetas];
    nuevos[index][field] =
      field === "id_usuario" ? parseInt(value) : value;
    setPlanetas(nuevos);
  };

  const actualizarPlaneta = async (planetaf) => {
    const body = {
      idPlaneta: planetaf.id_planeta,
      nombre: planetaf.nombre,
      nombre_cientifico: planetaf.nombre_cientifico,
      masa: parseFloat(planetaf.masa),
      diametro: parseFloat(planetaf.diametro),
      caracteristicas: planetaf.caracteristicas,
      user: { id: planetaf.id_usuario }
    };

    try {
      const res = await fetch(
        "http://localhost:8080/abm/actualizarplaneta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.token}`
          },
          body: JSON.stringify(body)
        }
      );

      if (!res.ok) throw new Error();
      alert("Planeta actualizado correctamente");
    } catch {
      alert("Error al actualizar");
    }
  };

  const crearPlaneta = async () => {
    try {
      const userFinalId =
        usuario?.rol === "ROLE_ASTRONOMO"
          ? usuario.id
          : nuevoPlaneta.user.id;

      const body = {
        ...nuevoPlaneta,
        masa: parseFloat(nuevoPlaneta.masa),
        diametro: parseFloat(nuevoPlaneta.diametro),
        user: { id: userFinalId }
      };

      const res = await fetch(
        "http://localhost:8080/abm/crearplaneta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.token}`
          },
          body: JSON.stringify(body)
        }
      );

      if (!res.ok) throw new Error();

      const planetaCreado = await res.json();

      setPlanetas([
        ...planetas,
        {
          id_planeta: planetaCreado.id,
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
    } catch {
      alert("Error al crear planeta");
    }
  };

  const eliminarPlaneta = async (id) => {
    if (!window.confirm("¿Eliminar planeta?")) return;

    try {
      const res = await fetch(
        `http://localhost:8080/abm/eliminarplaneta/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${usuario.token}` }
        }
      );

      if (!res.ok) throw new Error();
      setPlanetas(planetas.filter(p => p.id_planeta !== id));
    } catch {
      alert("Error al eliminar");
    }
  };

  const handleNuevoChange = (field, value) => {
    if (field === "user") {
      setNuevoPlaneta({ ...nuevoPlaneta, user: { id: parseInt(value) } });
    } else {
      setNuevoPlaneta({ ...nuevoPlaneta, [field]: value });
    }
  };

  /* ================= UI ================= */

  return (
    <main style={styles.container}>
      <h2 style={styles.title}>Administración de Planetas</h2>

      <div style={styles.scrollArea}>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nombre Científico</th>
              <th>Masa</th>
              <th>Diámetro</th>
              <th>Características</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {planetas.map((p, index) => {
              const deshabilitado =
                usuario.rol !== "ROLE_ADMIN" &&
                usuario.id !== p.id_usuario;

              return (
                <>
                  <tr key={p.id_planeta} style={styles.row}>
                    <td>
                      <input
                        style={styles.input}
                        value={p.nombre}
                        onChange={(e) =>
                          handleChange(index, "nombre", e.target.value)
                        }
                        disabled={deshabilitado}
                      />
                    </td>

                    <td>
                      <input
                        style={styles.input}
                        value={p.nombre_cientifico}
                        onChange={(e) =>
                          handleChange(index, "nombre_cientifico", e.target.value)
                        }
                        disabled={deshabilitado}
                      />
                    </td>

                    <td>
                      <input
                        style={styles.inputSmall}
                        value={p.masa}
                        onChange={(e) =>
                          handleChange(index, "masa", e.target.value)
                        }
                        disabled={deshabilitado}
                      />
                    </td>

                    <td>
                      <input
                        style={styles.inputSmall}
                        value={p.diametro}
                        onChange={(e) =>
                          handleChange(index, "diametro", e.target.value)
                        }
                        disabled={deshabilitado}
                      />
                    </td>

                    <td>
                      <input
                        style={styles.input}
                        value={p.caracteristicas}
                        onChange={(e) =>
                          handleChange(index, "caracteristicas", e.target.value)
                        }
                        disabled={deshabilitado}
                      />
                    </td>

                    <td>
                      <select
                        style={styles.select}
                        value={p.id_usuario}
                        onChange={(e) =>
                          handleChange(index, "id_usuario", e.target.value)
                        }
                        disabled={usuario.rol !== "ROLE_ADMIN"}
                      >
                        {usuarios.map(u => (
                          <option key={u.id} value={u.id}>
                            {u.username}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td style={styles.actions}>
                      <button
                        style={styles.btnUpdate}
                        onClick={() => actualizarPlaneta(p)}
                        disabled={deshabilitado}
                      >
                        Actualizar
                      </button>

                      <button
                        style={styles.btnDelete}
                        onClick={() => eliminarPlaneta(p.id_planeta)}
                        disabled={deshabilitado}
                      >
                        Eliminar
                      </button>

                      <button
                        style={styles.btnSecondary}
                        onClick={() =>
                          setExpandedId(
                            expandedId === p.id_planeta
                              ? null
                              : p.id_planeta
                          )
                        }
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
              );
            })}
          </tbody>
        </table>

        {puedeCrearPlaneta && (
          <div style={styles.createSection}>
            <h3 style={styles.subtitle}>Crear Nuevo Planeta</h3>

            <div style={styles.createGrid}>
              <input
                style={styles.input}
                placeholder="Nombre"
                value={nuevoPlaneta.nombre}
                onChange={(e) =>
                  handleNuevoChange("nombre", e.target.value)
                }
              />

              <input
                style={styles.input}
                placeholder="Nombre Científico"
                value={nuevoPlaneta.nombre_cientifico}
                onChange={(e) =>
                  handleNuevoChange("nombre_cientifico", e.target.value)
                }
              />

              <input
                style={styles.inputSmall}
                placeholder="Masa"
                value={nuevoPlaneta.masa}
                onChange={(e) =>
                  handleNuevoChange("masa", e.target.value)
                }
              />

              <input
                style={styles.inputSmall}
                placeholder="Diámetro"
                value={nuevoPlaneta.diametro}
                onChange={(e) =>
                  handleNuevoChange("diametro", e.target.value)
                }
              />

              <input
                style={styles.input}
                placeholder="Características"
                value={nuevoPlaneta.caracteristicas}
                onChange={(e) =>
                  handleNuevoChange("caracteristicas", e.target.value)
                }
              />

              {esAdmin ? (
                <select
                  style={styles.select}
                  value={nuevoPlaneta.user?.id || ""}
                  onChange={(e) =>
                    handleNuevoChange("user", e.target.value)
                  }
                >
                  <option value="">
                    Seleccione usuario creador
                  </option>
                  {usuarios.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.username}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  style={styles.input}
                  value={`${usuario.username} (${usuario.rol})`}
                  disabled
                />
              )}
            </div>

            <button
              style={styles.btnCreate}
              onClick={crearPlaneta}
            >
              Crear Planeta
            </button>
          </div>
        )}

      </div>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: "1400px",
    margin: "40px auto",
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
  },

  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "26px"
  },

  scrollArea: {
    maxHeight: "70vh",
    overflowY: "auto",
    paddingRight: "10px"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px"
  },

  row: {
    borderBottom: "1px solid #eee"
  },

  input: {
    width: "100%",
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ddd"
  },

  inputSmall: {
    width: "90px",
    padding: "6px 8px",
    borderRadius: "6px",
    border: "1px solid #ddd"
  },

  select: {
    width: "100%",
    padding: "6px",
    borderRadius: "6px",
    border: "1px solid #ddd"
  },

  actions: {
    display: "flex",
    gap: "6px"
  },

  btnUpdate: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  btnDelete: {
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  btnSecondary: {
    backgroundColor: "#607d8b",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  createSection: {
    marginTop: "40px",
    paddingTop: "20px",
    borderTop: "1px solid #eee"
  },

  subtitle: {
    marginBottom: "15px"
  },

  createGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
    marginBottom: "15px"
  },

  btnCreate: {
    backgroundColor: "#2e7d32",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default Abmplanetas;