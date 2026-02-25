import { ArrowLeft, Edit2, Check, Trash2, Plus, ArrowUp, ArrowDown, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGuessMusicStore } from '../store/useGuessMusicStore';
import { useState, useMemo } from 'react';

type SortKey = 'count' | 'rate' | null;
type SortDirection = 'asc' | 'desc';

export const GuessMusicPage = () => {
  const navigate = useNavigate();
  const { users, addUser, updateUser, deleteUser } = useGuessMusicStore();
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({
    key: null,
    direction: 'desc',
  });

  const handleSort = (key: SortKey) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...(users || [])]; // Defense: Ensure users is an array

    // Filter by search term
    if (searchTerm) {
      result = result.filter(user => 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        let valA: number;
        let valB: number;

        if (sortConfig.key === 'count') {
          valA = a.count;
          valB = b.count;
        } else {
          // 'rate' - convert "88%" to 88
          valA = parseFloat(a.rate);
          valB = parseFloat(b.rate);
        }

        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      });
    }

    return result;
  }, [users, searchTerm, sortConfig]);

  const handleAddUser = () => {
    addUser('新选手', 0, 1);
  };

  return (
    <div className="min-h-screen bg-teal-50/50">
      {/* Top Banner with Image Background */}
      <div className="relative h-48 w-full bg-gradient-to-r from-jieyou-mint to-teal-400 overflow-hidden rounded-b-[2rem] shadow-md">
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
          <div className="bg-gradient-to-r from-jieyou-mint to-teal-400 text-white rounded-t-2xl py-3 px-4 flex text-sm font-bold shadow-sm items-center">
            <div className="w-10 text-center">排名</div>
            
            <div className="flex-1 text-center relative group">
              <div 
                className="flex items-center justify-center cursor-pointer hover:bg-white/10 rounded py-1 transition-colors"
                onClick={() => setShowSearch(!showSearch)}
              >
                昵称
                <Search size={14} className="ml-1 opacity-70" />
              </div>
              
              {/* Search Dropdown */}
              {showSearch && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white p-2 rounded-xl shadow-xl z-20 border border-teal-100">
                  <input
                    autoFocus
                    type="text"
                    placeholder="搜索昵称..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 text-xs focus:outline-none focus:border-teal-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </div>

            <div 
              className="w-16 text-center cursor-pointer hover:bg-white/10 rounded py-1 transition-colors flex flex-col items-center justify-center"
              onClick={() => handleSort('count')}
            >
              <div className="flex items-center">
                答对数
                <div className="ml-0.5 flex flex-col -space-y-1">
                  <ArrowUp size={8} className={sortConfig.key === 'count' && sortConfig.direction === 'asc' ? 'text-white' : 'text-white/40'} />
                  <ArrowDown size={8} className={sortConfig.key === 'count' && sortConfig.direction === 'desc' ? 'text-white' : 'text-white/40'} />
                </div>
              </div>
            </div>

            <div 
              className="w-16 text-center cursor-pointer hover:bg-white/10 rounded py-1 transition-colors flex flex-col items-center justify-center"
              onClick={() => handleSort('rate')}
            >
              <div className="flex items-center">
                答对率
                <div className="ml-0.5 flex flex-col -space-y-1">
                  <ArrowUp size={8} className={sortConfig.key === 'rate' && sortConfig.direction === 'asc' ? 'text-white' : 'text-white/40'} />
                  <ArrowDown size={8} className={sortConfig.key === 'rate' && sortConfig.direction === 'desc' ? 'text-white' : 'text-white/40'} />
                </div>
              </div>
            </div>

            <div className="w-16 text-center">参与</div>
            {isEditing && <div className="w-8"></div>}
          </div>

          {/* List Items */}
          <div className="space-y-2 mt-2 px-1">
            {filteredAndSortedUsers.length > 0 ? (
              filteredAndSortedUsers.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl py-3 px-4 flex items-center text-sm shadow-sm hover:shadow-md transition-shadow border border-teal-100/50"
              >
                {/* ... existing item content ... */}
                <div className="w-10 text-center flex-shrink-0">
                  <span className={`font-bold text-lg ${
                    item.rank <= 3 ? 'text-teal-500' : 'text-gray-500'
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
                      className="w-full text-center bg-gray-50 border-b border-teal-200 focus:border-teal-500 outline-none text-gray-700"
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
                      className="w-full text-center bg-gray-50 border-b border-teal-200 focus:border-teal-500 outline-none font-bold text-teal-600"
                    />
                  ) : (
                    <div className="font-bold text-teal-600">{item.count}</div>
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
                      className="w-full text-center bg-gray-50 border-b border-teal-200 focus:border-teal-500 outline-none text-gray-500 text-xs"
                    />
                  ) : (
                    <div 
                      onClick={() => navigate(`/guess-music/history/${item.id}`)}
                      className="text-gray-500 text-xs hover:text-teal-500 hover:underline cursor-pointer transition-colors py-1"
                    >
                      {item.participationCount}次
                    </div>
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
              className="w-full py-3 mt-4 rounded-xl border-2 border-dashed border-teal-300 text-teal-400 hover:bg-teal-50 transition-colors flex items-center justify-center space-x-2"
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
