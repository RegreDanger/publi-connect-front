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
      <p className="form-subtitle">
        Completa tu perfil para WiFi ilimitado
      </p>

      {/* Nombre (from QuickData) */}
      <div className="input-group">
        <label htmlFor="complete-nombre-input" className="form-label-outside">Nombre completo</label>
        <input
          type="text"
          name="nombre"
          value={quickData.nombre}
          onChange={handleQuickChange}
          className="form-input"
          placeholder="Juan Pérez"
          translate="no"
          id="complete-nombre-input"
        />
      </div>

      {/* Correo (from QuickData) */}
      <div className="input-group">
        <label htmlFor="complete-correo-input" className="form-label-outside">Correo electrónico</label>
        <input
          type="email"
          name="correo"
          value={quickData.correo}
          onChange={handleQuickChange}
          className="form-input"
          placeholder="tu@email.com"
          translate="no"
          id="complete-correo-input"
        />
      </div>

      {/* Teléfono (from CompleteData) */}
      <div className="input-group">
        <label htmlFor="numero-input" className="form-label-outside">Teléfono</label>
        <input
          type="tel"
          name="numero"
          value={completeData.numero}
          onChange={handleCompleteChange}
          className="form-input"

          id="numero-input"
        />
      </div>

      {/* Edad (from CompleteData) */}
      <div className="input-group">
        <label htmlFor="edad-input" className="form-label-outside">Edad</label>
        <input
          type="number"
          name="edad"
          value={completeData.edad}
          onChange={handleCompleteChange}
          min="1"
          max="100"
          className="form-input"

          id="edad-input"
        />
      </div>

      {/* Género (from CompleteData) */}
      <div className="input-group">
        <label htmlFor="genero-input" className="form-label-outside">Género</label>
        <select
          name="genero"
          value={completeData.genero}
          onChange={handleCompleteChange}
          className="form-input select-field"
          id="genero-input"
        >
          <option value="">Seleccionar género...</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Código Postal (from CompleteData) */}
      <div className="input-group">
        <label htmlFor="codigoPostal-input" className="form-label-outside">Código postal</label>
        <input
          type="text"
          name="codigoPostal"
          value={completeData.codigoPostal}
          onChange={handleCompleteChange}
          maxLength={5}
          className="form-input"

          id="codigoPostal-input"
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