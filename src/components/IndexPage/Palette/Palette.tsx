import Plot, { PlotParams } from 'react-plotly.js';
import { BoxCoords, getPlotData } from './helpers';

const PALETTE_SIZE = {
  x: 800,
  y: 1200,
  z: 144,
};

const PLOT_DEFAULT_DATA = {
  opacity: 0.5,
  type: 'mesh3d',
  color: 'limegreen',
  flatshading: true,
  lighting: { facenormalsepsilon: 0 },
};

export const Palette = () => {
  const palettePlotData = {
    ...PLOT_DEFAULT_DATA,
    ...getPlotData([0, 0, 0, PALETTE_SIZE.x, PALETTE_SIZE.y, -PALETTE_SIZE.z]),
    color: 'khaki',
    name: 'Палета',
  } as PlotParams['data'][number];

  const boxesCoords: BoxCoords[] = [
    [0, 0, 0, PALETTE_SIZE.x, PALETTE_SIZE.x, PALETTE_SIZE.x],
    [0, PALETTE_SIZE.x, 0, 100, 100, 100],
  ];
  const boxesPlotData = boxesCoords.map((x, i) => ({
    ...PLOT_DEFAULT_DATA,
    ...getPlotData(x),
    name: `Коробка #${i + 1}`,
  })) as PlotParams['data'];

  return (
    <Plot
      data={[palettePlotData, ...boxesPlotData]}
      layout={{
        width: 800,
        height: 800,
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
