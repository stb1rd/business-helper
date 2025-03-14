import Plot, { PlotParams } from 'react-plotly.js';
import { getPlotData, getProductCoords, PALETTE_SIZE, PLOT_DEFAULT_DATA } from './helpers';
import { useState } from 'react';
import { ProductSchema } from './types';

export const Palette = ({ products }: { products: ProductSchema[] }) => {
  const [visibleBoxesIds, setVisibleBoxesIds] = useState(products.map((x) => x.serialNumber));

  const palettePlotData = {
    ...PLOT_DEFAULT_DATA,
    ...getPlotData([0, 0, 0, PALETTE_SIZE.x, PALETTE_SIZE.y, -PALETTE_SIZE.z]),
    color: 'khaki',
    name: 'Палета',
  } as PlotParams['data'][number];

  const boxesPlotData = products
    .filter((x) => visibleBoxesIds.includes(x.serialNumber))
    .map((productItem) => ({
      ...PLOT_DEFAULT_DATA,
      ...getPlotData(getProductCoords(productItem)),
      name: `${productItem.serialNumber} ${productItem.product.articleId}`,
    })) as PlotParams['data'];

  const handleCheckboxClick = (targetId: string) => {
    let newVisibleBoxesIds = [...visibleBoxesIds];
    if (visibleBoxesIds.includes(targetId)) {
      newVisibleBoxesIds = newVisibleBoxesIds.filter((x) => x !== targetId);
    } else {
      newVisibleBoxesIds.push(targetId);
    }

    setVisibleBoxesIds(newVisibleBoxesIds);
  };

  return (
    <div className="flex gap-3 w-full items-start">
      <div className="sticky top-3">
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
      </div>
      <div className="overflow-x-auto grow">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>размер</th>
              <th>координаты</th>
            </tr>
          </thead>
          <tbody>
            {products.map((productItem) => {
              const coords = getProductCoords(productItem);

              return (
                <tr key={`${productItem.serialNumber}-${productItem.product.articleId}`}>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={visibleBoxesIds.includes(productItem.serialNumber)}
                        onChange={() => handleCheckboxClick(productItem.serialNumber)}
                      />
                    </label>
                  </th>
                  <td>{productItem.serialNumber}</td>
                  <td>{productItem.product.articleId}</td>
                  <td>{coords.slice(-3).join(' x ')}</td>
                  <td>
                    X: {coords[0]}, Y: {coords[1]}, Z: {coords[2]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
