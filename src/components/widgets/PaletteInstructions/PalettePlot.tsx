import { useState } from 'react';

import Plot, { PlotParams } from 'react-plotly.js';

import { PLOT_DEFAULT_DATA, getPlotData, PALETTE_SIZE, getProductCoords } from '@/components/widgets/PaletteInstructions/helpers';
import { ProductSchema } from '@/components/widgets/PaletteInstructions/types';
import { getColor } from '@/components/utils/getColor';
import { Camera } from 'plotly.js';

const palettePlotData = {
  ...PLOT_DEFAULT_DATA,
  ...getPlotData([0, 0, 0, PALETTE_SIZE.x, PALETTE_SIZE.y, -PALETTE_SIZE.z]),
  color: 'khaki',
  text: 'Палета',
} as PlotParams['data'][number];

export const PalettePlot = ({
  products,
  prevProducts = [],
  isDetailed = true,
  completedSerialIds,
  has2dMode,
}: {
  products: ProductSchema[];
  prevProducts?: ProductSchema[];
  isDetailed?: boolean;
  completedSerialIds?: Set<string>;
  has2dMode?: boolean;
}) => {
  let maxX = PALETTE_SIZE.x;
  let maxY = PALETTE_SIZE.y;
  let maxZ = 2400;

  const prevBoxesPlotData = prevProducts.map((productItem) => {
    const maxCoordX = productItem.x + productItem.product.widthMm;
    const maxCoordY = productItem.y + productItem.product.lengthMm;
    const maxCoordZ = productItem.z + productItem.product.heightMm;
    maxX = Math.max(maxX, maxCoordX);
    maxY = Math.max(maxY, maxCoordY);
    maxZ = Math.max(maxZ, maxCoordZ);

    return {
      ...PLOT_DEFAULT_DATA,
      ...getPlotData(getProductCoords(productItem)),
      text: [
        `номер: ${productItem.serialNumber}`,
        `артикул: ${productItem.product.articleId}`,
        `вес: ${productItem.product.weightKg}`,
      ].join('<br>'),
      color: 'DarkGray',
    };
  }) as PlotParams['data'];

  const boxesPlotData = products.map((productItem) => {
    const maxCoordX = productItem.x + productItem.product.widthMm;
    const maxCoordY = productItem.y + productItem.product.lengthMm;
    const maxCoordZ = productItem.z + productItem.product.heightMm;
    maxX = Math.max(maxX, maxCoordX);
    maxY = Math.max(maxY, maxCoordY);
    maxZ = Math.max(maxZ, maxCoordZ);

    return {
      ...PLOT_DEFAULT_DATA,
      ...getPlotData(getProductCoords(productItem)),
      text: [
        `номер: ${productItem.serialNumber}`,
        `артикул: ${productItem.product.articleId}`,
        `вес: ${productItem.product.weightKg}`,
      ].join('<br>'),
      color: completedSerialIds?.has(productItem.serialNumber) ? 'LightGrey' : getColor(Number(productItem.serialNumber)),
    };
  }) as PlotParams['data'];

  const widthProps = isDetailed ? 'w-full xl:w-[500px]' : 'w-1/2 xl:w-[360px]';
  const heightProps = isDetailed ? 'h-[500px]' : 'h-[360px]';

  const [cameraEyeX, setCameraEyeX] = useState(1.35);
  const [cameraEyeY, setCameraEyeY] = useState(1.35);
  const [cameraEyeZ, setCameraEyeZ] = useState(0.1);

  const handleRelayout = (e: Plotly.PlotRelayoutEvent) => {
    // @ts-expect-error y tho
    const { eye } = (e['scene.camera'] as Camera) || {};
    const newCameraEyeX = eye?.x;
    const newCameraEyeY = eye?.y;
    const newCameraEyeZ = eye?.z;

    if (newCameraEyeX) {
      setCameraEyeX(newCameraEyeX);
    }
    if (newCameraEyeY) {
      setCameraEyeY(newCameraEyeY);
    }
    if (newCameraEyeZ) {
      setCameraEyeZ(newCameraEyeZ);
    }
  };

  const [is2dMode, setIs2dMode] = useState(has2dMode);

  if (is2dMode) {
    return (
      <div className={`flex flex-col gap-2 items-end ${widthProps}`}>
        <svg className={`border border-[#d7d7d7] rounded-sm overflow-hidden w-full ${heightProps}`} viewBox={`0 0 ${maxX} ${maxY}`}>
          <g>
            <title>Палета</title>
            <rect x={0} y={0} width={PALETTE_SIZE.x} height={PALETTE_SIZE.y} fill="khaki" />
          </g>
          {products.map((productItem) => (
            <g key={productItem.serialNumber}>
              <title>
                №{productItem.serialNumber}, артикул: {productItem.product.articleId}
              </title>
              <rect
                x={maxX - productItem.x - productItem.product.widthMm}
                y={productItem.y}
                width={productItem.product.widthMm}
                height={productItem.product.lengthMm}
                fill={getColor(Number(productItem.serialNumber))}
              />
            </g>
          ))}
        </svg>
        {has2dMode && (
          <label className="toggle text-base-content">
            <input type="checkbox" checked={!is2dMode} onClick={() => setIs2dMode(!is2dMode)} />
            <svg aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <text stroke="white" x={2} y={18}>
                2D
              </text>
            </svg>
            <svg aria-label="disabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <text stroke="white" x={2} y={18}>
                3D
              </text>
            </svg>
          </label>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 items-end ${widthProps}`}>
      <Plot
        onRelayout={handleRelayout}
        className={`border border-[#d7d7d7] rounded-sm overflow-hidden w-full ${heightProps}`}
        data={[palettePlotData, ...prevBoxesPlotData, ...boxesPlotData]}
        layout={{
          autosize: true,
          margin: { l: 0, r: 0, b: 0, t: 0 },
          scene: {
            aspectratio: { x: 0.4, y: 0.64, z: 1.2 },
            xaxis: {
              nticks: 8,
              range: [0, maxX],
              title: { text: 'ширина (мм)' },
              visible: isDetailed,
            },
            yaxis: {
              nticks: 12,
              range: [0, maxY],
              title: { text: 'длина (мм)' },
              visible: isDetailed,
            },
            zaxis: {
              nticks: 10,
              range: [-PALETTE_SIZE.z, maxZ],
              title: { text: 'высота (мм)' },
              visible: isDetailed,
            },
            camera: {
              eye: { x: cameraEyeX, y: cameraEyeY, z: cameraEyeZ },
            },
          },
        }}
      />
      {has2dMode && (
        <label className="toggle text-base-content">
          <input type="checkbox" checked={!is2dMode} onClick={() => setIs2dMode(!is2dMode)} />
          <svg aria-label="enabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <text stroke="white" x={2} y={18}>
              2D
            </text>
          </svg>
          <svg aria-label="disabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <text stroke="white" x={2} y={18}>
              3D
            </text>
          </svg>
        </label>
      )}
    </div>
  );
};
