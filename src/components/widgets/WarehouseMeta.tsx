import { WarehouseSchema } from '@/components/widgets/PaletteInstructions/types';
import { useQuery } from '@tanstack/react-query';

import * as DEFAULT_WAREHOUSE from '../mocks/warehouse.json';

export const WarehouseMeta = () => {
  const { data: warehouse } = useQuery({
    queryKey: ['warehouse'],
    initialData: DEFAULT_WAREHOUSE as WarehouseSchema,
    enabled: false,
    queryFn: () => DEFAULT_WAREHOUSE as WarehouseSchema,
  });

  const warehouseSizeX = warehouse.xSizes.reduce((acc, curr) => acc + curr, 0);
  const warehouseSizeY = warehouse.ySizes.reduce((acc, curr) => acc + curr, 0);
  const racksCount = warehouse.zones.flatMap((x) => x).filter(Boolean).length;

  return (
    <div className="stats stats-vertical grow border border-[#d7d7d7] rounded-sm shrink-0">
      <div className="stat">
        <div className="stat-title">Стеллажей</div>
        <div className="stat-value">{racksCount}</div>
      </div>
      <div className="stat">
        <div className="stat-title">Ширина</div>
        <div className="stat-value">{warehouseSizeX / 100}</div>
        <div className="stat-desc">метров</div>
      </div>
      <div className="stat">
        <div className="stat-title">Длина</div>
        <div className="stat-value">{warehouseSizeY / 100}</div>
        <div className="stat-desc">метров</div>
      </div>
    </div>
  );
};
