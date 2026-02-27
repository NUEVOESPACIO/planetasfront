import { useState, useEffect } from "react";
import planetadefault from "../assets/Captura.JPG";
import logoplanetadefault from "../assets/logoplanetadefault.png";
import { getFotosByPlanetaLogo, handleAddFoto } from "../services/fotosplanetasservice";

function FilaPlaneta({ idPlaneta, token }) {

  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [archivos, setArchivos] = useState([]);
  const [previews, setPreviews] = useState([]); // Opcional: ver la imagen antes de subir

  const fotologo = fotos[0] ?? null;
  const primerafoto = fotos[1] ?? null;
  const segundafoto = fotos[2] ?? null;


  useEffect(() => {
    const cargarFotos = async () => {
      try {
        setLoading(true);

        const [logoFotos, detalle1, detalle2] = await Promise.all([
          getFotosByPlanetaLogo(idPlaneta),
          getFotosByPlanetaDetail1(idPlaneta),
          getFotosByPlanetaDetail2(idPlaneta)
        ]);

        setFotos([
          logoFotos || null,
          detalle1 || null,
          detalle2 || null
        ]);

      } catch (err) {
        //setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (idPlaneta) {
      cargarFotos();
    }
  }, [idPlaneta]);



  const renderImgFotoLogo = (foto) =>
    foto
      ? `data:image/png;base64,${foto.archivo}`
      : previews[0] ? previews[0] : logoplanetadefault;

  const renderImgFotoPlaneta = (foto, i) =>
    foto
      ? `data:image/png;base64,${foto.archivo}`
      : previews[i + 1] ? previews[i + 1] : planetadefault;

  return (
    <tr>
      <td colSpan="7">
        <div style={styles.panelWrapper}>
          <div style={styles.logoSection}>
            <img
              src={renderImgFotoLogo(fotologo)}
              alt="Logo planeta"
              style={styles.logo}
            />
            <div style={styles.actions}>
              <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files[0]; if (!file) return; setArchivos(prev => { const nuevos = [...prev]; nuevos[0] = file; return nuevos; });
                const reader = new FileReader();
                reader.onloadend = () => setPreviews(prev => { const nuevos = [...prev]; nuevos[0] = reader.result; return nuevos });
                reader.readAsDataURL(file);
              }}
              />
              {archivos[0] && <button style={styles.btnPrimary} onClick={() => handleAddFoto(archivos[0], idPlaneta, "LOGO")}>Upload</button>}
              <button style={styles.btnDanger} onClick={() => {
                setArchivos(prev => { const nuevos = [...prev]; nuevos[0] = []; return nuevos; });
                setPreviews(prev => { const nuevos = [...prev]; nuevos[0] = []; return nuevos; });
              }
              }>Quitar</button>
            </div>
          </div>

          {[primerafoto, segundafoto].map((foto, i) => (
            <div key={i} style={styles.card}>
              <img
                src={renderImgFotoPlaneta(foto, i)}
                alt="Planeta"
                style={styles.image}
              />

              <div style={styles.description}>
                {foto?.descripcion || "No hay foto"}
              </div>

              <div style={styles.actions}>
                <input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files[0]; if (!file) return; setArchivos(prev => { const nuevos = [...prev]; nuevos[i + 1] = file; return nuevos; });
                  const reader = new FileReader();
                  reader.onloadend = () => setPreviews(prev => { const nuevos = [...prev]; nuevos[i + 1] = reader.result; return nuevos });
                  reader.readAsDataURL(file);
                }}
                />
                {archivos[i + 1] && <button style={styles.btnPrimary} onClick={() => handleAddFoto(archivos[i + 1], idPlaneta, `PLANETA ${i+1}`)}>Upload</button>}
                <button style={styles.btnDanger} onClick={() => {
                  setArchivos(prev => { const nuevos = [...prev]; nuevos[i + 1] = []; return nuevos; });
                  setPreviews(prev => { const nuevos = [...prev]; nuevos[i + 1] = []; return nuevos; });
                }
                }>Quitar</button>
              </div>
            </div>
          ))}

        </div>
      </td>
    </tr>
  );
}

const styles = {
  panelWrapper: {
    display: "flex",
    gap: "30px",
    padding: "30px",
    margin: "10px 0 20px 0",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

  logoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px"
  },

  logo: {
    width: "140px",
    height: "140px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "1px solid #ddd"
  },

  card: {
    backgroundColor: "#f8fafc",
    padding: "18px",
    borderRadius: "12px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px"
  },

  description: {
    fontSize: "13px",
    color: "#475569",
    textAlign: "center"
  },

  actions: {
    display: "flex",
    gap: "8px",
    justifyContent: "center"
  },

  btnPrimary: {
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  btnSecondary: {
    backgroundColor: "#475569",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  btnDanger: {
    backgroundColor: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default FilaPlaneta;