import Plot, { PlotParams } from 'react-plotly.js';
import { getPlotData, getProductCoords, PALETTE_SIZE, PLOT_DEFAULT_DATA } from './helpers';
import { useState } from 'react';
import { ProductSchema } from './types';

export const Palette = ({ products }: { products: ProductSchema[] }) => {
  console.log('products', products);
  const [visibleBoxesIds, setVisibleBoxesIds] = useState(products.map((x) => x.product.articleId));

  const palettePlotData = {
    ...PLOT_DEFAULT_DATA,
    ...getPlotData([0, 0, 0, PALETTE_SIZE.x, PALETTE_SIZE.y, -PALETTE_SIZE.z]),
    color: 'khaki',
    name: 'Палета',
  } as PlotParams['data'][number];

  const boxesPlotData = products
    .filter((x) => visibleBoxesIds.includes(x.product.articleId))
    .map((productItem) => ({
      ...PLOT_DEFAULT_DATA,
      ...getPlotData(getProductCoords(productItem)),
      name: productItem.product.articleId,
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
            {products.map((productItem) => {
              const coords = getProductCoords(productItem);

              return (
                <tr key={productItem.product.articleId}>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={visibleBoxesIds.includes(productItem.product.articleId)}
                        onChange={() => handleCheckboxClick(productItem.product.articleId)}
                      />
                    </label>
                  </th>
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
