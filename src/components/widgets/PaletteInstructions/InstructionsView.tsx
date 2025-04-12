import { useState } from 'react';

import { ProductSchema, RoutePoint, RouteSchema } from '@/components/widgets/PaletteInstructions/types';
import { Chevron } from '@/components/ui/Chevron';
import { WarehousePlot } from '@/components/widgets/PaletteInstructions/WarehousePlot';
import { cleanZoneId } from '@/components/utils/cleanZoneId';
import { ProductsView } from '@/components/widgets/ProductsView';
import { spellPlurals } from '@/components/utils/spellPlurals';

const getProductsByRoutePoint = (routePoint: RoutePoint, products: ProductSchema[]) => {
  const result: ProductSchema[] = [];
  const articlesIds = routePoint.items.map((x) => x.articleId);
  products.forEach((x) => {
    if (articlesIds.includes(x.product.articleId)) {
      result.push(x);
    }
  });

  return result;
};

const getRoutePointTitle = (routePoint: RoutePoint, products: ProductSchema[], completedSerialIds: Set<string>) => {
  const title = `Точка ${routePoint.zone.zoneId}`;
  const currentProducts = getProductsByRoutePoint(routePoint, products);
  let currentSerialIdsNumber = 0;
  currentProducts.forEach((x) => {
    if (completedSerialIds.has(x.serialNumber)) {
      currentSerialIdsNumber += 1;
    }
  });

  if (currentSerialIdsNumber === 0 || currentProducts.length === 0) {
    return title;
  }

  return `${title}, выложено ${currentSerialIdsNumber} из ${currentProducts.length}`;
};

export const InstructionsView = ({
  route,
  products,
  completedSerialIds,
  toggleCompletedSerialId,
}: {
  products: ProductSchema[];
  route?: RouteSchema;
  completedSerialIds: Set<string>;
  toggleCompletedSerialId: (targetSerialId: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  let title = 'Сборка по стеллажам';
  if (route?.points.length) {
    title = `${title} – всего ${route.points.length} ${spellPlurals(route?.points.length, 'шаг', 'шага', 'шагов')}`;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center interactive sticky top-10 bg-base-100 z-10 w-full" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-xl">{title}</h3>
        <Chevron size="btn-sm" isOpen={isOpen} />
      </div>
      {isOpen &&
        route?.points.map((routePoint) => (
          <div key={routePoint.zone.zoneId}>
            <h4 className="text-l sticky top-18 bg-base-100 z-9 w-full">{getRoutePointTitle(routePoint, products, completedSerialIds)}</h4>
            <div className="flex gap-3">
              <ProductsView
                products={getProductsByRoutePoint(routePoint, products)}
                isDetailed={false}
                completedSerialIds={completedSerialIds}
                toggleCompletedSerialId={toggleCompletedSerialId}
                isSvg
              >
                <WarehousePlot activeZonesIds={[cleanZoneId(routePoint.zone.zoneId)]} isDetailed={false} />
              </ProductsView>
            </div>
          </div>
        ))}
    </div>
  );
};
