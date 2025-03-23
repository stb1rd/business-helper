import { useState } from 'react';

import { ProductSchema, RouteSchema } from '@/components/widgets/PaletteInstructions/types';
import { Chevron } from '@/components/ui/Chevron';
import { WarehousePlot } from '@/components/widgets/PaletteInstructions/WarehousePlot';
import { cleanZoneId } from '@/components/utils/cleanZoneId';

export const InstructionsView = ({ route }: { products: ProductSchema[]; route?: RouteSchema }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center interactive sticky top-10 bg-white z-10 w-full" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-xl">Шаги сборки</h3>
        <Chevron size="btn-sm" isOpen={isOpen} />
      </div>
      {isOpen &&
        route?.points.map((routePoint) => (
          <div key={routePoint.zone.zoneId}>
            <h4 className="text-l">Точка {routePoint.zone.zoneId}</h4>
            <div className="flex gap-3">
              <WarehousePlot activeZonesIds={[cleanZoneId(routePoint.zone.zoneId)]} />
              <div className="overflow-x-auto grow">
                <table className="table">
                  <thead>
                    <tr>
                      <th>артикул</th>
                      <th>кол-во</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routePoint.items.map((boxItem) => (
                      <tr key={boxItem.articleId}>
                        <td>{boxItem.articleId}</td>
                        <td>{boxItem.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
