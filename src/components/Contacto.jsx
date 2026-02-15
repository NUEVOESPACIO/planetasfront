function Contacto() {
  return (
    <main className="center">
      <h2>Contacto</h2>
      <p>Puedes contactarnos a través de los siguientes medios:</p>
      <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
        <h3>Información de Contacto</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '1rem', padding: '0.5rem' }}>
            <strong>Email:</strong> contacto@ejemplo.com
          </li>
          <li style={{ marginBottom: '1rem', padding: '0.5rem' }}>
            <strong>Teléfono:</strong> +1234567890
          </li>
          <li style={{ marginBottom: '1rem', padding: '0.5rem' }}>
            <strong>Dirección:</strong> Calle Ejemplo 123, Ciudad, País
          </li>
        </ul>
      </div>
      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Horarios de Atención</h3>
        <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
        <p>Sábados: 10:00 AM - 2:00 PM</p>
      </div>
    </main>
  );
}

export default Contacto;
