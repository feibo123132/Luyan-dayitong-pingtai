import { ArrowLeft, Edit2, Check, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGuessMusicStore } from '../store/useGuessMusicStore';
import { useState, useMemo } from 'react';

export const GuessMusicPage = () => {
  const navigate = useNavigate();
  const { users, addUser, updateUser, deleteUser } = useGuessMusicStore();
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...(users || [])]; // Defense: Ensure users is an array

    // Filter by search term
    if (searchTerm) {
      result = result.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [users, searchTerm]);

  const handleAddUser = () => {
    addUser('新选手', 0, 1);
  };

  return (
    <div className="min-h-screen bg-orange-50/50">
      {/* Top Banner with Image Background */}
      <div className="relative h-48 w-full bg-gradient-to-r from-orange-400 to-red-500 overflow-hidden rounded-b-[2rem] shadow-md">
        {/* Placeholder for guitar background image */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <h1 className="text-3xl font-bold text-white drop-shadow-md tracking-wide">校园路演听歌识曲榜</h1>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 text-white/80 hover:text-white transition-colors bg-black/10 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Edit Button */}
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors bg-black/10 rounded-full backdrop-blur-sm"
        >
          {isEditing ? <Check size={24} /> : <Edit2 size={24} />}
        </button>
      </div>

      {/* Ranking List Container */}
      <div className="max-w-md mx-auto px-4 -mt-10 relative z-10 pb-10">
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-2 shadow-lg border border-white/50">
          {/* Table Header */}
          <div className="bg-orange-400 text-white rounded-t-2xl py-3 px-4 flex text-sm font-bold shadow-sm">
            <div className="w-10 text-center">排名</div>
            <div className="flex-1 text-center">昵称</div>
            <div className="w-16 text-center">答对数</div>
            <div className="w-16 text-center">答对率</div>
            <div className="w-16 text-center">参与</div>
            {isEditing && <div className="w-8"></div>}
          </div>

          {/* List Items */}
          <div className="space-y-2 mt-2 px-1">
            {filteredAndSortedUsers.length > 0 ? (
              filteredAndSortedUsers.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl py-3 px-4 flex items-center text-sm shadow-sm hover:shadow-md transition-shadow border border-orange-100/50"
              >
                {/* ... existing item content ... */}
                <div className="w-10 text-center flex-shrink-0">
                  <span className={`font-bold text-lg ${
                    item.rank <= 3 ? 'text-orange-500' : 'text-gray-500'
                  }`}>
                    {item.rank}
                  </span>
                </div>
                
                <div className="flex-1 px-1 min-w-0">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={item.name}
                      onChange={(e) => updateUser(item.id, e.target.value, item.count, item.participationCount)}
                      className="w-full text-center bg-gray-50 border-b border-orange-200 focus:border-orange-500 outline-none text-gray-700"
                    />
                  ) : (
                    <div className="text-center font-medium text-gray-700 truncate">
                      {item.name}
                    </div>
                  )}
                </div>

                <div className="w-16 text-center flex-shrink-0">
                  {isEditing ? (
                    <input 
                      type="number" 
                      value={item.count}
                      onChange={(e) => updateUser(item.id, item.name, Number(e.target.value), item.participationCount)}
                      className="w-full text-center bg-gray-50 border-b border-orange-200 focus:border-orange-500 outline-none font-bold text-orange-600"
                    />
                  ) : (
                    <div className="font-bold text-orange-600">{item.count}</div>
                  )}
                </div>

                <div className="w-16 text-center text-gray-500 text-xs truncate flex-shrink-0">
                  {item.rate}
                </div>

                <div className="w-16 text-center flex-shrink-0">
                  {isEditing ? (
                    <input 
                      type="number" 
                      value={item.participationCount}
                      onChange={(e) => updateUser(item.id, item.name, item.count, Number(e.target.value))}
                      className="w-full text-center bg-gray-50 border-b border-orange-200 focus:border-orange-500 outline-none text-gray-500 text-xs"
                    />
                  ) : (
                    <div className="text-gray-500 text-xs">{item.participationCount}次</div>
                  )}
                </div>

                {isEditing && (
                  <button 
                    onClick={() => deleteUser(item.id)}
                    className="w-8 flex justify-center text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))
            ) : (
              <div className="text-center py-10 text-gray-400 bg-white/50 rounded-xl">
                暂无数据
              </div>
            )}
          </div>

          {isEditing && (
            <button
              onClick={handleAddUser}
              className="w-full py-3 mt-4 rounded-xl border-2 border-dashed border-orange-300 text-orange-400 hover:bg-orange-50 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus size={20} />
              <span>添加选手</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
