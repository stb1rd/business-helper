import { useState } from 'react';

import { ProductSchema, RouteSchema } from '@/components/widgets/PaletteInstructions/types';
import { Chevron } from '@/components/ui/Chevron';
import { ProductsView } from '@/components/widgets/ProductsView';
import { cleanZoneId } from '@/components/utils/cleanZoneId';

export const PaletteView = ({
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
  const [isOpen, setIsOpen] = useState(true);

  const productRackMap = new Map<string, string>();
  route?.points.forEach((pointItem) => {
    pointItem.items.forEach((productItem) => {
      productRackMap.set(productItem.articleId, cleanZoneId(pointItem.zone.zoneId));
    });
  });

  return (
    <div>
      <div className="flex gap-2 items-center interactive sticky top-10 bg-base-100 z-10 w-full" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-xl">Выкладка на палету</h3>
        <Chevron size="btn-sm" isOpen={isOpen} />
      </div>
      {isOpen && (
        <ProductsView
          products={products}
          productRackMap={productRackMap}
          completedSerialIds={completedSerialIds}
          toggleCompletedSerialId={toggleCompletedSerialId}
        />
      )}
    </div>
  );
};
