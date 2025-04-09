import { useState } from 'react';

import { Chevron } from '@/components/ui/Chevron';
import { FileUpload } from '@/components/widgets/PaletteInstructions/FileUpload';
import { CatalogSchema, ProductSchema } from '@/components/widgets/PaletteInstructions/types';

export const ManageProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<ProductSchema | null>(null);
  const [catalog, setCatalog] = useState<CatalogSchema | null>(null);

  return (
    <>
      <div className="paper">
        <div className="flex gap-2 justify-between items-center interactive" onClick={() => setIsOpen(!isOpen)}>
          <h2 className="text-2xl">Обновить товары</h2>
          <Chevron isOpen={isOpen} />
        </div>
        {isOpen && (
          <>
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col gap-2">
                <FileUpload label="Обновить артикулы и свойства" api="warehouse/products" onSuccess={(data) => setProducts(data)} />
                <div className="stats shadow w-xs">
                  {products && (
                    <div className="stat text-center">
                      <div className="stat-title">Загружено артикулов</div>
                      <div className="stat-value text-success">{Object.keys(products).length}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <FileUpload label="Обновить зоны и количество" api="warehouse/catalog" onSuccess={(data) => setCatalog(data)} />
                <div className="stats shadow w-xs">
                  {catalog && (
                    <div className="stat text-center">
                      <div className="stat-title">Загружено артикулов</div>
                      <div className="stat-value text-success">{Object.keys(catalog).length}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
