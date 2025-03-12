import { ChangeEventHandler, useState } from 'react';
import { ProductSchema } from './IndexPage/Palette/types';
import { Palette } from './IndexPage/Palette/Palette';

const SAMPLE_PALETTE_PRODUCTS = `[
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
]`;

export const MockedPalettes = () => {
  const [mockValue, setMockValue] = useState(SAMPLE_PALETTE_PRODUCTS);
  const [parsedMock, setParsedMock] = useState<ProductSchema[]>(JSON.parse(SAMPLE_PALETTE_PRODUCTS));
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
      <Palette products={parsedMock} />
    </div>
  );
};
