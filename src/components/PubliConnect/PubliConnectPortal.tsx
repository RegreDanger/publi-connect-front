import React, { useState, useEffect } from 'react';

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
import './PortalStyle.css';

// ========== VALIDACIÓN ROBUSTA DE EMAIL ==========
const validateEmailFormat = (email: string): { valid: boolean; message: string } => {
  email = email.trim();

  if (!email) return { valid: false, message: 'El correo no puede estar vacío' };
  if (!email.includes('@')) return { valid: false, message: 'El correo debe contener @' };

  // Solo un @
  if (email.split('@').length !== 2) return { valid: false, message: 'El correo solo puede tener un @' };

  // Regex básico
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) return { valid: false, message: 'Formato de correo inválido' };

  // Dominios permitidos
  const allowedDomains = [
    'gmail', 'hotmail', 'outlook', 'yahoo', 'icloud', 'protonmail', 'live', 'msn', 'aol', 'mail'
  ];
  // Extensiones permitidas
  const allowedTLDs = ['com', 'mx', 'es'];

  const [, domain] = email.split('@');
  if (!domain) return { valid: false, message: 'Dominio inválido' };

  const domainParts = domain.split('.');
  if (domainParts.length < 2) return { valid: false, message: 'Dominio incompleto' };

  const service = domainParts[0].toLowerCase();
  const tld = domainParts[domainParts.length - 1].toLowerCase();

  if (!allowedDomains.includes(service)) {
    return { valid: false, message: `Solo se permiten correos de: ${allowedDomains.join(', ')}` };
  }

  if (!allowedTLDs.includes(tld)) {
    return { valid: false, message: `Solo se permiten dominios .com, .mx o .es` };
  }

  // No espacios
  if (/\s/.test(email)) return { valid: false, message: 'El correo no puede contener espacios' };

  // Dominio no debe empezar o terminar con punto o guión
  for (const part of domainParts) {
    if (part.startsWith('-') || part.endsWith('-') || part.length === 0) {
      return { valid: false, message: 'Dominio del correo inválido' };
    }
  }

  return { valid: true, message: 'Email válido' };
};
// ========== COMPONENTE PRINCIPAL ==========
export default function PubliConnectPortal() {
  const [phase, setPhase] = useState<RegistrationPhase>('quick');
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const [quickAccessCompleted, setQuickAccessCompleted] = useState(false);

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

  // ========== HANDLERS ==========
  const handleQuickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuickData(prev => ({ ...prev, [name]: value }));
  };

  const handleCompleteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompleteData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos vacíos
    if (!quickData.nombre.trim()) {
      alert('❌ Por favor ingresa tu nombre');
      return;
    }
    
    if (!quickData.correo.trim()) {
      alert('❌ Por favor ingresa tu correo electrónico');
      return;
    }
    
    // Validar formato de email con función robusta
    const emailValidation = validateEmailFormat(quickData.correo);
    if (!emailValidation.valid) {
      alert(`❌ ${emailValidation.message}\n\nEjemplo válido: usuario@gmail.com`);
      return;
    }
    
    // Si todo es válido
    console.log('Acceso rápido:', quickData);
    setQuickAccessCompleted(true);
    alert('✅ ¡Conectado! Tienes 5 minutos de WiFi gratis 🎉\n\n¿Quieres WiFi ilimitado? Completa tu perfil ahora.');
    setPhase('complete');
    
    // Aquí iría la integración con tu backend
    // fetch('http://tu-backend/api/quick-access', { ... })
  };

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones adicionales para el formulario completo
    if (!completeData.numero.trim()) {
      alert('❌ Por favor ingresa tu número de teléfono');
      return;
    }
    
    if (!completeData.edad.trim() || parseInt(completeData.edad) < 1) {
      alert('❌ Por favor ingresa una edad válida');
      return;
    }
    
    if (!completeData.genero) {
      alert('❌ Por favor selecciona tu género');
      return;
    }
    
    if (!completeData.codigoPostal.trim() || completeData.codigoPostal.length !== 5) {
      alert('❌ Por favor ingresa un código postal válido de 5 dígitos');
      return;
    }
    
    const fullData = { ...quickData, ...completeData };
    console.log('Registro completo:', fullData);
    alert('✅ ¡Registro completo! Disfruta WiFi ilimitado 🚀');
    
    // Aquí iría la integración con tu backend
    // fetch('http://tu-backend/api/complete-registration', { ... })
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

  // ========== RENDER FUNCTIONS ==========
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
        disabled={!quickAccessCompleted && phase === 'complete'}
      >
        🚀 Acceso Rápido (5 min)
      </button>
      <button
        onClick={() => setPhase('complete')}
        className={`phase-button ${phase === 'complete' ? 'active' : ''}`}
        disabled={!quickAccessCompleted}
        title={!quickAccessCompleted ? 'Primero completa el acceso rápido' : ''}
      >
        {quickAccessCompleted ? '⭐ Acceso Completo' : '🔒 Acceso Completo (bloqueado)'}
      </button>
    </div>
  );

  const renderHeader = () => (
    <div className="logo-header">
      <div className="pc-logo" translate="no">PC</div>
      <h1 className="portal-title" translate="no">Publi-Connect</h1>
      <p className="portal-subtitle">Conéctate a nuestra red WiFi gratuita</p>
    </div>
  );

  // ========== RENDER PRINCIPAL ==========
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
          <div className="form-section">
            {renderHeader()}
            {renderPhaseButtons()}
            {renderForm()}
          </div>

          <InfoSidebar 
            setCurrentSlide={setCurrentSlide}
          />
        </div>
        
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