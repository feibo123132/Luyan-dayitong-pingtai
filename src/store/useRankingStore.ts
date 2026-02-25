import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  score: number;
  rank: number;
}

interface RankingState {
  users: User[];
  updateScores: () => void;
}

const INITIAL_USERS: User[] = [
  { id: 'u1', name: '吉他小王子', score: 98, rank: 1 },
  { id: 'u2', name: '民谣阿强', score: 85, rank: 2 },
  { id: 'u3', name: '摇滚萝莉', score: 76, rank: 3 },
  { id: 'u4', name: '指弹大师', score: 72, rank: 4 },
  { id: 'u5', name: '和弦小白', score: 60, rank: 5 },
];

export const useRankingStore = create<RankingState>((set) => ({
  users: INITIAL_USERS,
  updateScores: () => set((state) => {
    // 随机选择一个用户加分
    const randomUserIndex = Math.floor(Math.random() * state.users.length);
    const newUsers = [...state.users];
    
    // 加 5-15 分
    newUsers[randomUserIndex] = {
      ...newUsers[randomUserIndex],
      score: newUsers[randomUserIndex].score + Math.floor(Math.random() * 10) + 5
    };
    
    // 重新排序并更新排名
    newUsers.sort((a, b) => b.score - a.score);
    
    // 更新 rank 字段
    const rankedUsers = newUsers.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
    
    return { users: rankedUsers };
  }),
}));
