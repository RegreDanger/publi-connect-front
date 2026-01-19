import { ArrowLeft, Play } from 'lucide-react';
import type { Ad } from '@/types/demo';

interface AdsListProps {
  ads: Ad[];
  onAdClick: (ad: Ad) => void;
  onBack: () => void;
}

export const AdsList: React.FC<AdsListProps> = ({ ads, onAdClick, onBack }) => {
  return (
    <div className="w-full max-w-2xl animate-fade-in-up">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="liquid-glass-demo rounded-xl p-3 hover:scale-105 transition-transform duration-300"
        >
          <div className="glass-filter" />
          <div className="glass-overlay" />
          <div className="glass-specular" />
          <div className="glass-content">
            <ArrowLeft className="w-5 h-5 text-white" />
          </div>
        </button>
        <h2 className="text-3xl font-semibold text-white text-glass">
          Anuncios Disponibles
        </h2>
      </div>

      <div className="space-y-4">
        {ads.map((ad, index) => (
          <button
            key={ad.id}
            onClick={() => onAdClick(ad)}
            className={`liquid-glass-demo rounded-2xl p-6 w-full text-left card-apple-hover animate-fade-in-up animate-delay-${(index + 1) * 100} group`}
          >
            <div className="glass-filter" />
            <div className="glass-overlay" />
            <div className="glass-specular" />
            
            <div className="glass-content">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-lg icon-glow">
                  <Play className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-medium text-white mb-1 text-glass">
                    {ad.title}
                  </h3>
                  <p className="text-sm text-gray-200 mb-2 text-glass">
                    {ad.description}
                  </p>
                  <span className="text-xs text-blue-300 font-medium">
                    Duración: {ad.duration}
                  </span>
                </div>

                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 text-blue-300" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
