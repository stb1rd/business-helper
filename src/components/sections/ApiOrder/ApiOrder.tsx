import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

import { Chevron } from '@/components/ui/Chevron';
import { OrderSchema } from '@/components/widgets/PaletteInstructions/types';
import { PalettePaper } from '@/components/ui/PalettePaper';

const INIT_BODY_VALUE = `{
  "orderId": "order-123",
  "items": [{ "articleId": "ART-123", "quantity": 5 }],
  "pallet": { "widthMm": 800, "lengthMm": 1200, "maxHeightMm": 2200, "maxWeightKg": 1000 }
}`;

export const ApiOrder = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [bodyValue, setBodyValue] = useState(INIT_BODY_VALUE);
  const { mutate, data: order } = useMutation({
    mutationFn: async (): Promise<OrderSchema> => {
      const response = await fetch('https://vaambival-want-back-1c8f.twc1.net/rest/order', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: bodyValue,
      });

      const result = await response.json();
      return result;
    },
  });

  return (
    <>
      <div className="paper">
        <div className="flex gap-2 justify-between items-center interactive" onClick={() => setIsOpen(!isOpen)}>
          <h2 className="text-2xl">Создать заказ через API</h2>
          <Chevron isOpen={isOpen} />
        </div>
        {isOpen && (
          <>
            <div className="w-full flex gap-2 items-end">
              <textarea className="textarea w-full h-84" value={bodyValue} onChange={(e) => setBodyValue(e.target.value)} />
              <button className="btn btn-primary btn-lg" onClick={() => mutate()}>
                Создать заказ
              </button>
            </div>
          </>
        )}
      </div>
      {order?.pallets.map((palette, i) => (
        <PalettePaper
          key={palette.palletId}
          id={palette.palletId}
          products={palette.products.flat().filter(Boolean)}
          route={order.routes[i]}
        />
      ))}
    </>
  );
};
