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
    weightKg: number;
    maxLoadKg: number;
  };
};

export type PaletteSchema = {
  palletId: string;
  products: ProductSchema[][];
};

type RouteProductItem = {
  articleId: string;
  quantity: number;
};

type RoutePoint = {
  zone: {
    zoneId: string;
    x: number;
    y: number;
  };
  pathMeters: number;
  items: RouteProductItem[];
};

export type RouteSchema = {
  operatorId: string;
  points: RoutePoint[];
};

export type OrderSchema = {
  pallets: PaletteSchema[];
  routes: RouteSchema[];
};
