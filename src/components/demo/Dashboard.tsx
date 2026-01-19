import { useState, useEffect } from 'react';
import { CompanyCard } from './CompanyCard';
import { AdsList } from './AdsList';
import { VideoPlayer } from './VideoPlayer';
import DarkVeil from './DarkVeil.tsx';
import { injectDemoStyles, createSVGFilter } from '@/styles/demo';
import type { Company, Ad, VideoData } from '@/types/demo';

const COMPANY_DATA: Company = {
  id: '1',
  name: 'Publi-Connect Communications',
  description: 'Parte de VELER Technologies'
};

const MOCK_ADS: Ad[] = [
  {
    id: 'ad-1',
    title: 'Anuncio Demo',
    description: 'Contenido de demostración',
    duration: '0:30'
  }
];


export const Dashboard = () => {
  const [showAds, setShowAds] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

  useEffect(() => {
    injectDemoStyles();
    createSVGFilter();
  }, []);

  const handleCardClick = () => {
    setShowAds(true);
  };

  const handleAdClick = (ad: Ad) => {
    setSelectedVideo({
      id: ad.id,
      title: ad.title,
      url: ''
    });
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleBackToCompany = () => {
    setShowAds(false);
    setSelectedVideo(null);
  };

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
          resolutionScale={1}
        />
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-indigo-500/10" />

      <div className="relative z-10 h-full w-full flex items-center justify-center p-8">
        {!showAds && !selectedVideo && (
          <div className="animate-fade-in-up">
            <CompanyCard company={COMPANY_DATA} onClick={handleCardClick} />
          </div>
        )}

        {showAds && !selectedVideo && (
          <AdsList 
            ads={MOCK_ADS} 
            onAdClick={handleAdClick}
            onBack={handleBackToCompany}
          />
        )}

        {selectedVideo && (
          <VideoPlayer 
            video={selectedVideo}
            onClose={handleCloseVideo}
          />
        )}
      </div>
    </div>
  );
};
