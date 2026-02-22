import { useState } from "react";
import planetadefault from "../assets/Captura.JPG";

function FilaPlaneta({ idPlaneta, token }) {

  const [fotos] = useState([]);

  const fotologo = fotos[0] ?? null;
  const primerafoto = fotos[1] ?? null;
  const segundafoto = fotos[2] ?? null;

  const renderImg = (foto) =>
    foto
      ? `data:image/png;base64,${foto.archivo}`
      : planetadefault;

  return (
    <tr>
      <td colSpan="7">
        <div style={styles.wrapper}>

          <div style={styles.logoSection}>
            <img
              src={renderImg(fotologo)}
              alt="Logo planeta"
              style={styles.logo}
            />
            <div style={styles.actions}>
              <button style={styles.btnPrimary}>Cambiar</button>
              <button style={styles.btnDanger}>Quitar</button>
            </div>
          </div>

          {[primerafoto, segundafoto].map((foto, i) => (
            <div key={i} style={styles.card}>
              <img
                src={renderImg(foto)}
                alt="Planeta"
                style={styles.image}
              />

              <div style={styles.description}>
                {foto?.descripcion || "No hay foto"}
              </div>

              <div style={styles.actions}>
                <button style={styles.btnPrimary}>Cargar</button>
                <button style={styles.btnSecondary}>Cambiar</button>
                <button style={styles.btnDanger}>Quitar</button>
              </div>
            </div>
          ))}

        </div>
      </td>
    </tr>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: "30px",
    padding: "25px",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)"
  },

  logoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px"
  },

  logo: {
    width: "130px",
    height: "130px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px"
  },

  description: {
    fontSize: "13px",
    color: "#555"
  },

  actions: {
    display: "flex",
    gap: "8px",
    justifyContent: "center"
  },

  btnPrimary: {
    backgroundColor: "#1976d2",
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

  btnDanger: {
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default FilaPlaneta;