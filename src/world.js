import { ROWS, COLS, TILE_SIZE } from "./constants"

export class World {
  constructor() {
    this.level1 = {
      waterLayer: [],
      groundLayer: [],
      backgroundLayer: document.getElementById("backgroundLayer1"),
    }
  }

  drawBackground(ctx) {
    ctx.drawImage(this.level1.backgroundLayer, 0, 0)
  }

  drawGrid(ctx) {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        ctx.strokeRect(
          col * TILE_SIZE, // column
          row * TILE_SIZE, // row
          TILE_SIZE,
          TILE_SIZE
        )
      }
    }
  }
}
