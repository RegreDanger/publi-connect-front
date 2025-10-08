import React, { useState, useEffect } from 'react';

// Tipos de datos para TypeScript (necesarios para evitar errores)
export type RegistrationPhase = 'quick' | 'complete';

export type QuickData = { 
  nombre: string; 
  correo: string 
};

export type CompleteData = {
  numero: string;
  edad: string;
  genero: string;
  codigoPostal: string;
};

import QuickAccessForm from './QuickAccessForm';
import CompleteAccessForm from './CompleteAccesForm';
import InfoSidebar from './InfoSidebar';
import './PortalStyle.css'; // Estilos comunes

export default function PubliConnectPortal() {
  const [phase, setPhase] = useState<RegistrationPhase>('quick');
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);


  // Estados de datos tipados
  const [quickData, setQuickData] = useState<QuickData>({ nombre: '', correo: '' });
  const [completeData, setCompleteData] = useState<CompleteData>({
    numero: '',
    edad: '',
    genero: '',
    codigoPostal: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // --- Handlers de Lógica y Estado ---

  const handleQuickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("valor cambiado:", e.target.value);
    const { name, value } = e.target;
    setQuickData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompleteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompleteData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Acceso rápido:', quickData);
    alert('¡Conectado! Tienes 5 minutos de WiFi gratis ');
    // Aquí iría la integración con tu backend de publi-connect
  };

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullData = { ...quickData, ...completeData };
    console.log('Registro completo:', fullData);
    alert('¡Registro completo! Disfruta WiFi ilimitado ');
    // Aquí iría la integración con tu backend
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentSlide === 0) {
      setCurrentSlide(1);
    }
    if (isRightSwipe && currentSlide === 1) {
      setCurrentSlide(0);
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // --- Renderizado Condicional de Formularios ---
  const renderForm = () => {
    if (phase === 'quick') {
      return (
        <QuickAccessForm
          data={quickData}
          handleChange={handleQuickChange}
          handleSubmit={handleQuickSubmit}
        />
      );
    }
    
    return (
      <CompleteAccessForm
        quickData={quickData} 
        completeData={completeData}
        handleQuickChange={handleQuickChange} 
        handleCompleteChange={handleCompleteChange}
        handleSubmit={handleCompleteSubmit}
      />
    );
  };

  const renderPhaseButtons = () => (
    <div className="phase-buttons-wrapper">
      <button
        onClick={() => setPhase('quick')}
        className={`phase-button ${phase === 'quick' ? 'active' : ''}`}
      >
        Acceso Rápido (5 min)
      </button>
      <button
        onClick={() => setPhase('complete')}
        className={`phase-button ${phase === 'complete' ? 'active' : ''}`}
      >
        Acceso Completo
      </button>
    </div>
  );

  const renderHeader = () => (
    <div className="logo-header">
      <div className="pc-logo">PC</div>
      <h1 className="portal-title">Publi-Connect</h1>
      <p className="portal-subtitle">Conéctate a nuestra red WiFi gratuita</p>
    </div>
  );

  // --- Estructura Principal del Componente ---
  return (
    <div className="portal-root">
      <div className={`portal-container ${isVisible ? 'visible' : ''}`}>
        <div 
          className="carousel-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sección de Formulario (Izquierda) */}
          <div className="form-section">
            {renderHeader()}
            
            {/* Botones de fase (Quick/Complete) */}
            {renderPhaseButtons()}

            {/* El formulario que se renderiza */}
            {renderForm()}
          </div>

          {/* Sección de Información (Derecha) */}
          <InfoSidebar 
            setCurrentSlide={setCurrentSlide}
          />
        </div>
        
        {/* Indicadores de Carrusel para móvil */}
        <div className="carousel-indicators">
          <div 
            onClick={() => setCurrentSlide(0)}
            className={`indicator ${currentSlide === 0 ? 'active' : ''}`}
          />
          <div 
            onClick={() => setCurrentSlide(1)}
            className={`indicator ${currentSlide === 1 ? 'active' : ''}`}
          />
        </div>
      </div>
    </div>
  );
}