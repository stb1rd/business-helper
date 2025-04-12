import { useState } from 'react';

import { Chevron } from '@/components/ui/Chevron';
import { OrderSchema } from '@/components/widgets/PaletteInstructions/types';
import { PalettePaper } from '@/components/ui/PalettePaper';
import { FileUpload } from '@/components/widgets/PaletteInstructions/FileUpload';

export const FileApiOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visiblePaletteId, setVisiblePaletteId] = useState<string>();
  const [order, setOrder] = useState<null | OrderSchema>(null);

  return (
    <>
      <div className="paper">
        <div className="flex gap-2 justify-between items-center interactive" onClick={() => setIsOpen(!isOpen)}>
          <h2 className="text-2xl">Паллетизация</h2>
          <Chevron isOpen={isOpen} />
        </div>
        {isOpen && <FileUpload label="Оптимизировать заказ" api="order/file" onSuccess={(data) => setOrder(data)} />}
      </div>
      {order?.pallets.map((palette, i) => (
        <PalettePaper
          key={palette.palletId}
          id={palette.palletId}
          // products={palette.products.flat().filter(Boolean)}
          products={palette.products}
          route={order.routes[i]}
          isOpen={visiblePaletteId === palette.palletId}
          handleOpen={() => setVisiblePaletteId(visiblePaletteId !== palette.palletId ? palette.palletId : '')}
        />
      ))}
    </>
  );
};
