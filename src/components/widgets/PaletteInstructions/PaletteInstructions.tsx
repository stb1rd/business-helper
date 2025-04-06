import { ProductSchema, RouteSchema } from './types';

import { PalettePlot } from '@/components/widgets/PaletteInstructions/PalettePlot';
import { WarehousePlot } from '@/components/widgets/PaletteInstructions/WarehousePlot';
import { PaletteView } from '@/components/widgets/PaletteInstructions/PaletteView';
import { InstructionsView } from '@/components/widgets/PaletteInstructions/InstructionsView';
import { cleanZoneId } from '@/components/utils/cleanZoneId';

export const PaletteInstructions = ({
  products,
  route,
  completedSerialIds,
  toggleCompletedSerialId,
}: {
  products: ProductSchema[];
  route?: RouteSchema;

  completedSerialIds: Set<string>;
  toggleCompletedSerialId: (targetSerialId: string) => void;
}) => {
  const whZonesIds: string[] = [];
  let totalPath = 0;
  route?.points.forEach((pointItem) => {
    whZonesIds.push(cleanZoneId(pointItem.zone.zoneId));
    totalPath += pointItem.pathMeters || 0;
  });

  return (
    <div className="flex flex-col w-full gap-2">
      <div>
        <div className="flex gap-2">
          <div className="stats stats-vertical grow border border-[#d7d7d7] rounded-sm">
            <div className="stat">
              <div className="stat-title">Всего точек сбора</div>
              <div className="stat-value">{whZonesIds.length}</div>
              <div className="stat-desc">{whZonesIds.join(', ')}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Всего коробок</div>
              <div className="stat-value">{products.length}</div>
              <div className="stat-desc overflow-hidden overflow-ellipsis">{products.map((x) => x.product.articleId).join(', ')}</div>
            </div>
            <div className="stat">
              <div className="stat-title whitespace-pre">{`Длина перемещений оператора`}</div>
              <div className="stat-value">{totalPath}</div>
              <div className="stat-desc">метров</div>
            </div>
          </div>
          <WarehousePlot activeZonesIds={whZonesIds} isDetailed={false} />
          <PalettePlot products={products} isDetailed={false} />
        </div>
      </div>
      <PaletteView
        products={products}
        route={route}
        completedSerialIds={completedSerialIds}
        toggleCompletedSerialId={toggleCompletedSerialId}
      />
      <InstructionsView
        products={products}
        route={route}
        completedSerialIds={completedSerialIds}
        toggleCompletedSerialId={toggleCompletedSerialId}
      />
    </div>
  );
};
