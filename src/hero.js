import { GameObject } from "./gameObject"
import { UP, DOWN, LEFT, RIGHT } from "./constants"

export class Hero extends GameObject {
  constructor({ game, sprite, position, scale }) {
    super({ game, sprite, position, scale })
  }
  update() {
    switch (this.game.input.lastKey) {
      case UP:
        this.position.y--
        break
      case DOWN:
        this.position.y++
        break
      case LEFT:
        this.position.x--
        break
      case RIGHT:
        this.position.x++
        break
      default:
        break
    }
  }
}
