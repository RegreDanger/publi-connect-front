import React from 'react';
import { Fingerprint, Apple, Loader2 } from 'lucide-react';
import { Button, Input, SocialButton } from '@/components/ui';

export interface RegisterStep1Props {
  loading: boolean;
  curpInput: string;
  onCurpChange: (value: string) => void;
  onValidate: (e: React.FormEvent) => void;
}

export const RegisterStep1: React.FC<RegisterStep1Props> = ({
  loading,
  curpInput,
  onCurpChange,
  onValidate
}) => {
  return (
    <form onSubmit={onValidate} className="space-y-3 animate-in fade-in slide-in-from-right-4">
      <Input
        icon={Fingerprint}
        label="CURP"
        placeholder="JIMM950815..."
        value={curpInput}
        maxLength={18}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCurpChange(e.target.value.toUpperCase())}
        isValid={curpInput.length === 18}
      />
      <Button disabled={loading || curpInput.length < 18} onClick={onValidate}>
        {loading ? <Loader2 className="animate-spin" /> : 'Validar CURP'}
      </Button>

      <div className="relative my-3">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200 dark:border-white/10"></span>
        </div>
        <div className="relative flex justify-center text-[9px] uppercase">
          <span className="bg-transparent dark:bg-transparent px-2 text-gray-500">O regístrate con</span>
        </div>
      </div>
      <div className="flex gap-2">
        <SocialButton icon={Apple} />
        <SocialButton icon={Apple} />
        <SocialButton icon={Apple} />
      </div>
    </form>
  );
};
