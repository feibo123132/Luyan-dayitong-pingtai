import { motion, AnimatePresence } from 'framer-motion';
import { Guitar, Medal, Trash2 } from 'lucide-react';
import { useRankingStore } from '../store/useRankingStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface LiveRankingProps {
  limit?: number;
  editable?: boolean;
}

export const LiveRanking = ({ limit, editable = false }: LiveRankingProps) => {
  const { users, updateUser, deleteUser } = useRankingStore();

  // Take only top 5 for preview, or all if no limit
  const displayUsers = limit ? (users || []).slice(0, limit) : (users || []);

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          iconColor: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
        };
      case 2:
        return {
          iconColor: 'text-gray-400',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-200',
        };
      case 3:
        return {
          iconColor: 'text-orange-400',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
        };
      default:
        return {
          iconColor: 'text-gray-300',
          bgColor: 'bg-white',
          borderColor: 'border-transparent',
        };
    }
  };

  return (
    <ul className="space-y-3">
      <AnimatePresence>
        {displayUsers.length > 0 ? (
          displayUsers.map((user) => {
          const style = getRankStyle(user.rank);
          const isTop3 = user.rank <= 3;

          return (
            <motion.li
              key={user.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={twMerge(
                clsx(
                  "rounded-3xl p-4 flex items-center shadow-sm border transition-all duration-300",
                  isTop3 ? style.bgColor : "bg-white",
                  isTop3 ? style.borderColor : "border-transparent hover:border-jieyou-mint"
                )
              )}
            >
              <div className="w-8 flex justify-center flex-shrink-0">
                {isTop3 ? (
                  <Medal size={24} className={style.iconColor} />
                ) : (
                  <span className="font-bold text-xl text-gray-400">{user.rank}</span>
                )}
              </div>
              
              <div className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center mx-3 text-jieyou-text transition-all flex-shrink-0",
                isTop3 ? "bg-white shadow-sm scale-110" : "bg-jieyou-gray"
              )}>
                <Guitar size={20} className={isTop3 ? style.iconColor : "text-gray-500"} />
              </div>
              
              <div className="flex-1 min-w-0 mr-2">
                {editable ? (
                  <input 
                    type="text" 
                    value={user.name} 
                    onChange={(e) => updateUser(user.id, e.target.value, user.score)}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-jieyou-mint outline-none text-jieyou-text font-medium"
                  />
                ) : (
                  <div className={clsx(
                    "font-medium text-jieyou-text truncate",
                    isTop3 && "font-bold"
                  )}>{user.name}</div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {editable ? (
                  <input 
                    type="number" 
                    value={user.score} 
                    onChange={(e) => updateUser(user.id, user.name, Number(e.target.value))}
                    className={clsx(
                      "w-16 bg-transparent border-b border-gray-300 focus:border-jieyou-mint outline-none font-bold text-lg text-right",
                      isTop3 ? style.iconColor : "text-jieyou-text"
                    )}
                  />
                ) : (
                  <div className={clsx(
                    "font-bold text-lg",
                    isTop3 ? style.iconColor : "text-jieyou-text"
                  )}>
                    {user.score}
                  </div>
                )}
                
                {editable && (
                  <button 
                    onClick={() => deleteUser(user.id)}
                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </motion.li>
          );
        })
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-400 bg-white/50 rounded-2xl"
          >
            暂无数据
          </motion.div>
        )}
      </AnimatePresence>
    </ul>
  );
};
