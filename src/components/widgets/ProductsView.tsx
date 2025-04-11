import { ReactNode, useState } from 'react';

import { EyeIcon } from '@/components/ui/icons/EyeIcon';
import { EyeSlashIcon } from '@/components/ui/icons/EyeSlashIcon';
import { getColor } from '@/components/utils/getColor';
import { getProductCoords } from '@/components/widgets/PaletteInstructions/helpers';
import { PalettePlot } from '@/components/widgets/PaletteInstructions/PalettePlot';
import { ProductSchema } from '@/components/widgets/PaletteInstructions/types';

export const ProductsView = ({
  products,
  prevProducts,
  isDetailed = true,
  children,
  productRackMap,
  completedSerialIds,
  toggleCompletedSerialId,
  isSvg,
}: {
  products: ProductSchema[];
  prevProducts?: ProductSchema[];
  isDetailed?: boolean;
  children?: ReactNode;
  productRackMap?: Map<string, string>;
  completedSerialIds: Set<string>;
  toggleCompletedSerialId: (targetSerialId: string) => void;
  isSvg?: boolean;
}) => {
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
    <div className="flex gap-3 w-full items-start flex-wrap">
      <div className="xl:sticky top-25 flex gap-3 w-full xl:w-auto">
        {children}
        <PalettePlot
          products={visibleProducts}
          prevProducts={prevProducts}
          isDetailed={isDetailed}
          completedSerialIds={completedSerialIds}
          has2dMode={isSvg}
        />
      </div>
      <div className="grow">
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
              {isDetailed && <th className="align-bottom text-right">размер</th>}
              <th className="align-bottom text-right">вес</th>
              <th className="align-bottom">
                <div className="tooltip tooltip-bottom flex justify-end">
                  <div className="tooltip-content">
                    <div className="whitespace-pre">{`Лимит\nвеса\nсверху`}</div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                    />
                  </svg>
                  MAX
                </div>
              </th>
              {Boolean(productRackMap) && <th>склад</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((productItem) => {
              const coords = getProductCoords(productItem);

              return (
                <tr
                  key={`${productItem.serialNumber}-${productItem.product.articleId}`}
                  style={
                    completedSerialIds.has(productItem.serialNumber)
                      ? {
                          background: 'LightGrey',
                        }
                      : {}
                  }
                >
                  <th>
                    <button className="btn btn-xs btn-circle btn-ghost" onClick={() => toggleVisibility(productItem.serialNumber)}>
                      {visibleBoxesIds.includes(productItem.serialNumber) && <EyeIcon className="size-4" />}
                      {!visibleBoxesIds.includes(productItem.serialNumber) && <EyeSlashIcon className="size-4" />}
                    </button>
                  </th>
                  <td
                    className="text-center"
                    style={{
                      textShadow: 'white 0px 0px 5px',
                      background: completedSerialIds.has(productItem.serialNumber)
                        ? 'LightGrey'
                        : getColor(Number(productItem.serialNumber)),
                    }}
                  >
                    {productItem.serialNumber}
                  </td>
                  <td className="text-center">{productItem.product.articleId}</td>
                  {isDetailed && <td className="text-right">{coords.slice(-3).join(' x ')}</td>}
                  <td className="text-right">{productItem.product.weightKg}</td>
                  <td className="text-right">{productItem.product.maxLoadKg}</td>
                  {Boolean(productRackMap) && <td className="text-center">{productRackMap!.get(productItem.product.articleId)}</td>}
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={completedSerialIds.has(productItem.serialNumber)}
                      onChange={() => toggleCompletedSerialId(productItem.serialNumber)}
                    />
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
