export type ProductSchema = {
  x: number;
  y: number;
  z: number;
  serialNumber: string;
  product: {
    articleId: string;
    widthMm: number;
    lengthMm: number;
    heightMm: number;
  };
};

export type PaletteSchema = {
  palletId: string;
  products: ProductSchema[][];
};

export type OrderSchema = {
  pallets: PaletteSchema[];
};
