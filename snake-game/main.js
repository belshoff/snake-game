
const UP = 'UP'
const LEFT = 'LEFT'
const DOWN = 'DOWN'
const RIGHT = 'RIGHT'

const score = document.getElementById('scoreConter')

const canvas = document.getElementById('snake')
const context = canvas.getContext('2d')
const box = 32
const max = 480

let directions = []

let history = {
  direction: ''
}

let snake = [
  {
    x: 8 * box,
    y: 8 * box
  }
]

let food = {
  x: getRandomPos(),
  y: getRandomPos()
}

function getRandomPos() {
  return Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
  context.fillStyle = "lightseagreen"
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha() {
  snake.forEach(
    ({ x, y }) => {
      context.fillStyle = "#6aea6a" // "#FF4D3B"
      context.fillRect(x, y, box, box)
    }
  )
}

function criarComida() {
  const { x, y } = food

  context.fillStyle = "#FF4D3B"
  context.fillRect(x, y, box, box)
}

function handleDirection(coods) {

  if (directions[0] == history.direction) {
    return { x, y } = coords
  }

  const { x, y } = coods
  const direction = directions.shift() || history.direction

  updateHistory(direction)

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

function gameOver() {
  clearInterval(jogo)
  alert('Você comeu você mesmo... Fim de Jogo :(')
  alert('Pontuação: '+score.innerHTML)
  score.innerHTML = 0
  location.reload(true)
}

function startGame() {

  for(let i = 1; i < snake.length; i++) {
    const { x, y } = snake[i]

    if ( x == snake[0].x &&  y == snake[0].y ) {
      gameOver()
    }
  }

  criarBG()
  criarComida()
  criarCobrinha()
    
  const new_pos = handleDirection(snake[0])

  if ( snake[0].x !== food.x || snake[0].y !== food.y ) {
    snake.pop()
  } else {
    score.innerHTML = Number(score.innerHTML) + 1
    food = { x: getRandomPos(), y: getRandomPos() }     
  }

  snake.unshift(new_pos)
}

function updateHistory(direction) {
  Object.assign(history, { direction })
}

function handleArrow(arrow) {
  switch (arrow) {
    case 'ArrowUp':
      if ( history.direction == UP ) break
      directions.push(UP)
      break
    case 'ArrowRight':
      if ( history.direction == RIGHT ) break
      directions.push(RIGHT)
      break
    case 'ArrowLeft':
      if ( history.direction == LEFT ) break
      directions.push(LEFT)
      break
    case 'ArrowDown':
      if ( history.direction == DOWN ) break
      directions.push(DOWN)
      break
    default:
      break
  }
}

this.addEventListener(
  'keyup',
  ({ key }) => {
    handleArrow(key)
  }
)

let jogo = setInterval(startGame, 150)
