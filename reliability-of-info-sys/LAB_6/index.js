// обьявляем все необходимые константы
// для вычислений
const LAMBDA = 4e-2
const NU = 0.5
// для графического отображения
const HEIGHT = 600
const WIDTH = 880
const TEXT_START = 5
const LINE_START = 80
const LINE_STEP = 100
const LINE_HEIGHT = 40
const ITERATION_WIDTH = 15
const LINE_NAMES = ['Элемент 1', 'Элемент 2',  'Элемент 3', 'Элемент 4', 'Система']
const LINE_COLORS = ['red', 'blue',  'green', 'purple', 'brown']

// создаём холст
const canvas = document.querySelector("canvas");
// получаем заголовок
const title = document.querySelector("h3");
// получаем контекст для работы с методами холста
const ctx = canvas.getContext("2d");

// рисуем заголовки, перебрав список имен
function drawTitles() {
  LINE_NAMES.forEach((name, i) => ctx.fillText(name, TEXT_START, (i + 1) * LINE_STEP))
}

// получение состояния и его продолжительности из массива исходных данных
function compressResults(boolArr) {
  const result = []
  let breakpoint = 0
  
  for (let i = 0; i < boolArr.length; i++) {
    if (boolArr.length - 1 === i || boolArr[i] !== boolArr[i + 1]) {
      result.push({
        state: boolArr[i],
        length: i - breakpoint
      })
      breakpoint = i
    }
  }
  return result
}

// функция отрисовки процесса октазов и востановлений
function drawProcess(lineNumber, boolArr, color) {
  // создаём из массива значений массив обьектов, 
  // какждый из которыйх содержит состояние элемента и длительность этого состояния
  const arr = compressResults(boolArr)
  // установка позиции текущего процесса по оси Y
  const linePosition = (lineNumber + 1) * LINE_STEP
  // установка начального положения оп оси X
  let breakpoint = LINE_START

  //функция отрисовки работоспособного состояния
  const createLine = (length) => {
    breakpoint += ITERATION_WIDTH * length
    ctx.lineTo(breakpoint, linePosition) 
  }
  //функция отрисовки неработоспособного состояния
  const createFailture = (length) => {
    ctx.lineTo(breakpoint, linePosition + LINE_HEIGHT) 
    breakpoint += ITERATION_WIDTH * length
    ctx.lineTo(breakpoint, linePosition + LINE_HEIGHT) 
    ctx.lineTo(breakpoint, linePosition) 
  }

  // установка цвета линии и отрисовка стартовой точки
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.moveTo(breakpoint, linePosition)

  // перебор состояний и отрисовка
  arr.forEach(({state, length}) => {
    state ? createLine(length) : createFailture(length)
  })

  // конец отрисовки, сброс цвета линии
  ctx.stroke()
  ctx.strokeStyle = 'black';
}

// очищение холста
function clearCanvas() {
  ctx.clearRect(LINE_START - 1, 0, canvas.width, canvas.height);
}

// функция остановки потока выполнения
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// моделируем процесс отказов и востановлений
async function simulateAnExperiment() {
  canvas.width= WIDTH
  canvas.height= HEIGHT
  // функция расчёта вероятности отказа
  const calcFP = (t) => 1 - Math.exp(LAMBDA * -1 * t)
  // функция расчёта вероятности востановления
  const calcRP = (t) => 1 - Math.exp(NU * -1 * t)

  // массив для хранения состояний каждого элемента и системы
  // при этом в нулевой момент времени все элементы исправны
  const arrOfElements = [[true], [true], [true], [true]]
  // массив для хранения итогового состояния всей системы
  const systemStates = [true]
  // таймеры, считающие прибывание элемента в том или ином состоянии
  let timers = [0, 0, 0, 0]
  // число раз, когда система меняла своё состояние
  let changeNumber = 0
  // симуляция отказа или безотказной работы методом Монтэ-Карло
  const simulateAMoment = () => {
    const getLast = (arr) => arr[arr.length - 1]

    arrOfElements.forEach((elementStates, index) => {
      // получение случйного числа
      const rnd = Math.random()
      // получение последнего состояния
      const lastState = getLast(elementStates)
      // в зависимости от состояния элемента на прошлой итерации
      // либо вероятность отказа, либо вероятность востановления
      const p = lastState ? calcFP(timers[index]) : calcRP(timers[index])
      // если состояние изменилось, сбрасываем таймер для текущего элемента
      if (rnd < p) {
        elementStates.push(!lastState)
        timers[index] = 0
      } else {
        elementStates.push(lastState)
      }
    })
    // вычисление состояния всей системы
    // при условии, что отказ системы наступает, при отказе 2-х элементов
    // считаем сколько элементов в текущий момент в состоянии отказа
    const count = arrOfElements.reduce((count, elementStates) => {
      // получение последнего состояния
      const lastState = getLast(elementStates)
      return count + !lastState 
    }, 0)

    systemStates.push(count < 2)
    const sysLength = systemStates.length
    if (systemStates[sysLength - 1] !== systemStates[sysLength - 2]) ++changeNumber

    
  }

  // симуляция работы системы
  while (true) {
    // если система изменила своё состояние 8 раз, прекращаем рисовать график
    if (changeNumber > 8) break; 
    // увеличиваем размер холста и рисуем заголовки
    canvas.width = canvas.width + ITERATION_WIDTH
    drawTitles()
    // увеличиваем значения таймеров на еденицу
    timers = timers.map(i => ++i)
    simulateAMoment()

    // отрисовка полученных значений
    const finalArray = [...arrOfElements].concat([systemStates])
    finalArray.forEach((el, i) => drawProcess(i, el, LINE_COLORS[i]))
    await sleep(10)
  }

  // поиск времени, когда случился первый отказ
  const time = systemStates.indexOf(false) + 1

  return Promise.resolve(time);
}



async function start(n) {
  // массив, который хранит 
  const times = []
  for (let i = 0; i < n; i++) {
    title.textContent = `Эксперимент ${i + 1}`
    const time = await simulateAnExperiment()
    times.push(time)
  }
  alert(`Минимальное время работы до первого отказа ${Math.min(...times)} ч.`)
}

// повторяем эксперимент 120 раз
start(120)