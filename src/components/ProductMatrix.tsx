import { AppWindow, Smartphone } from 'lucide-react';

const PRODUCTS = [
  { id: '1', name: 'JIEYOU 不解忧', desc: '治愈系吉他社区', icon: Smartphone },
  { id: '2', name: '吉他谱大全', desc: '海量曲谱库', icon: AppWindow },
];

export const ProductMatrix = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {(PRODUCTS || []).map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-jieyou-bg flex items-center justify-center text-jieyou-text mb-3">
            <product.icon size={20} />
          </div>
          <h3 className="font-bold text-jieyou-text">{product.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{product.desc}</p>
        </div>
      ))}
    </div>
  );
};
