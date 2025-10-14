/*

Just in case for future use

interface InfoSidebarProps {
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  // Nota: es para algun prop que  tengamos 
}*/

// 2. Define el componente y desestructura las props
export default function InfoSidebar() {
  return (
    <div className="info-section">
      {/* Las burbujas de fondo usan clases CSS */}
      <div className="shape shape-one" />
      <div className="shape shape-two" /> 
      
      <div className="info-content">
        <div className="emoji-icon">📡</div> {/* icono que deseemos */}
        <h2 className="info-title">
          Bienvenido a <span translate="no">Publi-Connect</span>
        </h2>
        <p className="info-description">
          Conéctate en segundos y navega gratis por 5 minutos
        </p>

        <div className="feature-box">
          <h3>¿Por qué registrarte?</h3>
          <div className="feature-list">
            <div> WiFi rápido y seguro</div>
            <div>Sin límite de dispositivos</div>
            <div>Conexión estable</div>
            <div>Soporte 24/7</div>
          </div>
        </div>
        </div>
    </div>
  );
}