import { useState } from 'react';

import { ProductSchema, RouteSchema } from '@/components/widgets/PaletteInstructions/types';
import { Chevron } from '@/components/ui/Chevron';
import { PalettePlot } from '@/components/widgets/PaletteInstructions/PalettePlot';
import { getProductCoords } from '@/components/widgets/PaletteInstructions/helpers';

export const PaletteView = ({ products }: { products: ProductSchema[]; route?: RouteSchema }) => {
  const [isOpen, setIsOpen] = useState(true);

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
    <div>
      <div className="flex gap-2 items-center interactive sticky top-10 bg-white z-10 w-full" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-xl">Выкладка на палету</h3>
        <Chevron size="btn-sm" isOpen={isOpen} />
      </div>
      {isOpen && (
        <div className="flex gap-3 w-full items-start">
          <div className="sticky top-20">
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
      )}
    </div>
  );
};
