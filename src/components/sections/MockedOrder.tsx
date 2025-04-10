import { ChangeEventHandler, useState } from 'react';

import { Chevron } from '../ui/Chevron';
import { OrderSchema } from '../widgets/PaletteInstructions/types';
import { PalettePaper } from '@/components/ui/PalettePaper';

import * as SAMPLE_PALETTE_PRODUCTS from '../mocks/order.json';

export const MockedPalettes = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [mockValue, setMockValue] = useState(JSON.stringify(SAMPLE_PALETTE_PRODUCTS, null, '  '));
  const [parsedMock, setParsedMock] = useState(SAMPLE_PALETTE_PRODUCTS as unknown as OrderSchema);
  const [parseError, setParseError] = useState('');

  const [visiblePaletteId, setVisiblePaletteId] = useState<string>();

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

  const isDebug = window.localStorage.getItem('debug');
  if (!isDebug) {
    return null;
  }

  return (
    <>
      <div className="paper">
        <div className="flex gap-2 justify-between items-center interactive" onClick={() => setIsOpen(!isOpen)}>
          <h2 className="text-2xl">[debug] Паллетизация из мок-данных</h2>
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
            // products={palette.products.flat().filter(Boolean)}
            products={palette.products}
            route={parsedMock.routes[i]}
            isOpen={visiblePaletteId === palette.palletId}
            handleOpen={() => setVisiblePaletteId(visiblePaletteId !== palette.palletId ? palette.palletId : '')}
          />
        ))}
    </>
  );
};
