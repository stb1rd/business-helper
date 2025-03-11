import { useMutation } from '@tanstack/react-query';
import { Palette } from './Palette/Palette';
import { OrderSchema } from './Palette/types';

export const IndexPage = () => {
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
    <div className="flex flex-col items-center gap-6">
      <button className="btn btn-primary btn-lg" onClick={() => mutate()}>
        новый заказ
      </button>
      {order?.pallets.map((palette) => (
        <Palette key={palette.palletId} products={palette.products.flat()} />
      ))}
    </div>
  );
};
