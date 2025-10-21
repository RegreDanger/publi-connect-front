// src/components/PubliConnect/QuickAccessForm.tsx
import React from 'react';

type QuickData = { nombre: string; correo: string };

interface QuickAccessFormProps {
  data: QuickData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function QuickAccessForm({ data, handleChange, handleSubmit }: QuickAccessFormProps) {
  return (
    <div className="quick-form-wrapper">
      <p className="form-subtitle">Ingresa tus datos para comenzar</p>

      {/* Label outside for nombre */}
      <div className="input-group">
        <label htmlFor="nombre-input" className="form-label-outside">Nombre completo</label>
        <input
          type="text"
          name="nombre"
          value={data.nombre}
          onChange={handleChange}
          required
          className="form-input"
          
          id="nombre-input"
        />
      </div>

      {/* Label outside for correo */}
      <div className="input-group">
        <label htmlFor="correo-input" className="form-label-outside">Correo electrónico</label>
        <input
          type="email"
          name="correo"
          value={data.correo}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="tu@email.com"
          translate="no"
          id="correo-input"
        />
      </div>

      <button onClick={handleSubmit} className="quick-submit-button">
        Conectarme Ahora
      </button>

      <p className="tip-text">
        Completa tu perfil después para WiFi ilimitado
      </p>
    </div>
  );
}