import React from 'react';

// Define the shape of the data that this form works with
type QuickData = { nombre: string; correo: string };
type CompleteData = {
  numero: string;
  edad: string;
  genero: string;
  codigoPostal: string;
};

// Define the required props for the component
interface CompleteAccessFormProps {
  quickData: QuickData;
  completeData: CompleteData;
  handleQuickChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCompleteChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function CompleteAccessForm({
  quickData,
  completeData,
  handleQuickChange,
  handleCompleteChange,
  handleSubmit,
}: CompleteAccessFormProps) {
  return (
    <div className="complete-form-wrapper">
      <h2 className="form-title">
        Acceso WiFi Ilimitado
      </h2>
      <p className="form-subtitle">
        Completa tu perfil y disfruta internet todo el día
      </p>
      
      {/*
        NOTE: The inputs below use common CSS classes 
        like 'form-label' and 'form-input' defined in PortalStyles.css
      */}
      
      {/* Nombre (from QuickData) */}
      <div style={{ marginBottom: '12px' }}>
        <label className="form-label">NOMBRE COMPLETO</label>
        <input
          type="text"
          name="nombre"
          value={quickData.nombre}
          onChange={handleQuickChange} // Uses quick change handler
          placeholder="Juan Pérez"
          className="form-input"
          translate="no"
        />
      </div>

      {/* Correo (from QuickData) */}
      <div style={{ marginBottom: '12px' }}>
        <label className="form-label">CORREO ELECTRÓNICO</label>
        <input
          type="email"
          name="correo"
          value={quickData.correo}
          onChange={handleQuickChange} // Uses quick change handler
          placeholder="tu@email.com"
          className="form-input"
          translate="no"
        />
      </div>

      {/* Teléfono (from CompleteData) */}
      <div style={{ marginBottom: '12px' }}>
        <label className="form-label">TELÉFONO</label>
        <input
          type="tel"
          name="numero"
          value={completeData.numero}
          onChange={handleCompleteChange}
          placeholder="9931234567"
          className="form-input"
        />
      </div>

      {/* Edad (from CompleteData) */}
      <div style={{ marginBottom: '12px' }}>
        <label className="form-label">EDAD</label>
        <input
          type="number"
          name="edad"
          value={completeData.edad}
          onChange={handleCompleteChange}
          min="1"
          max="120"
          placeholder="25"
          className="form-input"
        />
      </div>

      {/* Género (from CompleteData) */}
      <div style={{ marginBottom: '12px' }}>
        <label className="form-label">GÉNERO</label>
        <select
          name="genero"
          value={completeData.genero}
          onChange={handleCompleteChange}
          className="form-input select-field" // Added select-field for specific select styling if needed
        >
          <option value="">Seleccionar...</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Código Postal (from CompleteData) */}
      <div style={{ marginBottom: '28px' }}>
        <label className="form-label">CÓDIGO POSTAL</label>
        <input
          type="text"
          name="codigoPostal"
          value={completeData.codigoPostal}
          onChange={handleCompleteChange}
          maxLength={5}
          placeholder="86000"
          className="form-input"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="complete-submit-button"
      >
        Obtener WiFi Ilimitado
      </button>
    </div>
  );
}