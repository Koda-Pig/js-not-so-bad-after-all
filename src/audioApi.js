const canvas = document.getElementById("audio-canvas")
const ctx = canvas.getContext("2d")

canvas.width = 500
canvas.height = 500

class Bar {
  constructor({ x, y, width, height, color, index }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    this.index = index
  }
  update({ micInput }) {
    this.height = micInput * 1000
  }
  draw({ context, volume }) {
    context.fillStyle = this.color
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Microphone {
  // fftSize: Fast Fourier Transform size
  // property of the AnalyserNode interface
  // the AnalyserNode interface represents a node able to provide
  // real time frequency and time-domain analysis information.
  // this is the good shit.

  // We're gonna use this to slice raw stream data (from the mic in our example)
  // into a specific amount of audio samples

  constructor({ fftSize }) {
    // need to wait for microphone to be initialized
    this.initialized = false
    this.setUp(fftSize)
  }

  setUp(fftSize) {
    // Get user media from the mediadevices object
    // we tell it that we want the incoming audio data
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      // it's a promise so we wait...
      .then((stream) => {
        // now we have the stream of audio data from mic
        // next we bring the Web Audio API with all its wonderful
        // built in properties and methods.
        this.audioContext = new AudioContext()

        // next convert raw mic data into an audio source
        this.microphone = this.audioContext.createMediaStreamSource(stream)

        // next we need an analyser. When this is connected to an audio
        // source, it exposes its time and frequency data
        this.analyser = this.audioContext.createAnalyser()

        // slice the data into a specified number of audio samples
        this.analyser.fftSize = fftSize

        // how many audio samples we are getting
        const bufferLength = this.analyser.frequencyBinCount

        // create a new Uint8Array to hold the data
        this.dataArray = new Uint8Array(bufferLength)
        // finally, we connect the microphone to the analyser
        this.microphone.connect(this.analyser)

        // we are now initialized
        this.initialized = true
      })
      // .bind(this)
      .catch((error) => {
        console.error("ah ffs", error)
      })
  }

  // Get current audio samples coming from mic as an array
  get samples() {
    this.analyser.getByteTimeDomainData(this.dataArray)
    // normalise the samples by converting them to a range of -1 to 1
    let normSamples = [...this.dataArray].map((e) => e / 128 - 1)
    return normSamples
  }

  // calculate average of all audio samples and returns as single number
  get volume() {
    let normSamples = this.samples
    let sum = 0
    for (const sample of normSamples) {
      sum += Math.abs(sample) // convert to positive
    }
    let volume = sum / normSamples.length
    return volume
  }
}

let fftSize = 512
const microphone = new Microphone({ fftSize: fftSize })
let bars = []
let barWidth = canvas.width / (fftSize / 2)

const createBars = () => {
  for (let i = 0; i < fftSize / 2; i++) {
    bars.push(
      new Bar({
        x: barWidth * i,
        y: 200,
        width: barWidth,
        height: 50,
        color: "orangered",
        index: i,
      })
    )
  }
}
createBars()

// animation loop
function animate() {
  if (microphone.initialized) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const samples = microphone.samples
    bars.forEach((bar, index) => {
      bar.update({ micInput: samples[index] })
      bar.draw({ context: ctx, volume: 1 })
    })
  }

  requestAnimationFrame(animate)
}

animate()
