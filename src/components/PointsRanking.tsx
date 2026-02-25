import { Trophy } from 'lucide-react';

const MOCK_POINTS = [
  { id: 'p1', name: '张三', points: 1200 },
  { id: 'p2', name: '李四', points: 980 },
  { id: 'p3', name: '王五', points: 850 },
  { id: 'p4', name: '赵六', points: 720 },
  { id: 'p5', name: '孙七', points: 600 },
];

export const PointsRanking = () => {
  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
      <div className="flex space-x-4 w-max">
        {(MOCK_POINTS || []).map((user) => (
          <div
            key={user.id}
            className="w-32 bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center border border-gray-50"
          >
            <div className="w-8 h-8 rounded-full bg-jieyou-mint/20 text-jieyou-mint flex items-center justify-center mb-2">
              <Trophy size={16} />
            </div>
            <div className="font-medium text-sm text-jieyou-text truncate w-full text-center">
              {user.name}
            </div>
            <div className="text-xs text-gray-500 mt-1">{user.points} pts</div>
          </div>
        ))}
      </div>
    </div>
  );
};
