import { useState } from 'react';

import { ProductSchema, RoutePoint, RouteSchema } from '@/components/widgets/PaletteInstructions/types';
import { Chevron } from '@/components/ui/Chevron';
import { WarehousePlot } from '@/components/widgets/PaletteInstructions/WarehousePlot';
import { cleanZoneId } from '@/components/utils/cleanZoneId';
import { ProductsView } from '@/components/widgets/ProductsView';

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

export const InstructionsView = ({ route, products }: { products: ProductSchema[]; route?: RouteSchema }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center interactive sticky top-10 bg-white z-10 w-full" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-xl">Шаги сборки</h3>
        <Chevron size="btn-sm" isOpen={isOpen} />
      </div>
      {isOpen &&
        route?.points.map((routePoint) => (
          <div key={routePoint.zone.zoneId}>
            <h4 className="text-l sticky top-18 bg-white z-9 w-full">Точка {routePoint.zone.zoneId}</h4>
            <div className="flex gap-3">
              <ProductsView products={getProductsByRoutePoint(routePoint, products)} isDetailed={false}>
                <WarehousePlot activeZonesIds={[cleanZoneId(routePoint.zone.zoneId)]} isDetailed={false} />
              </ProductsView>
            </div>
          </div>
        ))}
    </div>
  );
};
