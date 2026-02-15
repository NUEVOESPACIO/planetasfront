import { useState } from "react";

function Login({ SebasNavegation}) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json(); // 👈 parse JSON
      })
      .then((data) => {

        // Maneja a travez del localStorage con estas tres variables, datos del login

        localStorage.setItem("token", data.token);        
        localStorage.setItem("rol", data.rol);
        localStorage.setItem("datauser", JSON.stringify(data));
        setLoginStatus("success");        
        SebasNavegation('bienvenida');
      })
      .catch((error) => {
        console.error("Error:", error.message);
        setLoginStatus("error");
      });
    // Later: send to Spring Boot with fetch / axios
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      {loginStatus === "error" && (
        <p className="error-text">Usuario o contraseña incorrectos</p>
      )}

      {loginStatus === "success" && (
        <p className="success-text">¡Bienvenido!</p>
      )}


    </div>
  );
}

const styles = {
  container: {
    width: "300px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Login;

// Mejoras posibles:
//Usar async/await para fetch
//Nombres de props más estándar (onNavigate)
//Mejorar manejo de errores desde el servidor
//Separar estilos si la app crece
