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
  isDetailed = true,
  completedSerialIds,
}: {
  products: ProductSchema[];
  isDetailed?: boolean;
  completedSerialIds?: Set<string>;
}) => {
  let maxX = PALETTE_SIZE.x;
  let maxY = PALETTE_SIZE.y;
  let maxZ = 2400;

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

  const sizeProps = isDetailed ? 'w-[500px] h-[500px]' : 'w-[350px] h-[350px]';

  const [cameraEyeX, setCameraEyeX] = useState(1.35);
  const [cameraEyeY, setCameraEyeY] = useState(1.35);
  const [cameraEyeZ, setCameraEyeZ] = useState(0.1);

  return (
    <Plot
      onRelayout={(e) => {
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
      }}
      className={`border border-[#d7d7d7] rounded-sm box-content shrink-0 overflow-hidden ${sizeProps}`}
      data={[palettePlotData, ...boxesPlotData]}
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
  );
};
