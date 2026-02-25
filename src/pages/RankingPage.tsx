import { useState } from 'react';
import { LiveRanking } from '../components/LiveRanking';
import { ArrowLeft, Edit2, Check, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRankingStore } from '../store/useRankingStore';

export const RankingPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const { addUser } = useRankingStore();

  const handleAddUser = () => {
    addUser('新用户', 0);
  };

  return (
    <div className="space-y-6">
      {/* Custom Header for Ranking Page */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md px-2 py-3 flex items-center justify-between border-b border-gray-100 -mx-4 px-6 mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-600 hover:text-jieyou-mint transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-jieyou-text">路演风云榜</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`p-2 -mr-2 transition-colors ${isEditing ? 'text-jieyou-mint' : 'text-gray-400 hover:text-gray-600'}`}
        >
          {isEditing ? <Check size={24} /> : <Edit2 size={24} />}
        </button>
      </header>

      <LiveRanking editable={isEditing} />

      {isEditing && (
        <button
          onClick={handleAddUser}
          className="w-full py-3 mt-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-400 hover:border-jieyou-mint hover:text-jieyou-mint transition-colors flex items-center justify-center space-x-2"
        >
          <Plus size={20} />
          <span>添加用户</span>
        </button>
      )}
    </div>
  );
};
