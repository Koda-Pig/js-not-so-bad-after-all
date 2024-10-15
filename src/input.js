import { UP, DOWN, LEFT, RIGHT } from "./constants"

export class Input {
  constructor() {
    this.keyboardKeys = []
    this.gamepadKeys = []
    this.keyboardKeyMap = {
      ArrowUp: UP,
      ArrowDown: DOWN,
      ArrowLeft: LEFT,
      ArrowRight: RIGHT,
    }
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
      const action = this.keyboardKeyMap[e.key]
      if (!action) return
      this.keyPressed(action, "keyboard")
    })

    window.addEventListener("keyup", (e) => {
      const action = this.keyboardKeyMap[e.key]
      if (!action) return
      this.keyReleased(action, "keyboard")
    })
  }

  keyPressed(action, inputType) {
    let keysArray = inputType === "keyboard" ? this.keyboardKeys : this.gamepadKeys
    if (keysArray.includes(action)) return
    // unshift instead of push to add to the front of the array
    keysArray.unshift(action)
  }

  keyReleased(action, inputType) {
    let keysArray = inputType === "keyboard" ? this.keyboardKeys : this.gamepadKeys
    keysArray = keysArray.filter((key) => key !== action)

    if (inputType === "keyboard") {
      this.keyboardKeys = keysArray
    } else {
      this.gamepadKeys = keysArray
    }
  }

  pollGamepadInput() {
    // according to the spec, it's recommended to poll the gamepad on each animation frame
    const gamepads = navigator.getGamepads()

    if (!gamepads) return

    // just use the first game pad, as this is a single player game (can be up to 4)
    const gamepad = gamepads[0]

    if (!gamepad) return

    gamepad.buttons.forEach((button, index) => {
      const action = this.gamepadKeyMap[index]
      if (!this.validActions.includes(action)) return

      // if value is 1, the button is pressed
      if (button.value === 1) this.keyPressed(action, "gamepad")
      // if value is 0, the button is released
      if (button.value === 0) this.keyReleased(action, "gamepad")
    })
  }

  get activeKeys() {
    return [...new Set([...this.keyboardKeys, ...this.gamepadKeys])]
  }

  // Get binds an objects property to a function that will be called
  // when that property is looked up.
  // eg: game.input.lastKey will return the last key pressed
  // if it was a regular method, it would be game.input.lastKey()
  get lastKey() {
    return this.activeKeys[0]
  }
}
