import Plot, { PlotParams } from 'react-plotly.js';

import { PLOT_DEFAULT_DATA, getPlotData, PALETTE_SIZE, getProductCoords } from '@/components/widgets/Palette/helpers';
import { ProductSchema } from '@/components/widgets/Palette/types';

const palettePlotData = {
  ...PLOT_DEFAULT_DATA,
  ...getPlotData([0, 0, 0, PALETTE_SIZE.x, PALETTE_SIZE.y, -PALETTE_SIZE.z]),
  color: 'khaki',
  name: 'Палета',
} as PlotParams['data'][number];

export const PalettePlot = ({ products }: { products: ProductSchema[] }) => {
  const boxesPlotData = products.map((productItem) => ({
    ...PLOT_DEFAULT_DATA,
    ...getPlotData(getProductCoords(productItem)),
    name: `${productItem.serialNumber} ${productItem.product.articleId}`,
  })) as PlotParams['data'];

  return (
    <Plot
      className="border border-[#d7d7d7] rounded-sm w-[500px] h-[500px] box-content shrink-0 overflow-hidden"
      data={[palettePlotData, ...boxesPlotData]}
      layout={{
        autosize: true,
        margin: { l: 0, r: 0, b: 0, t: 0 },
        scene: {
          aspectratio: { x: 0.4, y: 0.64, z: 1.2 },
          xaxis: {
            nticks: 8,
            range: [0, PALETTE_SIZE.x],
            title: { text: 'ширина (мм)' },
          },
          yaxis: {
            nticks: 12,
            range: [0, PALETTE_SIZE.y],
            title: { text: 'длина (мм)' },
          },
          zaxis: {
            nticks: 10,
            range: [-PALETTE_SIZE.z, 2000],
            title: { text: 'высота (мм)' },
          },
          camera: {
            eye: { x: 1.5, y: 1.5, z: 0.1 },
          },
        },
      }}
    />
  );
};
