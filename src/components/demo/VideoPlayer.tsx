import { X } from 'lucide-react';
import type { VideoData } from '@/types/demo';

interface VideoPlayerProps {
  video: VideoData;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8 animate-fade-in-up">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold text-white text-glass">
            {video.title}
          </h3>
          <button
            onClick={onClose}
            className="liquid-glass-demo rounded-xl p-3 hover:scale-110 transition-transform duration-300"
          >
            <div className="glass-filter" />
            <div className="glass-overlay" />
            <div className="glass-specular" />
            <div className="glass-content">
              <X className="w-6 h-6 text-white" />
            </div>
          </button>
        </div>

        <div className="video-glass-container rounded-3xl overflow-hidden aspect-video">
          <div className="glass-filter" />
          <div className="glass-overlay" />
          <div className="glass-specular" />
          
          <div className="glass-content">
            {video.url ? (
              <video
                src={"http://3.134.108.30/api/v1/videos/dummy-ad"}
                controls
                autoPlay={true}
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                src={"http://3.134.108.30/api/v1/videos/dummy-ad"}
                controls
                autoPlay={true}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
