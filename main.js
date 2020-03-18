
const UP = 'UP'
const LEFT = 'LEFT'
const DOWN = 'DOWN'
const RIGHT = 'RIGHT'

const canvas = document.getElementById('snake')
const context = canvas.getContext('2d')
const box = 32
const max = 480

let direction = ''

let history = {
  direction: ''
}

let snake = [
  {
    x: 8 * box,
    y: 8 * box
  }
]

function criarBG() {
  context.fillStyle = "lightgreen"
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha() {
  snake.forEach(
    ({ x, y }) => {
      context.fillStyle = "green"
      context.fillRect(x, y, box, box)
    }
  )
}

function handleDirection(coods) {

  const { x, y } = coods
  switch (direction) {
    case RIGHT:
      return (
        x < max ? { x: x + box, y } : { x: 0, y }
      )
    case LEFT:
      return (
        x > 0 ? { x: x - box, y } : { x: max, y }
      )
    case DOWN:
      return (
        y < max ? { x, y: y + box } : { x, y: 0 }
      )
    case UP:
      return (
        y > 0 ? { x, y: y - box } : { x, y: max }
      )
    default:
      return { x, y }
  }
}

function startGame() {
  criarBG()
  criarCobrinha()

  const new_pos = handleDirection(snake[0])

  snake.pop()

  snake.unshift(new_pos)
}

function updateHistory(direction) {
  Object.assign(history, { direction })
}

function handleArrow(arrow) {
  switch (arrow) {
    case 'ArrowUp':
      updateHistory(UP)
      direction = UP
      break
    case 'ArrowRight':
      updateHistory(RIGHT)
      direction = RIGHT
      break
    case 'ArrowLeft':
      updateHistory(LEFT)
      direction = LEFT
      break
    case 'ArrowDown':
      updateHistory(DOWN)
      direction = DOWN
      break
    case ' ':
      if ( direction == '' ) {
        direction = history.direction
      } else {
        direction = ''
      }
      break
    default:
      break
  }
}

this.addEventListener(
  'keyup',
  ({ key }) => {
    console.log(key)
    handleArrow(key)
  }
)

let jogo = setInterval(startGame, 100)
