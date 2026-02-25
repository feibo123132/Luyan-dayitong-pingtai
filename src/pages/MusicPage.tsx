import { MusicStation } from '../components/MusicStation';

export const MusicPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold px-2 text-jieyou-text">JIEYOU 音乐站</h2>
      <MusicStation />
      {/* 可以在这里添加单曲列表 */}
      <div className="text-center text-gray-400 py-10">
        更多单曲即将上线...
      </div>
    </div>
  );
};
