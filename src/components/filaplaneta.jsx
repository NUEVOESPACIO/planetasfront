import { useState } from "react";
import planetadefault from "../assets/Captura.JPG";


function FilaPlaneta({ idPlaneta, token }) {

  const [fotos, setFotos] = useState([]);

  const fotologo = fotos[0] !== undefined ? fotos[0] : "No hay foto";
  const primerafoto = fotos[1] !== undefined ? fotos[1] : "No hay foto";
  const segundafoto = fotos[2] !== undefined ? fotos[2] : "No hay foto";

  return (

    <tr>
      <td colspan="7">

        <div style={styles.container}>

          {/* Columna izquierda - Logo */}
          <div style={styles.logoSection}>
            <div style={styles.logoBox}>
              <img src={fotologo === "no hay foto" ? planetadefault : `data:image/png;base64,${fotologo.archivo}`} alt="Planeta" />
              <button style={styles.button}>Cambiar</button>
              <button style={styles.buttonDanger}>Quitar</button>
            </div>
          </div>

          {/* Sección izquierda */}
          <div style={styles.imagesSection}>


            <div key={primerafoto.id_foto} style={styles.imageCard}>

              {/* Imagen */}
              <div style={styles.imageBox}>
                <img
                  src={primerafoto === "no hay foto" ? planetadefault : `data:image/png;base64,${primerafoto.archivo}`}
                  alt={`Imagen ${primerafoto === "no hay foto" ? "no hay foto" : primerafoto.descripcion}`}
                  style={styles.image}
                />
              </div>

      

              {/* Descripción */}
              <div style={styles.descriptionBox}>
                {primerafoto === "no hay foto" ? "No hay foto" : primerafoto.descripcion}
              </div>

              {/* Botones */}
              <div style={styles.actions}>
                <button style={styles.buttonSmall}>
                  Cargar
                </button>

                <button style={styles.buttonSmall}>
                  Cambiar
                </button>

                <button style={styles.buttonDangerSmall}>
                  Quitar
                </button>
              </div>

            </div>


          </div>

          {/* Sección derecha */}
          <div style={styles.imagesSection}>


            <div key={segundafoto.id_foto} style={styles.imageCard}>

              {/* Imagen */}
              <div style={styles.imageBox}>
                <img
                  src={segundafoto === "no hay foto" ? planetadefault : `data:image/png;base64,${segundafoto.archivo}`}
                  alt={`Imagen ${segundafoto === "no hay foto" ? "no hay foto" : segundafoto.descripcion}`}
                  style={styles.image}
                />
              </div>

              {/* Descripción */}
              <div style={styles.descriptionBox}>
                {segundafoto === "no hay foto" ? "No hay foto" : segundafoto.descripcion}
              </div>

              {/* Botones */}
              <div style={styles.actions}>
                <button style={styles.buttonSmall}>
                  Cargar
                </button>

                <button style={styles.buttonSmall}>
                  Cambiar
                </button>

                <button style={styles.buttonDangerSmall}>
                  Quitar
                </button>
              </div>

            </div>


          </div>


        </div>
      </td>
    </tr>
  );

}

const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "20px",
    backgroundColor: "#fafafa",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },

  logoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "150px",
    alignItems: "center"
  },

  logoBox: {
    width: "120px",
    height: "120px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#fff"
  },

  logoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  imagesSection: {
    display: "flex",
    gap: "30px"
  },

  imageCard: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "8px",
    backgroundColor: "#fff",
    minWidth: "150px"
  },

  imageBox: {
    width: "300px",
    height: "180px",
    borderRadius: "6px",
    overflow: "hidden",
    border: "1px solid #ccc"
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },

  descriptionBox: {
    border: "1px solid #eee",
    padding: "5px",
    minHeight: "30px",
    borderRadius: "4px",
    fontSize: "13px",
    backgroundColor: "#f9f9f9"
  },

  actions: {
    display: "flex",
    gap: "5px"
  },

  button: {
    padding: "5px 8px",
    backgroundColor: "#3b6cb7",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "background-color 0.2s"
  },

  buttonDanger: {
    padding: "5px 8px",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    transition: "background-color 0.2s"
  },

  buttonSmall: {
    padding: "3px 6px",
    fontSize: "12px",
    backgroundColor: "#3b6cb7",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },

  buttonDangerSmall: {
    padding: "3px 6px",
    fontSize: "12px",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s"
  }
};
export default FilaPlaneta;
