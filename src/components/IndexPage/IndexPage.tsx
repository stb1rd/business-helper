import { useMutation } from '@tanstack/react-query';
import { Palette } from './Palette/Palette';
import { OrderSchema } from './Palette/types';
import { useState } from 'react';
import { MockedPalettes } from '../MockedPalettes';

export const IndexPage = () => {
  const [isOrderFromMocks, setIsOrderFromMocks] = useState(false);
  const { mutate, data: order } = useMutation({
    mutationFn: async (): Promise<OrderSchema> => {
      const response = await fetch('https://vaambival-want-back-1c8f.twc1.net/rest/order', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          orderId: 'order-123',
          items: [
            {
              articleId: 'ART-123',
              quantity: 5,
            },
          ],
          pallet: {
            widthMm: 800,
            lengthMm: 1200,
            maxHeightMm: 2200,
            maxWeightKg: 1000,
          },
        }),
      });

      const result = await response.json();
      return result;
    },
  });

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex gap-3">
        <button className="btn btn-primary btn-lg" onClick={() => setIsOrderFromMocks(true)}>
          новый заказ из моков
        </button>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            mutate();
            setIsOrderFromMocks(false);
          }}
        >
          новый заказ с API
        </button>
      </div>
      {!isOrderFromMocks &&
        order?.pallets.map((palette) => (
          <div key={palette.palletId} className="flex flex-col border-b-4 border-indigo-500">
            <p className="text-2xl mb-3">{palette.palletId}</p>
            <Palette products={palette.products.flat().filter(Boolean)} />
          </div>
        ))}
      {isOrderFromMocks && <MockedPalettes />}
    </div>
  );
};
