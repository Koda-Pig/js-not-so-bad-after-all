import { UP, DOWN, LEFT, RIGHT } from "./constants"

export class Input {
  constructor() {
    this.keys = []
    this.gamepadKeyMap = {
      0: "A",
      1: "B",
      2: "X",
      3: "Y",
      4: "LB",
      5: "RB",
      6: "LT",
      7: "RT",
      8: "BACK",
      9: "START",
      10: "LS",
      11: "RS",
      12: UP,
      13: DOWN,
      14: LEFT,
      15: RIGHT,
    }

    this.validActions = [UP, DOWN, LEFT, RIGHT]

    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") this.keyPressed(UP)
      if (e.key === "ArrowDown") this.keyPressed(DOWN)
      if (e.key === "ArrowLeft") this.keyPressed(LEFT)
      if (e.key === "ArrowRight") this.keyPressed(RIGHT)
    })
    window.addEventListener("keyup", (e) => {
      this.keyReleased(e)
    })

    // window.addEventListener("gamepadconnected", (e) =>
    //   this.gamepadHandler({ event: e, action: "connected" })
    // )
    // window.addEventListener("gamepaddisconnected", (e) =>
    //   this.gamepadHandler({ event: e, action: "disconnected" })
    // )
  }

  keyPressed(key) {
    if (this.keys.includes(key)) return
    // unshift instead of push to add to the front of the array
    this.keys.unshift(key)
  }

  keyReleased(key) {
    const index = this.keys.indexOf(key)
    this.keys.splice(index, 1)
  }

  gamepadHandler({ event, action }) {
    const gamepad = navigator.getGamepads()[event.gamepad.index]

    if (action === "disconnected") {
      console.log("gamepad disconnected", gamepad)
      delete this.gamepads[gamepad.index]
      return
    }

    // Connected:
    console.info("gamepad connected", gamepad)
    this.gamepads[gamepad.index] = gamepad
  }

  pollGamepadInput() {
    // according to the spec, it's recommended to poll the gamepad on each animation frame
    const gamepads = navigator.getGamepads()

    if (!gamepads) return

    // just use the first game pad, as this is a single player game (can be up to 4)
    const gamepad = gamepads[0]

    if (!gamepad) return

    // This needs to be improved, as currently you can only have one
    // button pressed at a time.
    gamepad.buttons.forEach((button, index) => {
      // if value is 1, the button is pressed
      const action = this.gamepadKeyMap[index]
      if (!this.validActions.includes(action)) return

      if (button.value === 1) {
        this.keyPressed(action)
      }
    })
  }

  // Get binds an objects property to a function that will be called
  // when that property is looked up.
  get lastKey() {
    return this.keys[0]
  }
}
