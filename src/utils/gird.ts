export type GridElement = {
  u: number;
  v: number;
};

type GenerateGridProps = {
  count: number;
  padding?: number;
};

export function generateGrid({ count, padding = 0 }: GenerateGridProps): GridElement[] {
  const start = 0 + padding / 2;
  const end = 1.0 - padding / 2;

  const gap = Math.abs(end - start) / (count - 1);

  const grid: GridElement[] = [];

  for (let r = 0; r < count; r += 1) {
    for (let c = 0; c < count; c += 1) {
      grid.push({
        u: start + r * gap,
        v: start + c * gap
      });
    }
  }

  return grid;
}
