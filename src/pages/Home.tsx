import { HomeCarousel } from '../components/HomeCarousel';
import { QuickAccess } from '../components/QuickAccess';
import { CurrentActivity } from '../components/CurrentActivity';
import { LiveRanking } from '../components/LiveRanking';

export const Home = () => {
  return (
    <div className="space-y-6">
      {/* 轮播图 */}
      <section>
        <HomeCarousel />
      </section>

      {/* 快捷入口 */}
      <section>
        <QuickAccess />
      </section>

      {/* 当前活动 */}
      <section>
        <h2 className="text-lg font-semibold mb-3 px-2 text-jieyou-text">当前活动</h2>
        <CurrentActivity />
      </section>

      {/* 排行榜预览 */}
      <section>
        <div className="flex items-center justify-between mb-3 px-2">
          <h2 className="text-lg font-semibold text-jieyou-text">路演风云榜</h2>
          <button className="text-xs text-jieyou-mint font-medium">查看全部</button>
        </div>
        <LiveRanking limit={5} />
      </section>
    </div>
  );
};
