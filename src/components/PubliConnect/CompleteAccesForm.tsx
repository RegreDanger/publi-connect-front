import React from 'react';

type QuickData = { nombre: string; correo: string };
type CompleteData = {
  numero: string;
  edad: string;
  genero: string;
  codigoPostal: string;
  authProvider: string;
  macAddress: string;
  ssid: string;
};

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
        Acceso a WiFi
      </h2>
      <p className="form-subtitle">
        Completa tu perfil y disfruta de tu internet de forma mas sencilla.
      </p>
      
      {/* Nombre (from QuickData) */}
      <div style={{ marginBottom: '12px' }}>
        <label className="form-label">NOMBRE COMPLETO</label>
        <input
          type="text"
          name="nombre"
          value={quickData.nombre}
          onChange={handleQuickChange}
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
          onChange={handleQuickChange}
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
          max="100"
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
          className="form-input select-field"
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
          className="form-input"
        />
      </div>

      {/* CAMPOS OCULTOS PARA EL BACKEND */}
      <input
        type="hidden"
        name="authProvider"
        value={completeData.authProvider}
      />
      
      <input
        type="hidden"
        name="macAddress"
        value={completeData.macAddress}
      />
      
      <input
        type="hidden"
        name="ssid"
        value={completeData.ssid}
      />

      <button
        onClick={handleSubmit}
        className="complete-submit-button"
      >
        Obtener WiFi Ilimitado
      </button>
    </div>
  );
}