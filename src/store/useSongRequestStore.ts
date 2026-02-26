import { create } from 'zustand';

export interface SongRequest {
  id: string;
  songName: string;
  artist?: string;
  message?: string;
  status: 'pending' | 'accepted' | 'playing';
  likes: number;
  createdAt: number;
}

interface SongRequestState {
  requests: SongRequest[];
  addRequest: (songName: string, artist?: string, message?: string) => void;
  likeRequest: (id: string) => void;
  updateStatus: (id: string, status: SongRequest['status']) => void;
  updateRequest: (id: string, data: Partial<SongRequest>) => void;
  deleteRequest: (id: string) => void;
}

const INITIAL_REQUESTS: SongRequest[] = [
  {
    id: '1',
    songName: '晴天',
    artist: '周杰伦',
    message: '想听这首歌怀念一下高中时光~',
    status: 'playing',
    likes: 128,
    createdAt: Date.now() - 1000 * 60 * 5 // 5 mins ago
  },
  {
    id: '2',
    songName: '乌梅子酱',
    artist: '李荣浩',
    message: '送给我的女朋友，希望她天天开心！',
    status: 'accepted',
    likes: 85,
    createdAt: Date.now() - 1000 * 60 * 15 // 15 mins ago
  },
  {
    id: '3',
    songName: '想去海边',
    artist: '夏日入侵企画',
    message: '有没有一起去海边的朋友？',
    status: 'pending',
    likes: 42,
    createdAt: Date.now() - 1000 * 60 * 30 // 30 mins ago
  }
];

export const useSongRequestStore = create<SongRequestState>((set) => ({
  requests: INITIAL_REQUESTS,

  addRequest: (songName, artist, message) => set((state) => ({
    requests: [
      {
        id: `req-${Date.now()}`,
        songName,
        artist,
        message,
        status: 'pending',
        likes: 0,
        createdAt: Date.now()
      },
      ...state.requests
    ]
  })),

  likeRequest: (id) => set((state) => ({
    requests: state.requests.map(req => 
      req.id === id ? { ...req, likes: req.likes + 1 } : req
    )
  })),

  updateStatus: (id, status) => set((state) => ({
    requests: state.requests.map(req => 
      req.id === id ? { ...req, status } : req
    )
  })),

  updateRequest: (id, data) => set((state) => ({
    requests: state.requests.map(req => 
      req.id === id ? { ...req, ...data } : req
    )
  })),

  deleteRequest: (id) => set((state) => ({
    requests: state.requests.filter(req => req.id !== id)
  }))
}));
