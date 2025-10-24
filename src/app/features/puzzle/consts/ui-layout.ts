export const TILE_HEIGHT = {
  NUMBER: 25,
  PX: '25px',
};

export function getBoardWidthPx(): number {
  return Math.min(window.innerWidth - 15, 800);
}

export const BOARD_WIDTH = {
  NUMBER: 800,
  PX: '800px',
};
