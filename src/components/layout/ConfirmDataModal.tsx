import React from 'react';
import { User, Check, X } from 'lucide-react';
import { Button } from '@/components/ui';
import type { ModalData } from '@/types/auth';

export interface ConfirmDataModalProps {
  data: ModalData | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDataModal: React.FC<ConfirmDataModalProps> = ({ data, onConfirm, onCancel }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <button
        type="button"
        className="absolute inset-0 w-full h-full bg-black/40 backdrop-blur-sm cursor-default"
        onClick={onCancel}
        aria-label="Cerrar modal"
      />

      <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl p-5 w-full max-w-xs shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300 pointer-events-auto">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
            <User size={24} />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Confirma tus datos</h3>
            <p className="text-[10px] text-gray-500">Verifica que la información sea correcta</p>
          </div>

          <div className="w-full bg-gray-50 dark:bg-black/20 rounded-xl p-3 space-y-1.5 text-xs text-left border border-gray-100 dark:border-white/5">
            <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-1">
              <span className="text-gray-500">CURP</span>
              <span className="font-mono font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                {data.data.curp}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-1">
              <span className="text-gray-500">Nombre</span>
              <span className="font-medium text-gray-900 dark:text-white text-right max-w-[150px]">
                {data.data.nombres}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-1">
              <span className="text-gray-500">Apellidos</span>
              <span className="font-medium text-gray-900 dark:text-white text-right max-w-[150px]">
                {data.data.apellidoPaterno} {data.data.apellidoMaterno}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-1">
              <span className="text-gray-500">Edad</span>
              <span className="font-medium text-gray-900 dark:text-white">{data.age} años</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Género</span>
              <span className="font-medium text-gray-900 dark:text-white">{data.data.genero}</span>
            </div>
          </div>

          <div className="flex gap-2 w-full pt-1">
            <Button variant="danger" onClick={onCancel} className="flex-1" icon={X}>
              Descartar
            </Button>
            <Button variant="success" onClick={onConfirm} className="flex-1" icon={Check}>
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
