import React from 'react';
import { User, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import type { RegisterFormData } from '@/types/auth';

export interface RegisterStep2Props {
  formData: RegisterFormData;
  errors: Record<string, string>;
  onCodigoPostalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RegisterStep2: React.FC<RegisterStep2Props> = ({
  formData,
  errors,
  onCodigoPostalChange,
  onSubmit
}) => {
  const curpData = formData.curpData;

  if (!curpData) return null;

  return (
    <form onSubmit={onSubmit} className="space-y-2 animate-in fade-in slide-in-from-right-4">
      <div className="grid grid-cols-1 gap-2">
        <Input label="Nombre(s)" value={curpData.nombres} readOnly icon={User} />

        <div className="grid grid-cols-2 gap-2">
          <Input label="Apellido Paterno" value={curpData.apellidoPaterno} readOnly />
          <Input label="Apellido Materno" value={curpData.apellidoMaterno} readOnly />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Edad"
            value={`${formData.edadCalculada} años`}
            readOnly
            icon={Calendar}
          />
          <Input label="Género" value={curpData.genero} readOnly />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Input
            label="Código Postal"
            placeholder="00000"
            value={formData.codigoPostal}
            onChange={onCodigoPostalChange}
            error={errors.codigoPostal}
            maxLength={5}
            icon={MapPin}
            isValid={!errors.codigoPostal && formData.codigoPostal.length === 5}
          />
        </div>
      </div>
      <div className="mt-3">
        <Button variant="primary" type="submit" icon={ArrowRight}>
          Siguiente
        </Button>
      </div>
    </form>
  );
};
