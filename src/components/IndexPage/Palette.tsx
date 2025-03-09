import Plot from 'react-plotly.js';

const PALETTE_SIZE = {
  x: 800,
  y: 1200,
  z: 144,
};

const faces = {
  a: [] as number[],
  b: [] as number[],
  c: [] as number[],
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
    faces.a.push(a[q] + nVertices);
    faces.b.push(b[q] + nVertices);
    faces.c.push(c[q] + nVertices);
  }

  for (q = 0; q < 8; q++) {
    vertices.x.push(px + sx * x[q]);
    vertices.y.push(py + sy * y[q]);
    vertices.z.push(pz + sz * z[q]);
    nVertices++;
  }
};

const createBoxes = (ni: number, nj: number) => {
  for (let i = 0; i < ni; i++) {
    for (let j = 0; j < nj; j++) {
      addBox(i, j, 0, 1, 1, 1.2 + Math.cos((i / ni) * Math.PI) * Math.cos((j / nj) * Math.PI));
    }
  }
};

// createBoxes(2, 3);
// addBox(0, 0, 0, 1, 2, 3);
addBox(0, 0, 0, 800, 1200, -144);
addBox(0, 0, 0, 800, 800, 800);
// addBox(0, 100, 0, 100, 100, 144);

export const Palette = () => {
  return (
    <Plot
      data={[
        {
          opacity: 0.5,
          type: 'mesh3d',
          color: 'khaki',
          flatshading: true,
          lighting: {
            facenormalsepsilon: 0,
          },
          x: vertices.x,
          y: vertices.y,
          z: vertices.z,
          i: faces.a,
          j: faces.b,
          k: faces.c,
        },
      ]}
      layout={{
        width: 800,
        height: 800,
        scene: {
          aspectratio: { x: 0.4, y: 0.64, z: 1.2 },
          xaxis: {
            nticks: 8,
            range: [0, 800],
            title: { text: 'длина (мм)' },
          },
          yaxis: {
            nticks: 12,
            range: [0, 1200],
            title: { text: 'ширина (мм)' },
          },
          zaxis: {
            nticks: 10,
            range: [-144, 2000],
            title: { text: 'высота (мм)' },
          },
          camera: {
            eye: { x: 1.5, y: 1.5, z: 0.1 },
          },
        },
      }}
    />
  );
};
