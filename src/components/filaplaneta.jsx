import { useState, useEffect } from "react";
import planetadefault from "../assets/Captura.JPG";
import logoplanetadefault from "../assets/logoplanetadefault.png";
import {
  getFotosByPlanetaLogo,
  getFotosByPlanetaDetail1,
  getFotosByPlanetaDetail2,
  handleAddFoto,
  deleteFotosById
} from "../services/fotosplanetasservice";
import apiClient from "../api/apiClient";
console.log("TERMINE LOS IMPORT")

function FilaPlaneta({ idPlaneta, token }) {
  // Estado fotos como objeto

  const [fotos, setFotos] = useState({
    logo: null,
    detalle1: null,
    detalle2: null
  });

  const [archivos, setArchivos] = useState({
    LOGO: null,
    "PLANETA 1": null,
    "PLANETA 2": null
  });

  const [previews, setPreviews] = useState({
    LOGO: null,
    "PLANETA 1": null,
    "PLANETA 2": null
  });

  const [loading, setLoading] = useState(false);
  console.log("Acabo de pasar por lo estados const[]")

  // ----------------------------
  // CARGA DE FOTOS
  // --------------------------
  const cargarFotos = async () => {
    try {
      setLoading(true);
      console.log("ejecutando cargar futos para" + idPlaneta)

      const [logo, d1, d2] = await Promise.all([
        getFotosByPlanetaLogo(idPlaneta),
        getFotosByPlanetaDetail1(idPlaneta),
        getFotosByPlanetaDetail2(idPlaneta)
      ]);
      console.log("acade de definir la funcion cargarfotos()------")
      console.log(idPlaneta);
      console.log(logo); console.log(d1); console.log(d2);


      setFotos({
        logo: logo?.[0] ?? null,
        detalle1: d1?.[0] ?? null,
        detalle2: d2?.[0] ?? null
      });

      console.log("acade de pasar por setFOtos")
    } catch (error) {
      console.error("Error cargando fotos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idPlaneta) cargarFotos();
  }, [idPlaneta]);





  // ----------------------------
  // PREVIEW DE ARCHIVOS
  // ----------------------------
  const handleFileChange = (file, tipo) => {
    setArchivos(prev => ({ ...prev, [tipo]: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviews(prev => ({ ...prev, [tipo]: reader.result }
      ));
    };
    reader.readAsDataURL(file);
  };

  const quitarfoto = async (tipo) => {
    const mapTipoAFotoKey = (t) => {
      if (t === "LOGO") return "logo";
      if (t === "PLANETA 1") return "detalle1";
      if (t === "PLANETA 2") return "detalle2";
      return null;
    };
  
    const fotoKey = mapTipoAFotoKey(tipo);
    if (!fotoKey) return "";
  
    const tienePreview = previews[tipo] != null;
    const tieneFoto = fotos[fotoKey] != null;
  
    if (tienePreview && !tieneFoto) {
      setPreviews(prev => ({ ...prev, [tipo]: null }));
      setArchivos(prev => ({ ...prev, [tipo]: null }));
      return "";
    }
  
    if (!tienePreview && tieneFoto) {
      const confirmado = window.confirm("¿Estás seguro que quieres quitar la foto?");
      if (!confirmado) return "";
  
      try {
        await deleteFotosById(fotos[fotoKey].idfoto);   // ← aquí el await real
        setPreviews(prev => ({ ...prev, [tipo]: null }));
        setArchivos(prev => ({ ...prev, [tipo]: null }));
        setFotos(prev => ({ ...prev, [fotoKey]: null }));
      } catch (e) {
        console.error(e);
        alert("No se pudo borrar la foto en el servidor");
      }
    }
  
    return "";
  };

// ----------------------------
// SUBIR FOTO
// ----------------------------
const subirFoto = async tipo => {
  const file = archivos[tipo];
  if (!file) return;

  await handleAddFoto(file, idPlaneta, tipo);
  await cargarFotos();

  setArchivos(prev => ({ ...prev, [tipo]: null }));
  setPreviews(prev => ({ ...prev, [tipo]: null }));
};


const renderImagen = (foto, tipo, fallback) => {

  // 🔥 PRIMERO mostrar preview si existe
  if (previews[tipo]) return previews[tipo];

  // Luego la imagen del backend
  if (foto) return `data:${foto.mimeType};base64,${foto.archivo}`;

  return fallback;
};




// ----------------------------
// RENDER
// ----------------------------
if (loading) {
  return (
    <tr>
      <td colSpan={7}>Cargando fotos...</td>
    </tr>
  );
}

return (
  <tr>
    <td colSpan={7}>
      <div style={styles.wrapper}>
        {/* LOGO */}
        <div style={styles.card}>
          <img
            src={renderImagen(fotos.logo, "LOGO", logoplanetadefault)}
            style={styles.image}
            alt="Logo"
          />
          <input
            type="file"
            accept="image/*"
            onChange={e =>
              e.target.files && handleFileChange(e.target.files[0], "LOGO")
            }
          />
          {archivos.LOGO && <button onClick={() => subirFoto("LOGO")}>Subir</button>}
          <button onClick={() => quitarfoto("LOGO")}>Quitar</button>
        </div>

        {/* DETALLES */}
        {["PLANETA 1", "PLANETA 2"].map(tipo => {
          const foto = tipo === "PLANETA 1" ? fotos.detalle1 : fotos.detalle2;
          return (
            <div key={tipo} style={styles.card}>
              <img
                src={renderImagen(foto, tipo, planetadefault)}
                style={styles.image}
                alt={tipo}
              />
              <div>{foto?.descripcion || "Sin descripción"}</div>

              <input
                type="file"
                accept="image/*"
                onChange={e =>
                  e.target.files && handleFileChange(e.target.files[0], tipo)
                }
              />
              {archivos[tipo] && <button onClick={() => subirFoto(tipo)}>Subir</button>}
              <button onClick={() => quitarfoto(tipo)}>Quitar</button>
            </div>
          );
        })}
      </div>
    </td>
  </tr>
);
}

const styles = {
  wrapper: {
    display: "flex",
    gap: "30px",
    padding: "30px"
  },
  card: {
    width: "250px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px"
  }
};

export default FilaPlaneta;