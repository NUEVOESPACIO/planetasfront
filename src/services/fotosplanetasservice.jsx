import apiClient from "../api/apiClient";

// 🔹 Buscar fotos genéricas
export const buscarFotos = async (filtros) => {
  try {
    const response = await apiClient.get("/fotos/buscar", { params: filtros });
    return response.data;
  } catch (error) {
    console.error("Error buscando fotos:", error);
    throw error; // opcional, para manejarlo en el componente
  }
};

// 🔹 Obtener solo logo del planeta
export const getFotosByPlanetaLogo = async (idPlaneta) => {
  return buscarFotos({
    tablaasociada: "planetas",
    idasociado: idPlaneta,
    clasificacion: "LOGO",
  });
};

// 🔹 Obtener detalle del planeta
export const getFotosByPlanetaDetail1 = async (idPlaneta) => {
  return buscarFotos({
    tablaasociada: "planetas",
    idasociado: idPlaneta,
    clasificacion: "PLANETA 1",
  });
};

export const getFotosByPlanetaDetail2 = async (idPlaneta) => {
  return buscarFotos({
    tablaasociada: "planetas",
    idasociado: idPlaneta,
    clasificacion: "PLANETA 2",
  });
};


// 🔹 Subir foto (logo o detail) usando apiClient
export const handleAddFoto = async (file, idPlaneta, tipo) => {
  if (!file) return;
  console.log("Archivo a subir:", file, file.size, file.type);  

  const formData = new FormData();
  formData.append("file", file);
  formData.append("descripcion", "A IMPLEMENTEAR");
  formData.append("clasificacion", tipo);
  formData.append("tablaasociada", "planetas");
  formData.append("idasociado", idPlaneta);

  try {
    await apiClient.post("/fotos/upload", formData, {
      headers: {
        // Content-Type opcional, Axios lo detecta automáticamente
        //"Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error agregando foto:", error);
    throw error; // opcional
  }
};