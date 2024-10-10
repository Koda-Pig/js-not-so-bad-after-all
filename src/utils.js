import { NOTICE_DURATION } from "./constants"

const statusBar = document.getElementById("status-bar")

export const displayNotification = ({ HTML }) => {
  statusBar.innerHTML = HTML
  statusBar.classList.replace("-translate-y-full", "transform-none")
  setTimeout(() => {
    statusBar.classList.replace("transform-none", "-translate-y-full")
  }, NOTICE_DURATION)
}
