import { Building2 } from 'lucide-react';
import type { Company } from '@/types/demo';

interface CompanyCardProps {
  company: Company;
  onClick: () => void;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="liquid-glass-demo card-apple-hover rounded-3xl p-12 w-96 group"
    >
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div className="glass-specular" />
      
      <div className="glass-content">
        <div className="flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover:shadow-blue-500/60 transition-all duration-400 icon-glow">
            <Building2 className="w-12 h-12 text-white" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-2 text-glass">
              {company.name}
            </h2>
            <p className="text-sm text-gray-200 text-glass">
              {company.description}
            </p>
          </div>

          <div className="mt-4 text-xs text-blue-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Presiona para ver anuncios
          </div>
        </div>
      </div>
    </button>
  );
};
