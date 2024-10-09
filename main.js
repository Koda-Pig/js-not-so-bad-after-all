import "./style.scss"

// functions
const handleGamePadConnected = e => {
  console.log("a game pad was conected")
  console.log("gamepad: ", e.gamepad)
}

// event listeners
window.addEventListener("gamepadconnected", e => handleGamePadConnected(e))
