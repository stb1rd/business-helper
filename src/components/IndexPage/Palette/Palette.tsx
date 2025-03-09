import Plot, { PlotParams } from 'react-plotly.js';
import { BoxItem, getPlotData } from './helpers';
import { useState } from 'react';

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

const MOCKED_BOXES_COORDS: BoxItem[] = [
  { id: 1, coords: [0, 0, 0, PALETTE_SIZE.x, PALETTE_SIZE.x, PALETTE_SIZE.x] },
  { id: 2, coords: [0, PALETTE_SIZE.x, 0, 400, 400, 400] },
  { id: 3, coords: [400, PALETTE_SIZE.x, 0, 200, 200, 200] },
];

export const Palette = () => {
  const [visibleBoxesIds, setVisibleBoxesIds] = useState(MOCKED_BOXES_COORDS.map((x) => x.id));

  const palettePlotData = {
    ...PLOT_DEFAULT_DATA,
    ...getPlotData([0, 0, 0, PALETTE_SIZE.x, PALETTE_SIZE.y, -PALETTE_SIZE.z]),
    color: 'khaki',
    name: 'Палета',
  } as PlotParams['data'][number];

  const boxesPlotData = MOCKED_BOXES_COORDS.filter((x) => visibleBoxesIds.includes(x.id)).map((x) => ({
    ...PLOT_DEFAULT_DATA,
    ...getPlotData(x.coords),
    name: `Коробка #${x.id}`,
  })) as PlotParams['data'];

  const handleCheckboxClick = (targetId: number) => {
    let newVisibleBoxesIds = [...visibleBoxesIds];
    if (visibleBoxesIds.includes(targetId)) {
      newVisibleBoxesIds = newVisibleBoxesIds.filter((x) => x !== targetId);
    } else {
      newVisibleBoxesIds.push(targetId);
    }

    setVisibleBoxesIds(newVisibleBoxesIds);
  };

  return (
    <div className="flex gap-3">
      <Plot
        className="border border-indigo-600 w-[500px] h-[500px] box-content"
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
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>размер</th>
              <th>координаты</th>
            </tr>
          </thead>
          <tbody>
            {MOCKED_BOXES_COORDS.map((boxItem) => (
              <tr key={boxItem.id}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={visibleBoxesIds.includes(boxItem.id)}
                      onChange={() => handleCheckboxClick(boxItem.id)}
                    />
                  </label>
                </th>
                <td>{boxItem.id}</td>
                <td>{boxItem.coords.slice(-3).join(' x ')}</td>
                <td>
                  X: {boxItem.coords[0]}, Y: {boxItem.coords[1]}, Z: {boxItem.coords[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
