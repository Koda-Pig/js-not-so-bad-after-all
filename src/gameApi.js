import { GAME_WIDTH, GAME_HEIGHT } from "./constants"
import { displayNotification } from "./utils"
import { World } from "./world"
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
  game.render(ctx)
}
requestAnimationFrame(animate)

const game = new Game()

// event listeners
window.addEventListener("gamepadconnected", (e) => {
  displayNotification({
    HTML: gamePadNotification({ gamepad: e.gamepad, action: "connected" }),
  })
})
window.addEventListener("gamepaddisconnected", (e) => {
  displayNotification({
    HTML: gamePadNotification({ gamepad: e.gamepad, action: "disconnected" }),
  })
})

const gamePadNotification = ({ gamepad, action }) =>
  `<h2 class="text-2xl mb-3">Gamepad ${action}</h2>
  <p class="mb-3"><strong>gamepad id:</strong> ${gamepad.id}</p>
  `
