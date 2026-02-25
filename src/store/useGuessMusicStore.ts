import { create } from 'zustand';

interface GuessUser {
  id: string;
  name: string;
  count: number; // 答对数
  participationCount: number; // 参与次数
  rate: string; // 答对率 (百分比字符串)
  rank: number;
}

interface GuessMusicState {
  activeLocation: string;
  rankings: Record<string, GuessUser[]>; // Keyed by location name
  
  // Actions
  switchLocation: (locationName: string) => void;
  getUsers: () => GuessUser[];
  addUser: (name: string, count: number, participationCount: number) => void;
  updateUser: (id: string, name: string, count: number, participationCount: number) => void;
  deleteUser: (id: string) => void;
}

// 每次参与答题总数固定为 4 首
const SONGS_PER_ROUND = 4;

const calculateRate = (count: number, participationCount: number): string => {
  if (participationCount === 0) return '0%';
  const totalSongs = participationCount * SONGS_PER_ROUND;
  const validCount = Math.min(count, totalSongs);
  return `${Math.round((validCount / totalSongs) * 100)}%`;
};

const sortAndRankUsers = (users: GuessUser[]): GuessUser[] => {
  const sortedUsers = [...users].sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    const rateA = parseFloat(a.rate);
    const rateB = parseFloat(b.rate);
    return rateB - rateA;
  });

  return sortedUsers.map((user, index) => ({
    ...user,
    rank: index + 1
  }));
};

// Initial Data for "广西一颗蛋🥚" (The Default)
const DEFAULT_USERS: GuessUser[] = [
  { id: '1', name: 'JIEYOU', count: 30, participationCount: 10, rate: '75%', rank: 1 },
  { id: '2', name: '小橘同学', count: 28, participationCount: 8, rate: '88%', rank: 2 },
  { id: '3', name: '吉他手阿泽', count: 25, participationCount: 7, rate: '89%', rank: 3 },
  { id: '4', name: '听歌达人小夏', count: 22, participationCount: 6, rate: '92%', rank: 4 },
  { id: '5', name: '校园歌神', count: 20, participationCount: 6, rate: '83%', rank: 5 },
];

// Mock Data Generators for Other Locations
const generateMockUsers = (location: string): GuessUser[] => {
  const mocks: GuessUser[] = [];
  
  if (location === '音乐学院操场') {
    mocks.push(
      { id: 'm1', name: '钢琴王子', count: 38, participationCount: 10, rate: '95%', rank: 1 },
      { id: 'm2', name: '声乐系学姐', count: 35, participationCount: 9, rate: '97%', rank: 2 },
      { id: 'm3', name: '绝对音感', count: 32, participationCount: 8, rate: '100%', rank: 3 },
      { id: 'm4', name: '合唱团长', count: 28, participationCount: 8, rate: '88%', rank: 4 }
    );
  } else if (location === '万达广场') {
    mocks.push(
      { id: 'w1', name: '逛街路人甲', count: 15, participationCount: 5, rate: '75%', rank: 1 },
      { id: 'w2', name: '奶茶店员', count: 12, participationCount: 3, rate: '100%', rank: 2 },
      { id: 'w3', name: '滑板少年', count: 10, participationCount: 4, rate: '63%', rank: 3 }
    );
  } else if (location === '民歌湖畔') {
    mocks.push(
      { id: 'l1', name: '民歌天后', count: 40, participationCount: 10, rate: '100%', rank: 1 },
      { id: 'l2', name: '夜跑大叔', count: 20, participationCount: 10, rate: '50%', rank: 2 },
      { id: 'l3', name: '湖畔吉他', count: 18, participationCount: 5, rate: '90%', rank: 3 }
    );
  } else {
    // Generic fallback
    mocks.push(
      { id: 'g1', name: '神秘路人', count: 8, participationCount: 2, rate: '100%', rank: 1 }
    );
  }
  
  return sortAndRankUsers(mocks);
};

export const useGuessMusicStore = create<GuessMusicState>((set, get) => ({
  activeLocation: '广西一颗蛋🥚',
  rankings: {
    '广西一颗蛋🥚': DEFAULT_USERS
  },

  switchLocation: (locationName) => {
    set((state) => {
      // If data already exists, just switch active location
      if (state.rankings[locationName]) {
        return { activeLocation: locationName };
      }
      
      // If not, generate new mock data
      const newUsers = generateMockUsers(locationName);
      return {
        activeLocation: locationName,
        rankings: {
          ...state.rankings,
          [locationName]: newUsers
        }
      };
    });
  },

  getUsers: () => {
    const state = get();
    return state.rankings[state.activeLocation] || [];
  },

  addUser: (name, count, participationCount) => set((state) => {
    const currentUsers = state.rankings[state.activeLocation] || [];
    const newUser: GuessUser = {
      id: `g${Date.now()}`,
      name,
      count,
      participationCount,
      rate: calculateRate(count, participationCount),
      rank: 0,
    };
    
    const newUsers = sortAndRankUsers([...currentUsers, newUser]);
    
    return {
      rankings: {
        ...state.rankings,
        [state.activeLocation]: newUsers
      }
    };
  }),

  updateUser: (id, name, count, participationCount) => set((state) => {
    const currentUsers = state.rankings[state.activeLocation] || [];
    const updatedUsers = currentUsers.map(user => {
      if (user.id === id) {
        return {
          ...user,
          name,
          count,
          participationCount,
          rate: calculateRate(count, participationCount),
        };
      }
      return user;
    });

    const newUsers = sortAndRankUsers(updatedUsers);

    return {
      rankings: {
        ...state.rankings,
        [state.activeLocation]: newUsers
      }
    };
  }),

  deleteUser: (id) => set((state) => {
    const currentUsers = state.rankings[state.activeLocation] || [];
    const filteredUsers = currentUsers.filter(user => user.id !== id);
    const newUsers = sortAndRankUsers(filteredUsers);

    return {
      rankings: {
        ...state.rankings,
        [state.activeLocation]: newUsers
      }
    };
  }),
}));

export type { GuessUser };
