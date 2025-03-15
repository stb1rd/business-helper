import { useState } from 'react';

import { Chevron } from '@/components/ui/Chevron';
import { Palette } from '@/components/widgets/Palette/Palette';
import { ProductSchema } from '@/components/widgets/Palette/types';

export const PalettePaper = ({ products, id }: { products: ProductSchema[]; id: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="paper">
      <div className="flex gap-2 justify-between items-center interactive" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-2xl">Палета {id}</h2>
        <Chevron isOpen={isOpen} />
      </div>
      {isOpen && <Palette products={products} />}
    </div>
  );
};
