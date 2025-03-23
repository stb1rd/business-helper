import { ChangeEventHandler, useState } from 'react';

import { Chevron } from '../ui/Chevron';
import { OrderSchema } from '../widgets/PaletteInstructions/types';
import { PalettePaper } from '@/components/ui/PalettePaper';

const SAMPLE_PALETTE_PRODUCTS = `{
  "orderId": "order-123",
  "pallets": [
    {
      "palletId": "pallet-1",
      "products": [
        [
          {
            "serialNumber": 1,
            "product": {
              "articleId": "BOX-300x400",
              "widthMm": 300,
              "lengthMm": 400,
              "heightMm": 320,
              "weightKg": 10.0,
              "maxLoadKg": 100.0
            },
            "layer": 1,
            "x": 0,
            "y": 0,
            "z": 0,
            "orientation": "HORIZONTAL"
          },
          {
            "serialNumber": 2,
            "product": {
              "articleId": "BOX-300x400",
              "widthMm": 300,
              "lengthMm": 400,
              "heightMm": 320,
              "weightKg": 10.0,
              "maxLoadKg": 100.0
            },
            "layer": 1,
            "x": 300,
            "y": 0,
            "z": 0,
            "orientation": "HORIZONTAL"
          },
          {
            "serialNumber": 3,
            "product": {
              "articleId": "BOX-300x400",
              "widthMm": 300,
              "lengthMm": 400,
              "heightMm": 320,
              "weightKg": 10.0,
              "maxLoadKg": 100.0
            },
            "layer": 1,
            "x": 0,
            "y": 0,
            "z": 320,
            "orientation": "HORIZONTAL"
          }
        ]
      ]
    },
    {
      "palletId": "pallet-2",
      "products": [
        [
          {
            "serialNumber": 4,
            "product": {
              "articleId": "BOX-300x400",
              "widthMm": 300,
              "lengthMm": 400,
              "heightMm": 320,
              "weightKg": 10.0,
              "maxLoadKg": 100.0
            },
            "layer": 1,
            "x": 0,
            "y": 0,
            "z": 0,
            "orientation": "HORIZONTAL"
          },
          {
            "serialNumber": 5,
            "product": {
              "articleId": "BOX-100x200",
              "widthMm": 100,
              "lengthMm": 200,
              "heightMm": 320,
              "weightKg": 10.0,
              "maxLoadKg": 100.0
            },
            "layer": 1,
            "x": 300,
            "y": 0,
            "z": 0,
            "orientation": "HORIZONTAL"
          }
        ]
      ]
    }
  ],
  "routes": [
    {
      "operatorId": "operator-1",
      "points": [
        {
          "zone": {
            "zoneId": "zone-C09",
            "x": 0,
            "y": 0
          },
          "pathMeters": 0,
          "items": [
            {
              "articleId": "BOX-300x400",
              "quantity": 3
            }
          ]
        }
      ]
    },
    {
      "operatorId": "operator-1",
      "points": [
        {
          "zone": {
            "zoneId": "zone-C09",
            "x": 0,
            "y": 0
          },
          "pathMeters": 0,
          "items": [
            {
              "articleId": "BOX-300x400",
              "quantity": 1
            }
          ]
        },
        {
          "zone": {
            "zoneId": "zone-G06",
            "x": 0,
            "y": 0
          },
          "pathMeters": 15,
          "items": [
            {
              "articleId": "BOX-100x200",
              "quantity": 1
            }
          ]
        }
      ]
    }
  ]
}`;

export const MockedPalettes = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [mockValue, setMockValue] = useState(SAMPLE_PALETTE_PRODUCTS);
  const [parsedMock, setParsedMock] = useState<OrderSchema>(JSON.parse(SAMPLE_PALETTE_PRODUCTS));
  const [parseError, setParseError] = useState('');

  const handleTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const newValue = e.target.value;
    setMockValue(newValue);
    try {
      const newParsedValue = JSON.parse(newValue);
      setParsedMock(newParsedValue);
      setParseError('');
    } catch (error) {
      // @ts-expect-error because
      setParseError(error.message);
    }
  };

  return (
    <>
      <div className="paper">
        <div className="flex gap-2 justify-between items-center interactive" onClick={() => setIsOpen(!isOpen)}>
          <h2 className="text-2xl">Создать заказ из мок-данных</h2>
          <Chevron isOpen={isOpen} />
        </div>
        {isOpen && (
          <div className="flex flex-col w-full gap-6 items-center">
            <textarea className="textarea w-full h-96" value={mockValue} onChange={handleTextareaChange} />
            {parseError && (
              <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{parseError}</span>
              </div>
            )}
          </div>
        )}
      </div>
      {isOpen &&
        parsedMock?.pallets.map((palette, i) => (
          <PalettePaper
            key={palette.palletId}
            id={palette.palletId}
            products={palette.products.flat().filter(Boolean)}
            route={parsedMock.routes[i]}
          />
        ))}
    </>
  );
};
