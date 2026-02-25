import { PointsRanking } from '../components/PointsRanking';
import { ProductMatrix } from '../components/ProductMatrix';

export const UserPage = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4 px-2 text-jieyou-text">我的积分</h2>
        <PointsRanking />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 px-2 text-jieyou-text">关于我们</h2>
        <ProductMatrix />
      </section>
    </div>
  );
};
