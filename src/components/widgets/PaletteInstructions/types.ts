type ProductBaseSchema = {
  articleId: string;
  widthMm: number;
  lengthMm: number;
  heightMm: number;
  weightKg: number;
  maxLoadKg: number;
};

export type ProductSchema = {
  x: number;
  y: number;
  z: number;
  serialNumber: string;
  product: ProductBaseSchema;
};

export type PaletteSchema = {
  palletId: string;
  products: ProductSchema[][];
};

type RouteProductItem = {
  articleId: string;
  quantity: number;
};

export type RoutePoint = {
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

export type WarehouseSchema = {
  xSizes: number[];
  ySizes: number[];
  zones: string[][];
};

export type CatalogSchema = Record<string, { zoneId: string; quantity: number }>;
export type ProductsSchema = Record<string, ProductBaseSchema>;
