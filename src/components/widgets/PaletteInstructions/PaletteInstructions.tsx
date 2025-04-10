import { ProductSchema, RouteSchema } from './types';

import { PalettePlot } from '@/components/widgets/PaletteInstructions/PalettePlot';
import { WarehousePlot } from '@/components/widgets/PaletteInstructions/WarehousePlot';
import { PaletteView } from '@/components/widgets/PaletteInstructions/PaletteView';
import { InstructionsView } from '@/components/widgets/PaletteInstructions/InstructionsView';
import { cleanZoneId } from '@/components/utils/cleanZoneId';
import { LayersView } from '@/components/widgets/PaletteInstructions/LayersView';

export const PaletteInstructions = ({
  products,
  route,
  completedSerialIds,
  toggleCompletedSerialId,
}: {
  products: ProductSchema[][];
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

  const flatProducts = products.flat().filter(Boolean);

  return (
    <div className="flex flex-col w-full gap-5">
      <div>
        <div className="flex flex-wrap xl:flex-nowrap gap-2">
          <div className="stats xl:stats-vertical w-full xl:grow border border-[#d7d7d7] rounded-sm">
            <div className="stat">
              <div className="stat-title">Всего точек сбора</div>
              <div className="stat-value">{whZonesIds.length}</div>
              <div className="stat-desc overflow-hidden overflow-ellipsis">{whZonesIds.join(', ')}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Всего коробок</div>
              <div className="stat-value">{flatProducts.length}</div>
              <div className="stat-desc overflow-hidden overflow-ellipsis">{flatProducts.map((x) => x.product.articleId).join(', ')}</div>
            </div>
            <div className="stat">
              <div className="stat-title whitespace-pre">{`Длина перемещений оператора`}</div>
              <div className="stat-value">{totalPath}</div>
              <div className="stat-desc">метров</div>
            </div>
          </div>
          <div className="flex w-full gap-2">
            <WarehousePlot activeZonesIds={whZonesIds} isDetailed={false} />
            <PalettePlot products={flatProducts} isDetailed={false} />
          </div>
        </div>
      </div>
      <PaletteView
        products={flatProducts}
        route={route}
        completedSerialIds={completedSerialIds}
        toggleCompletedSerialId={toggleCompletedSerialId}
      />
      <LayersView
        products={products}
        route={route}
        completedSerialIds={completedSerialIds}
        toggleCompletedSerialId={toggleCompletedSerialId}
      />
      <InstructionsView
        products={flatProducts}
        route={route}
        completedSerialIds={completedSerialIds}
        toggleCompletedSerialId={toggleCompletedSerialId}
      />
    </div>
  );
};
