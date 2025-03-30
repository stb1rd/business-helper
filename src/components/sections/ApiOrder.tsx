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
  const [visiblePaletteId, setVisiblePaletteId] = useState<string>();

  const [bodyValue, setBodyValue] = useState(INIT_BODY_VALUE);
  const {
    mutate,
    data: order,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (): Promise<OrderSchema> => {
      const response = await fetch('https://vaambival-want-back-1c8f.twc1.net/rest/order', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: bodyValue,
      });

      const result = await response.json();
      return result;
    },
    onError: () => {
      // @ts-expect-error y tho
      document?.getElementById('error_modal')?.showModal();
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
              <button className="btn btn-primary btn-lg w-xs" onClick={() => mutate()}>
                {isPending ? <span className="loading loading-spinner" /> : 'Создать заказ'}
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
          isOpen={visiblePaletteId === palette.palletId}
          handleOpen={() => setVisiblePaletteId(palette.palletId)}
        />
      ))}
      <dialog id="error_modal" className="modal">
        <div className="modal-box">
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error?.message}</span>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
          </form>
        </div>
      </dialog>
    </>
  );
};
