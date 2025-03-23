import { useState } from 'react';

import { Chevron } from '@/components/ui/Chevron';
import { PaletteInstructions } from '@/components/widgets/PaletteInstructions/PaletteInstructions';
import { ProductSchema, RouteSchema } from '@/components/widgets/PaletteInstructions/types';

export const PalettePaper = ({ products, id, route }: { products: ProductSchema[]; id: string; route: RouteSchema }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="paper">
      <div
        className="flex gap-2 justify-start items-center interactive sticky top-0 bg-white z-20 w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-2xl">Палета {id}</h2>
        <Chevron isOpen={isOpen} />
      </div>
      {isOpen && <PaletteInstructions products={products} route={route} />}
    </div>
  );
};
