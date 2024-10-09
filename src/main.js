import "./style.scss"
import { World } from "./world"
import { GAME_WIDTH, GAME_HEIGHT } from "./constants"
import { Hero } from "./hero"
import { Input } from "./input"

// nodes
const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")

// Setup canvas
canvas.width = GAME_WIDTH
canvas.height = GAME_HEIGHT

class Game {
  constructor() {
    this.world = new World()
    this.hero = new Hero({
      game: this,
      position: { x: 5, y: 5 },
    })
    this.input = new Input()
  }

  render(ctx) {
    this.input.pollGamepadInput()
    this.hero.update()
    this.world.drawBackground(ctx)
    this.world.drawGrid(ctx)
    this.hero.draw(ctx)
  }
}

function animate() {
  requestAnimationFrame(animate)
  // ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
  game.render(ctx)
}
requestAnimationFrame(animate)

const game = new Game()

// event listeners
// window.addEventListener("gamepadconnected", (e) =>
//   gamepadHandler({
//     event: e,
//     action: "connected",
//   })
// )
// window.addEventListener("gamepaddisconnected", (e) =>
//   gamepadHandler({
//     event: e,
//     action: "disconnected",
//   })
// )
