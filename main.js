import "./style.scss"

// constants
const NOTICE_DURATION = 3000
const gamepads = {}

// nodes
const btn = document.getElementById("test-btn")
const statusBar = document.getElementById("status-bar")
const expandableContainer = document.getElementById("expandable-container")
const containerP = expandableContainer.querySelector("p")

// functions
const gamePadHandler = ({ event, action }) => {
  const gamepad = event.gamepad
  displayNotification({ textContent: `Game pad ${action} ` })

  if (action === "disconnected") {
    delete gamepads[gamepad.index]
    return
  }

  if (action === "connected") {
    gamepads[gamepad.index] = gamepad

    const { axes, buttons, connected, id, mapping } = gamepad

    const markup = `
      <ul>
        <li>Connected: ${connected}</li>
        <li>ID: ${id}</li>
        <li>Mapping: ${mapping}</li>
        <li>Axes: ${axes.length}</li>
        <li>Buttons: ${buttons.length}</li>
      </ul>
    `

    showExpandableContainer({ HTML: markup })
  }
}

const displayNotification = ({ textContent }) => {
  statusBar.innerHTML = textContent
  statusBar.classList.add("transform-none")
  setTimeout(() => {
    statusBar.classList.remove("transform-none")
  }, NOTICE_DURATION)
}

const showExpandableContainer = ({ HTML }) => {
  expandableContainer.classList.replace("grid-rows-[0fr]", "grid-rows-[1fr]")
  containerP.innerHTML = HTML
}

// event listeners
window.addEventListener("gamepadconnected", (e) =>
  gamePadHandler({ event: e, action: "connected" })
)
window.addEventListener("gamepaddisconnected", (e) =>
  gamePadHandler({ event: e, action: "disconnected" })
)
