import { useState } from "react";

function Logout({ SebasNavegation }) {

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("datauser");

    console.log("Sesión cerrada");
    setIsLoggedOut(true);
  };

  return (
    <div style={styles.container}>
      <h2>Logout</h2>

      {!isLoggedOut ? (
        <button 
          type="button" 
          style={styles.button}
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <div>
          <p className="error-text">
            Muchas gracias por visitarme
          </p>

          <button 
            type="button" 
            style={styles.button}
            onClick={() => SebasNavegation('home')}
          >
            Volver al Home
          </button>
        </div>
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
  button: {
    padding: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  },
};

export default Logout;
