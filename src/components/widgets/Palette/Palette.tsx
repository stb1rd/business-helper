import { getProductCoords } from './helpers';
import { useState } from 'react';
import { ProductSchema } from './types';
import { PalettePlot } from '@/components/widgets/Palette/PalettePlot';
import { WarehousePlot } from '@/components/widgets/Palette/WarehousePlot';

export const Palette = ({ products }: { products: ProductSchema[] }) => {
  const [visibleBoxesIds, setVisibleBoxesIds] = useState(products.map((x) => x.serialNumber));
  const visibleProducts = products.filter((x) => visibleBoxesIds.includes(x.serialNumber));

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
    <div className="flex flex-col w-full gap-2">
      <h3 className="text-xl">Полная схема</h3>
      <WarehousePlot />
      <div className="flex gap-3 w-full items-start">
        <div className="sticky top-3">
          <PalettePlot products={visibleProducts} />
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
    </div>
  );
};
