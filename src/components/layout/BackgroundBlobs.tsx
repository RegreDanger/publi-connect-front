import React from 'react';

export interface BackgroundBlobsProps {
  darkMode: boolean;
}

export const BackgroundBlobs: React.FC<BackgroundBlobsProps> = ({ darkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className={`
          absolute top-0 -left-4 w-72 h-72 rounded-full filter blur-3xl opacity-60 animate-blob 
          ${
            darkMode ? 'bg-blue-600/40 mix-blend-screen' : 'bg-blue-300 mix-blend-multiply'
          }
        `}
      ></div>

      <div
        className={`
          absolute top-0 -right-4 w-72 h-72 rounded-full filter blur-3xl opacity-60 animate-blob animation-delay-2000
          ${
            darkMode ? 'bg-purple-600/40 mix-blend-screen' : 'bg-purple-300 mix-blend-multiply'
          }
        `}
      ></div>

      <div
        className={`
          absolute -bottom-8 left-20 w-72 h-72 rounded-full filter blur-3xl opacity-60 animate-blob animation-delay-4000
          ${
            darkMode ? 'bg-pink-600/40 mix-blend-screen' : 'bg-pink-300 mix-blend-multiply'
          }
        `}
      ></div>
    </div>
  );
};
