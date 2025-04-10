import { useState } from 'react';

import { Chevron } from '@/components/ui/Chevron';
import { PaletteInstructions } from '@/components/widgets/PaletteInstructions/PaletteInstructions';
import { ProductSchema, RouteSchema } from '@/components/widgets/PaletteInstructions/types';

export const PalettePaper = ({
  products,
  id,
  route,
  isOpen,
  handleOpen,
}: {
  products: ProductSchema[][];
  id: string;
  route: RouteSchema;
  isOpen: boolean;
  handleOpen: () => void;
}) => {
  const [completedSerialIds, setCompletedSerialIds] = useState(new Set<string>());
  const toggleCompletedSerialId = (targetSerialId: string) => {
    if (completedSerialIds.has(targetSerialId)) {
      completedSerialIds.delete(targetSerialId);
    } else {
      completedSerialIds.add(targetSerialId);
    }
    setCompletedSerialIds(new Set(completedSerialIds));
  };

  let title = `Палета ${id}`;
  if (completedSerialIds.size > 0) {
    title = `Палета ${id}, выложено ${completedSerialIds.size} из ${products.length}`;
  }

  return (
    <div className="paper">
      <div className="flex gap-2 justify-start items-center interactive sticky top-0 bg-base-100 z-20 w-full" onClick={handleOpen}>
        <h2 className="text-2xl">{title}</h2>
        <Chevron isOpen={isOpen} />
      </div>
      {isOpen && (
        <PaletteInstructions
          products={products}
          route={route}
          completedSerialIds={completedSerialIds}
          toggleCompletedSerialId={toggleCompletedSerialId}
        />
      )}
    </div>
  );
};
