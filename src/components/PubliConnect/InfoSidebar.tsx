import type { Dispatch, SetStateAction } from 'react';

// 1. Define la interfaz (los tipos de las props que va a recibir)
interface InfoSidebarProps {
  setCurrentSlide: Dispatch<SetStateAction<number>>;
  // Nota: Si no usas estas props dentro de InfoSidebar, puedes quitarlas
  // de la interfaz, pero el error desaparecerá al definirlas.
}

// 2. Define el componente y desestructura las props
export default function InfoSidebar({ setCurrentSlide }: InfoSidebarProps) {
  return (
    <div className="info-section">
      {/* Las burbujas de fondo usan clases CSS */}
      <div className="shape shape-one" />
      <div className="shape shape-two" /> 
      
      <div className="info-content">
        <div className="emoji-icon">📡</div> {/* Puedes poner el icono que quieras */}
        <h2 className="info-title">
          Bienvenido a <span translate="no">Publi-Connect</span>
        </h2>
        <p className="info-description">
          Conéctate en segundos y navega gratis por 5 minutos
        </p>

        <div className="feature-box">
          <h3>¿Por qué registrarte?</h3>
          <div className="feature-list">
            <div>✅ WiFi rápido y seguro</div>
            <div>✅ Sin límite de dispositivos</div>
            <div>✅ Conexión estable</div>
            <div>✅ Soporte 24/7</div>
          </div>
        </div>
        
        {/* Opcional: Agregar un botón para volver al formulario en móvil */}
        <button 
            className="back-to-form-button"
            onClick={() => setCurrentSlide(0)}
            style={{ 
                marginTop: '20px', 
                padding: '10px 20px', 
                background: '#4299e1', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
            }}
        >
            Volver al Formulario
        </button>
        
      </div>
    </div>
  );
}