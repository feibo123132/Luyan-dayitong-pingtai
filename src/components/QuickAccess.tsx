import { Music, Trophy, Disc } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QUICK_ACCESS = [
  { id: '1', name: '听歌识曲', icon: Music, color: 'text-blue-500', bg: 'bg-blue-50', path: '/guess-music' },
  { id: '2', name: '积分榜', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50', path: '/ranking' },
  { id: '3', name: '单曲库', icon: Disc, color: 'text-purple-500', bg: 'bg-purple-50', path: '/music' },
];

export const QuickAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-4">
      {(QUICK_ACCESS || []).map((item) => (
        <div
          key={item.id}
          onClick={() => navigate(item.path)}
          className="flex flex-col items-center justify-center space-y-2 p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-95 transition-transform"
        >
          <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center ${item.color}`}>
            <item.icon size={24} />
          </div>
          <span className="text-xs font-medium text-jieyou-text">{item.name}</span>
        </div>
      ))}
    </div>
  );
};
