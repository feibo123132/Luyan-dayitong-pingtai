import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Guitar, Medal } from 'lucide-react';
import { useRankingStore } from '../store/useRankingStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const LiveRanking = () => {
  const { users, updateScores } = useRankingStore();

  useEffect(() => {
    const interval = setInterval(() => {
      updateScores();
    }, 3000);

    return () => clearInterval(interval);
  }, [updateScores]);

  // Take only top 5 for preview
  const topUsers = users.slice(0, 5);

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
        {topUsers.map((user) => {
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
              <div className="w-8 flex justify-center">
                {isTop3 ? (
                  <Medal size={24} className={style.iconColor} />
                ) : (
                  <span className="font-bold text-xl text-gray-400">{user.rank}</span>
                )}
              </div>
              
              <div className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center mx-3 text-jieyou-text transition-all",
                isTop3 ? "bg-white shadow-sm scale-110" : "bg-jieyou-gray"
              )}>
                <Guitar size={20} className={isTop3 ? style.iconColor : "text-gray-500"} />
              </div>
              
              <div className="flex-1">
                <div className={clsx(
                  "font-medium text-jieyou-text",
                  isTop3 && "font-bold"
                )}>{user.name}</div>
              </div>
              
              <div className={clsx(
                "font-bold text-lg",
                isTop3 ? style.iconColor : "text-jieyou-text"
              )}>
                {user.score}
              </div>
            </motion.li>
          );
        })}
      </AnimatePresence>
    </ul>
  );
};
