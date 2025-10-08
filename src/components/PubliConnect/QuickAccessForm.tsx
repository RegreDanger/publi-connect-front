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
      <h2 className="form-title">¡Conéctate en 10 segundos! </h2>
      <p className="form-subtitle">Solo necesitamos tu nombre y correo para darte 5 minutos gratis</p>

      {/* Inputs for nombre and correo using CSS classes: form-label and form-input */}
      <div style={{ marginBottom: '12px' }}>
        <label className="form-label">NOMBRE COMPLETO</label>
        <input type="text" name="nombre" value={data.nombre} onChange={handleChange} required className="form-input" placeholder="Juan Pérez" />
      </div>

      <div style={{ marginBottom: '28px' }}>
        <label className="form-label">CORREO ELECTRÓNICO</label>
        <input type="email" name="correo" value={data.correo} onChange={handleChange} required className="form-input" placeholder="tu@email.com" translate="no" />
        
      </div>

      <button onClick={handleSubmit} className="quick-submit-button">
        Conectarme Ahora (5 min gratis)
      </button>

      <div className="tip-box">
        <strong>Tip:</strong> Completa tu perfil después para WiFi ilimitado todo el día
      </div>
    </div>
  );
}