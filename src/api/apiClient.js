import axios from "axios";

// Crear instancia de Axios con baseURL
const apiClient = axios.create({
  baseURL: "http://localhost:8080/abm",
});

// 👉 Interceptor de request: agrega token automáticamente
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👉 Interceptor de response: manejo global de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;