import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const CurrentActivity = () => {
  const [timeLeft, setTimeLeft] = useState('00:00:00');

  useEffect(() => {
    // Mock countdown to a future date
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 2); // 2 hours from now

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('活动进行中');
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-transparent hover:border-jieyou-mint transition-colors cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-jieyou-text group-hover:text-jieyou-mint transition-colors">
            周五吉他之夜
          </h3>
          <div className="flex items-center text-xs text-gray-400 mt-1 space-x-2">
            <span className="flex items-center">
              <Calendar size={12} className="mr-1" /> 10月24日
            </span>
            <span className="flex items-center">
              <MapPin size={12} className="mr-1" /> 校园广场
            </span>
          </div>
        </div>
        <div className="bg-jieyou-mint/10 text-jieyou-mint px-3 py-1 rounded-full text-xs font-bold flex items-center">
          <Clock size={12} className="mr-1" />
          {timeLeft}
        </div>
      </div>
      
      <p className="text-sm text-gray-500 line-clamp-2">
        带上你的吉他，一起来享受这个美妙的夜晚！现场还有精美礼品相送哦~
      </p>
    </div>
  );
};
