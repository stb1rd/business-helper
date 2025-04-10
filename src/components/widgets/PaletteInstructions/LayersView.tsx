import { useState } from 'react';

import { ProductSchema, RouteSchema } from '@/components/widgets/PaletteInstructions/types';
import { Chevron } from '@/components/ui/Chevron';
import { WarehousePlot } from '@/components/widgets/PaletteInstructions/WarehousePlot';
import { ProductsView } from '@/components/widgets/ProductsView';
import { spellPlurals } from '@/components/utils/spellPlurals';
import { cleanZoneId } from '@/components/utils/cleanZoneId';

const getRoutePointTitle = (i: number, products: ProductSchema[], completedSerialIds: Set<string>) => {
  const title = `Слой ${i + 1}`;
  let currentSerialIdsNumber = 0;
  products.forEach((x) => {
    if (completedSerialIds.has(x.serialNumber)) {
      currentSerialIdsNumber += 1;
    }
  });

  if (currentSerialIdsNumber === 0 || products.length === 0) {
    return title;
  }

  return `${title}, выложено ${currentSerialIdsNumber} из ${products.length}`;
};

const getRoutesByProductsLayer = (route: RouteSchema, products: ProductSchema[]): string[] => {
  const result: string[] = [];
  route?.points.forEach((pointItem) => {
    pointItem.items.forEach((item) => {
      if (products.some((x) => x.product.articleId === item.articleId)) {
        result.push(cleanZoneId(pointItem.zone.zoneId));
      }
    });
  });

  return result;
};

export const LayersView = ({
  route,
  products,
  completedSerialIds,
  toggleCompletedSerialId,
}: {
  products: ProductSchema[][];
  route?: RouteSchema;
  completedSerialIds: Set<string>;
  toggleCompletedSerialId: (targetSerialId: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center interactive sticky top-10 bg-base-100 z-10 w-full" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-xl">
          Сборка по слоям – всего {products.length} {spellPlurals(products.length, 'слой', 'слоя', 'слоев')}
        </h3>
        <Chevron size="btn-sm" isOpen={isOpen} />
      </div>
      {isOpen &&
        products?.map((productsLayer, i) => (
          <div key={i}>
            <h4 className="text-l sticky top-18 bg-base-100 z-9 w-full">{getRoutePointTitle(i, productsLayer, completedSerialIds)}</h4>
            <div className="flex gap-3">
              <ProductsView
                products={productsLayer}
                prevProducts={products.slice(0, i).flat()}
                isDetailed={false}
                completedSerialIds={completedSerialIds}
                toggleCompletedSerialId={toggleCompletedSerialId}
              >
                <WarehousePlot activeZonesIds={getRoutesByProductsLayer(route!, productsLayer)} isDetailed={false} />
              </ProductsView>
            </div>
          </div>
        ))}
    </div>
  );
};
