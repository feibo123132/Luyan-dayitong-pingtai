import { ArrowLeft, Clock, Flame, Heart, MessageCircleHeart, Music, Plus, Send, Edit2, Check, Trash2, Menu, Calendar, BarChart2, Box, Volume2, LogOut, RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSongRequestStore } from '../store/useSongRequestStore';
import type { SongRequest } from '../store/useSongRequestStore';

export const SongRequestPage = () => {
  const navigate = useNavigate();
  const { requests, addRequest, likeRequest, updateRequest, deleteRequest } = useSongRequestStore();
  const [activeTab, setActiveTab] = useState<'latest' | 'hot'>('latest');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [songName, setSongName] = useState('');
  const [artist, setArtist] = useState('');
  const [message, setMessage] = useState('');

  // Edit Form State
  const [editForm, setEditForm] = useState<Partial<SongRequest>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!songName.trim()) return;
    
    addRequest(songName, artist, message);
    setShowForm(false);
    setSongName('');
    setArtist('');
    setMessage('');
  };

  const startEdit = (req: SongRequest) => {
    setEditingId(req.id);
    setEditForm(req);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (editingId && editForm) {
      updateRequest(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这条点歌吗？')) {
      deleteRequest(id);
    }
  };

  const sortedRequests = [...requests].sort((a, b) => {
    if (activeTab === 'latest') {
      return b.createdAt - a.createdAt;
    } else {
      return b.likes - a.likes;
    }
  });

  const getStatusBadge = (status: SongRequest['status']) => {
    switch (status) {
      case 'playing':
        return (
          <span className="flex items-center text-xs font-bold text-pink-500 bg-pink-50 px-2 py-1 rounded-full animate-pulse">
            <Music size={12} className="mr-1" /> 正在播放
          </span>
        );
      case 'accepted':
        return (
          <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
            ✅ 已安排
          </span>
        );
      default:
        return (
          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            🕒 待处理
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/50 pb-20">
      {/* Top Banner */}
      <div className="relative h-48 w-full bg-gradient-to-r from-pink-400 to-purple-500 overflow-hidden rounded-b-[2rem] shadow-md">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <h1 className="text-3xl font-bold text-white drop-shadow-md tracking-wide flex items-center">
            <MessageCircleHeart className="mr-2" /> 留言点歌台
          </h1>
          <p className="text-white/80 mt-2 text-sm">写下你想听的歌，送给想念的人</p>
        </div>
      </div>

      {/* Navigation Buttons (Moved outside to avoid overflow clipping) */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-50 p-2 text-white/80 hover:text-white transition-colors bg-black/10 rounded-full backdrop-blur-sm"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Menu Button */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 text-white/80 hover:text-white transition-colors bg-black/10 rounded-full backdrop-blur-sm"
        >
          <Menu size={24} />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 top-12 mt-2 w-40 bg-white rounded-xl shadow-lg z-50 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
            <div 
              className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors"
              onClick={() => { setIsEditing(!isEditing); setShowMenu(false); }}
            >
              <Edit2 size={18} className="mr-3 text-blue-500" />
              <span className="text-sm font-medium">{isEditing ? '退出编辑' : '编辑模式'}</span>
            </div>
            
            <div 
              className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors"
              onClick={() => { setShowMenu(false); alert('回收站功能开发中...'); }}
            >
              <Trash2 size={18} className="mr-3 text-red-500" />
              <span className="text-sm font-medium">回收站</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex justify-center -mt-6 relative z-10 mb-4">
        <div className="bg-white rounded-full p-1 shadow-md flex space-x-1">
          <button
            onClick={() => setActiveTab('latest')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === 'latest' 
                ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center"><Clock size={14} className="mr-1" /> 最新</span>
          </button>
          <button
            onClick={() => setActiveTab('hot')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === 'hot' 
                ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center"><Flame size={14} className="mr-1" /> 热门</span>
          </button>
        </div>
      </div>

      {/* Request List */}
      <div className="max-w-md mx-auto px-4 space-y-4">
        {sortedRequests.map((req) => (
          <div key={req.id} className="bg-white rounded-2xl p-4 shadow-sm border border-pink-100 relative overflow-hidden group">
            {editingId === req.id ? (
              // Edit Mode
              <div className="space-y-3">
                <input
                  type="text"
                  value={editForm.songName || ''}
                  onChange={(e) => setEditForm({...editForm, songName: e.target.value})}
                  className="w-full text-lg font-bold text-gray-800 border-b border-pink-300 focus:outline-none"
                  placeholder="歌名"
                />
                <input
                  type="text"
                  value={editForm.artist || ''}
                  onChange={(e) => setEditForm({...editForm, artist: e.target.value})}
                  className="w-full text-xs text-gray-500 border-b border-pink-300 focus:outline-none"
                  placeholder="歌手"
                />
                <textarea
                  value={editForm.message || ''}
                  onChange={(e) => setEditForm({...editForm, message: e.target.value})}
                  className="w-full bg-pink-50 rounded-xl p-3 text-sm text-gray-600 focus:outline-none resize-none"
                  placeholder="留言内容"
                />
                <div className="flex justify-end space-x-2">
                  <button onClick={saveEdit} className="text-green-500 hover:bg-green-50 p-1 rounded">保存</button>
                  <button onClick={cancelEdit} className="text-gray-400 hover:bg-gray-100 p-1 rounded">取消</button>
                </div>
              </div>
            ) : (
              // View Mode
              <>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{req.songName}</h3>
                    {req.artist && <p className="text-xs text-gray-500">{req.artist}</p>}
                  </div>
                  {getStatusBadge(req.status)}
                </div>

                {req.message && (
                  <div className="bg-pink-50 rounded-xl p-3 text-sm text-gray-600 mb-3 relative">
                    <div className="absolute -top-1 left-4 w-2 h-2 bg-pink-50 rotate-45"></div>
                    "{req.message}"
                  </div>
                )}

                <div className="flex justify-end items-center text-gray-400 text-xs">
                  {isEditing ? (
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => startEdit(req)}
                        className="text-blue-400 hover:text-blue-600"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(req.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => likeRequest(req.id)}
                      className="flex items-center space-x-1 hover:text-pink-500 transition-colors group"
                    >
                      <Heart size={16} className={`group-active:scale-125 transition-transform ${req.likes > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
                      <span>{req.likes}</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
        
        {/* Bottom Spacer for FAB */}
        <div className="h-20"></div>
      </div>

      {/* Bottom Fixed Action Button - Only show when NOT in editing mode */}
      {!isEditing && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md pb-6 pt-4 px-4 bg-gradient-to-t from-white via-white to-transparent z-50">
          <button
            onClick={() => setShowForm(true)}
            className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold shadow-lg shadow-pink-500/30 flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus size={20} className="mr-2" />
            + 参与点歌
          </button>
        </div>
      )}

      {/* Request Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Music className="mr-2 text-pink-500" /> 我要点歌
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">想听什么歌？ <span className="text-red-500">*</span></label>
                <input
                  autoFocus
                  type="text"
                  required
                  placeholder="歌名"
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">歌手 (选填)</label>
                <input
                  type="text"
                  placeholder="歌手名"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">想说的话 (选填)</label>
                <textarea
                  rows={3}
                  placeholder="写下你的心情或祝福..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all resize-none"
                />
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all flex items-center justify-center"
                >
                  <Send size={18} className="mr-2" /> 提交
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
