import { Play, SkipForward, SkipBack } from 'lucide-react';

export const MusicStation = () => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
      <div className="flex items-center space-x-6">
        {/* Vinyl Record Animation */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-gray-900 animate-spin-slow border-4 border-gray-800 shadow-md flex items-center justify-center">
             <div className="w-8 h-8 rounded-full bg-jieyou-mint border-2 border-white"></div>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-jieyou-text truncate">JIEYOU FM</h3>
          <p className="text-sm text-gray-500 truncate">正在播放: 校园民谣精选</p>
          
          <div className="mt-4 flex items-center justify-between">
            <button className="p-2 text-gray-400 hover:text-jieyou-mint">
              <SkipBack size={20} />
            </button>
            <button className="p-3 bg-jieyou-mint rounded-full text-white shadow-md hover:bg-opacity-90">
              <Play size={24} fill="currentColor" />
            </button>
            <button className="p-2 text-gray-400 hover:text-jieyou-mint">
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-6 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-jieyou-mint w-1/3 rounded-full"></div>
      </div>
    </div>
  );
};
