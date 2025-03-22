import Plot, { PlotParams } from 'react-plotly.js';

import { PLOT_DEFAULT_DATA, getPlotData, BoxCoords } from '@/components/widgets/Palette/helpers';

const warehouseSize = {
  x: 360 * 4 + 120 * 7,
  y: 360 * 4 + 80 * 17,
  z: 500,
};

const whXTicks = new Map([
  [360, '360'],
  [360 + 120, '120'],
  [360 + 120 * 2, '360'],
  [360 * 2 + 120 * 2, '360'],
  [360 * 2 + 120 * 3, '120'],
  [360 * 2 + 120 * 4, '360'],
  [360 * 3 + 120 * 4, '360'],
  [360 * 3 + 120 * 5, '120'],
  [360 * 3 + 120 * 6, '360'],
  [360 * 3 + 120 * 6, '360'],
  [360 * 4 + 120 * 6, '360'],
  [360 * 4 + 120 * 7, '120'],
]);

const whYTicks = new Map([
  [360, '360'],
  [360 + 80, '80'],
  [360 + 80 * 2, '80'],
  [360 + 80 * 3, '80'],
  [360 + 80 * 4, '80'],
  [360 + 80 * 5, '80'],
  [360 + 80 * 6, '360'],
  [360 * 2 + 80 * 6, '360'],
  [360 * 2 + 80 * 7, '80'],
  [360 * 2 + 80 * 8, '80'],
  [360 * 2 + 80 * 9, '80'],
  [360 * 2 + 80 * 10, '80'],
  [360 * 2 + 80 * 11, '80'],
  [360 * 2 + 80 * 12, '360'],
  [360 * 3 + 80 * 12, '360'],
  [360 * 3 + 80 * 13, '80'],
  [360 * 3 + 80 * 14, '80'],
  [360 * 3 + 80 * 15, '80'],
  [360 * 3 + 80 * 16, '80'],
  [360 * 3 + 80 * 17, '80'],
  [360 * 3 + 80 * 18, '360'],
]);

type RackSchema = {
  title: string;
  x: number;
  y: number;
  z: number;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
};

const RACKS_PLOT_DATA_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const RACKS_PLOT_DATA: RackSchema[] = [];

RACKS_PLOT_DATA_LETTERS.forEach((rackSetLetter, i) => {
  const rackCount = rackSetLetter === 'G' ? 12 : 18;
  for (let j = 0; j < rackCount; j++) {
    const x = 360 + i * 120 + Math.floor(i / 2) * 360;
    const yReversed = 360 + j * 80 + Math.floor(j / 6) * 360;
    const y = warehouseSize.y - yReversed;
    const title = j < 9 ? `${rackSetLetter}0${j + 1}` : `${rackSetLetter}${j + 1}`;

    RACKS_PLOT_DATA.push({ x, y, title, z: 0, sizeX: 120, sizeY: 80, sizeZ: 1 });
  }
});

const getRackCoords = (rack: RackSchema): BoxCoords => [rack.x, rack.y, rack.z, rack.sizeX, rack.sizeY, rack.sizeZ];

export const WarehousePlot = ({ activeZonesIds }: { activeZonesIds?: string[] }) => {
  const racksPlotData = RACKS_PLOT_DATA.map((rackItem) => ({
    ...PLOT_DEFAULT_DATA,
    ...getPlotData(getRackCoords(rackItem)),
    name: rackItem.title,
    color: activeZonesIds?.includes(rackItem.title) ? 'limegreen' : 'slateblue',
  })) as PlotParams['data'];

  return (
    <div className="flex flex-col gap-2">
      <Plot
        className="border border-[#d7d7d7] rounded-sm w-full h-[600px] box-content shrink-0 overflow-hidden"
        data={racksPlotData}
        layout={{
          autosize: true,
          margin: { l: 0, r: 0, b: 0, t: 0 },
          scene: {
            aspectratio: { x: 0.4, y: 0.5, z: 0.02 },
            xaxis: {
              range: [0, warehouseSize.x],
              tickvals: Array.from(whXTicks).map((tick) => tick[0]),
              ticktext: Array.from(whXTicks).map((tick) => tick[1]),
            },
            yaxis: {
              range: [0, warehouseSize.y],
              tickvals: Array.from(whYTicks).map((tick) => tick[0]),
              ticktext: Array.from(whYTicks).map((tick) => tick[1]),
            },
            zaxis: {
              range: [0, warehouseSize.z],
              nticks: 1,
            },
            camera: {
              eye: { x: 0, y: -0.05, z: 0.85 },
              center: { x: 0, y: 0, z: 0 },
            },
          },
        }}
      />
    </div>
  );
};
