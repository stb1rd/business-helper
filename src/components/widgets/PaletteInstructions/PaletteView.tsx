import { useState } from 'react';

import { ProductSchema, RouteSchema } from '@/components/widgets/PaletteInstructions/types';
import { Chevron } from '@/components/ui/Chevron';
import { PalettePlot } from '@/components/widgets/PaletteInstructions/PalettePlot';
import { getProductCoords } from '@/components/widgets/PaletteInstructions/helpers';
import { getColor } from '@/components/utils/getColor';
import { EyeIcon } from '@/components/ui/icons/EyeIcon';
import { EyeSlashIcon } from '@/components/ui/icons/EyeSlashIcon';

export const PaletteView = ({ products }: { products: ProductSchema[]; route?: RouteSchema }) => {
  const [isOpen, setIsOpen] = useState(true);

  const [visibleBoxesIds, setVisibleBoxesIds] = useState(products.map((x) => x.serialNumber));
  const visibleProducts = products.filter((x) => visibleBoxesIds.includes(x.serialNumber));

  const toggleVisibility = (targetId: string) => {
    let newVisibleBoxesIds = [...visibleBoxesIds];
    if (visibleBoxesIds.includes(targetId)) {
      newVisibleBoxesIds = newVisibleBoxesIds.filter((x) => x !== targetId);
    } else {
      newVisibleBoxesIds.push(targetId);
    }

    setVisibleBoxesIds(newVisibleBoxesIds);
  };

  const toggleAllVisible = () => {
    if (visibleBoxesIds.length === 0) {
      setVisibleBoxesIds(products.map((x) => x.serialNumber));
    } else {
      setVisibleBoxesIds([]);
    }
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
                  <th className="align-bottom">
                    <button className="btn btn-xs btn-circle btn-ghost" onClick={() => toggleAllVisible()}>
                      {visibleBoxesIds.length !== 0 && <EyeIcon className="size-4" />}
                      {visibleBoxesIds.length === 0 && <EyeSlashIcon className="size-4" />}
                    </button>
                  </th>
                  <th></th>
                  <th className="align-bottom text-center">артикул</th>
                  <th className="align-bottom text-right">размер</th>
                  <th className="align-bottom text-right">вес</th>
                  <th className="align-bottom text-right whitespace-pre">{'лимит\nвеса\nсверху'}</th>
                  <th className="align-bottom text-right">координаты</th>
                </tr>
              </thead>
              <tbody>
                {products.map((productItem) => {
                  const coords = getProductCoords(productItem);

                  return (
                    <tr key={`${productItem.serialNumber}-${productItem.product.articleId}`}>
                      <th>
                        {/* <label>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={visibleBoxesIds.includes(productItem.serialNumber)}
                            onChange={() => handleCheckboxClick(productItem.serialNumber)}
                          />
                        </label> */}
                        <button className="btn btn-xs btn-circle btn-ghost" onClick={() => toggleVisibility(productItem.serialNumber)}>
                          {visibleBoxesIds.includes(productItem.serialNumber) && <EyeIcon className="size-4" />}
                          {!visibleBoxesIds.includes(productItem.serialNumber) && <EyeSlashIcon className="size-4" />}
                        </button>
                      </th>
                      <td style={{ textShadow: 'white 0px 0px 5px', background: getColor(Number(productItem.serialNumber)) }}>
                        {productItem.serialNumber}
                      </td>
                      <td className="text-center">{productItem.product.articleId}</td>
                      <td className="text-right">{coords.slice(-3).join(' x ')}</td>
                      <td className="text-right">{productItem.product.weightKg}</td>
                      <td className="text-right">{productItem.product.maxLoadKg}</td>
                      <td className="text-right">
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
