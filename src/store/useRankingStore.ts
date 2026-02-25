import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  score: number;
  rank: number;
}

interface RankingState {
  users: User[];
  addUser: (name: string, score: number) => void;
  updateUser: (id: string, name: string, score: number) => void;
  deleteUser: (id: string) => void;
}

const INITIAL_USERS: User[] = [
  { id: 'u1', name: '吉他小王子', score: 249, rank: 1 },
  { id: 'u2', name: '民谣阿强', score: 239, rank: 2 },
  { id: 'u3', name: '指弹大师', score: 206, rank: 3 },
  { id: 'u4', name: '摇滚萝莉', score: 192, rank: 4 },
  { id: 'u5', name: '和弦小白', score: 155, rank: 5 },
];

export const useRankingStore = create<RankingState>((set) => ({
  users: INITIAL_USERS,
  
  addUser: (name, score) => set((state) => {
    const newUser = {
      id: `u${Date.now()}`,
      name,
      score,
      rank: 0, // 暂时设置为0，稍后统一排序
    };
    const newUsers = [...state.users, newUser];
    
    // 排序并更新 rank
    newUsers.sort((a, b) => b.score - a.score);
    const rankedUsers = newUsers.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
    
    return { users: rankedUsers };
  }),

  updateUser: (id, name, score) => set((state) => {
    const newUsers = state.users.map(user => 
      user.id === id ? { ...user, name, score } : user
    );
    
    // 排序并更新 rank
    newUsers.sort((a, b) => b.score - a.score);
    const rankedUsers = newUsers.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
    
    return { users: rankedUsers };
  }),

  deleteUser: (id) => set((state) => {
    const newUsers = state.users.filter(user => user.id !== id);
    
    // 排序并更新 rank
    newUsers.sort((a, b) => b.score - a.score);
    const rankedUsers = newUsers.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
    
    return { users: rankedUsers };
  }),
}));
