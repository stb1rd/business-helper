export type BoxCoords = [startCoordX: number, startCoordY: number, startCoordY: number, sizeX: number, sizeY: number, sizeZ: number];

export const getPlotData = (boxProps: BoxCoords): { x: number[]; y: number[]; z: number[]; i: number[]; j: number[]; k: number[] } => {
  const faces = {
    i: [] as number[],
    j: [] as number[],
    k: [] as number[],
  };

  const vertices = {
    x: [] as number[],
    y: [] as number[],
    z: [] as number[],
  };

  let nVertices = 0;

  const x = [0, 1, 0, 1, 0, 1, 0, 1];
  const y = [0, 0, 1, 1, 0, 0, 1, 1];
  const z = [0, 0, 0, 0, 1, 1, 1, 1];
  const a = [0, 3, 4, 7, 0, 6, 1, 7, 0, 5, 2, 7];
  const b = [1, 2, 5, 6, 2, 4, 3, 5, 4, 1, 6, 3];
  const c = [3, 0, 7, 4, 6, 0, 7, 1, 5, 0, 7, 2];

  const addBox = (px: number, py: number, pz: number, sx: number, sy: number, sz: number) => {
    let q: number;

    for (q = 0; q < 12; q++) {
      faces.i.push(a[q] + nVertices);
      faces.j.push(b[q] + nVertices);
      faces.k.push(c[q] + nVertices);
    }

    for (q = 0; q < 8; q++) {
      vertices.x.push(px + sx * x[q]);
      vertices.y.push(py + sy * y[q]);
      vertices.z.push(pz + sz * z[q]);
      nVertices++;
    }
  };

  addBox(...boxProps);

  return {
    ...faces,
    ...vertices,
  };
};
