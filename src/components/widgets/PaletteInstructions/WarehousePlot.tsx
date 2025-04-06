import Plot, { PlotParams } from 'react-plotly.js';

import { PLOT_DEFAULT_DATA, getPlotData, BoxCoords } from '@/components/widgets/PaletteInstructions/helpers';

import { useQuery } from '@tanstack/react-query';
import { WarehouseSchema } from '@/components/widgets/PaletteInstructions/types';

import * as DEFAULT_WAREHOUSE from '../../mocks/warehouse.json';

type RackSchema = {
  title: string;
  x: number;
  y: number;
  z: number;
  sizeX: number;
  sizeY: number;
  sizeZ: number;
};

const getRackCoords = (rack: RackSchema): BoxCoords => [rack.x, rack.y, rack.z, rack.sizeX, rack.sizeY, rack.sizeZ];

const getLabels = (apiSizes: number[]) => {
  const min = Math.min(...apiSizes);
  const max = Math.max(...apiSizes);
  const labelsWithAppendix = apiSizes.slice(0, -1);
  labelsWithAppendix.push(...(apiSizes.at(-1) === min ? [max, min] : [max, max]));
  // @ts-expect-error replaceAll is ok
  const labels: number[] = labelsWithAppendix.join(',').replaceAll(`${min},${max}`, `${max},${max}`).split(',').map(Number);
  const result: [number, string][] = labels.map((label, i) => [
    apiSizes.slice(0, i + 1).reduce((acc, curr) => acc + curr, 0),
    String(label),
  ]);

  return new Map(result);
};

export const WarehousePlot = ({ activeZonesIds, isDetailed = true }: { activeZonesIds?: string[]; isDetailed?: boolean }) => {
  const { data: warehouse } = useQuery({
    queryKey: ['warehouse'],
    initialData: DEFAULT_WAREHOUSE as WarehouseSchema,
    enabled: false,
    queryFn: () => DEFAULT_WAREHOUSE as WarehouseSchema,
  });

  const warehouseSizeX = warehouse.xSizes.reduce((acc, curr) => acc + curr, 0);
  const warehouseSizeY = warehouse.ySizes.reduce((acc, curr) => acc + curr, 0);
  const whXTicks = getLabels(warehouse.xSizes);
  const whYTicks = getLabels(warehouse.ySizes);

  const RACKS_PLOT_DATA: RackSchema[] = [];
  warehouse.zones.forEach((zonesRow, i) => {
    zonesRow.forEach((zoneItem, j) => {
      if (zoneItem) {
        const x = warehouse.xSizes.slice(0, j).reduce((acc, curr) => acc + curr, 0);
        const y = warehouse.ySizes.slice(i + 1).reduce((acc, curr) => acc + curr, 0);
        RACKS_PLOT_DATA.push({ x, y, title: zoneItem, z: 0, sizeX: 120, sizeY: 80, sizeZ: 1 });
      }
    });
  });

  const racksPlotData = RACKS_PLOT_DATA.map((rackItem) => ({
    ...PLOT_DEFAULT_DATA,
    ...getPlotData(getRackCoords(rackItem)),
    text: rackItem.title,
    color: activeZonesIds?.includes(rackItem.title) ? 'limegreen' : 'slateblue',
  })) as PlotParams['data'];

  const sizeProps = isDetailed ? 'w-full lg:w-[500px] h-[500px]' : 'w-1/2 lg:w-[360px] h-[360px]';

  return (
    <Plot
      className={`border border-[#d7d7d7] rounded-sm overflow-hidden ${sizeProps}`}
      data={racksPlotData}
      layout={{
        autosize: true,
        margin: { l: 0, r: 0, b: 0, t: 0 },
        scene: {
          aspectratio: { x: 0.4, y: 0.5, z: 0.02 },
          xaxis: {
            range: [0, warehouseSizeX],
            tickvals: Array.from(whXTicks).map((tick) => tick[0]),
            ticktext: Array.from(whXTicks).map((tick) => tick[1]),
            visible: isDetailed,
            title: { text: 'ширина (см)' },
          },
          yaxis: {
            range: [0, warehouseSizeY],
            tickvals: Array.from(whYTicks).map((tick) => tick[0]),
            ticktext: Array.from(whYTicks).map((tick) => tick[1]),
            visible: isDetailed,
            title: { text: 'длина (см)' },
          },
          zaxis: {
            range: [0, 500],
            nticks: 1,
            visible: isDetailed,
            title: { text: '' },
          },
          camera: {
            eye: { x: 0, y: -0.05, z: isDetailed ? 0.85 : 0.55 },
            center: { x: 0, y: 0, z: 0 },
          },
        },
      }}
    />
  );
};
