import { useState } from 'react';
import { LiveRanking } from '../components/LiveRanking';
import { ArrowLeft, Edit2, Check, Plus, Menu, Gift, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRankingStore } from '../store/useRankingStore';

export const RankingPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
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
        <h1 className="font-bold text-lg text-jieyou-text">积分榜</h1>
        
        {/* Menu Button (Replacing Edit Button) */}
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Menu size={24} />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              ></div>
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg z-20 border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div 
                  className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors"
                  onClick={() => { setIsEditing(!isEditing); setShowMenu(false); }}
                >
                  {isEditing ? <Check size={18} className="mr-3 text-green-500" /> : <Edit2 size={18} className="mr-3 text-blue-500" />}
                  <span className="text-sm font-medium">{isEditing ? '完成编辑' : '编辑功能'}</span>
                </div>
                <div 
                  className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors"
                  onClick={() => { setShowGiftModal(true); setShowMenu(false); }}
                >
                  <Gift size={18} className="mr-3 text-pink-500" />
                  <span className="text-sm font-medium">积分换奖</span>
                </div>
              </div>
            </>
          )}
        </div>
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

      {/* Gift Modal */}
      {showGiftModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowGiftModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-500">
                <Gift size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">积分换奖说明</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                参与路演互动获取积分，积分可用于兑换精美礼品和专属特权。
                <br/><br/>
                更多兑换规则和奖品清单即将上线，敬请期待！
              </p>
              <button 
                onClick={() => setShowGiftModal(false)}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all"
              >
                知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
