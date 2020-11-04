// метод отбора
// a - начало интервала
// b - конец интервала
// с - постоянная, ограничения максимального значения
// func - функция для закона распределения на указанном интервале
// n - число генерируемых случайных величин
function getRndNumsBySelectionMethod({a, b, c, n, func}) {
  // создаём массив длинной n и заполняем его пустым ячейками
  return new Array(n).fill(null).map(() => {
    // для текущего элемента выполняем цикл
    // пока не выполнится условие
    while (true) {
      //получаем два независимых значения
      const r1 = Math.random()
      const r2 = Math.random()
      //находим координаты точки z1, z2
      //случайное число в заданном интервале
      const z1 = a + r1 * (b - a)
      //ограничение для случайного числа
      const z2 = c * r2
      //если координаты точки попадают в установленные ограничения
      //возвращаем полученное значение и вставляем в результирующий массив
      //если нет, повторяем вычисления
      if (z2 < func(z1)) {
        return z1
      }
    }
  })
}

function getPossibleProbabilities({numberOfIntervals, intervalStart, intervalEnd}) {
  const step = (intervalEnd - intervalStart) / numberOfIntervals
  return new Array(numberOfIntervals)
    .fill(null)
  .map((_, index) => +(index * step).toFixed(1))
}

// function getRanges({prob, intervalEnd}) {
//   const {length} = prob

//   return prob.map((item, index) => {
//     if (length - 1 === index) {
//       return {
//         name: `[${item}, ${intervalEnd})`,
//         scope: [item, intervalEnd]
//       }
//     }
//     return {
//       name: `[${item}, ${prob[index + 1]})`,
//       scope: [item, prob[index + 1]]
//     }
//   })
// }

function getHitRate({randomNumbers, ranges}) {
  const a = ranges.map(({name, scope}) => {
    const count = randomNumbers.filter(num => {
      return num >= scope[0] && num < scope[1]
    }).length 
    return {name, scope, count}
  })
  return a
}

function getStackedHits(hitRate) {
  let prevCount = 0
  return hitRate.map((item) => {
    const {count} = item
    const newCount = count + prevCount
    prevCount = newCount
    return {...item, count: newCount}
  })
}

//Оценка мат ожидания это сумма произведенеий значений случайной величины на вероятность их появления
//randomNumbers - случайные числа
//n - обьем выборки
//precision - точность
function calcMatchExpect({randomNumbers, n, precision = 3}) {
  //округлим все значения случайной величины до некоторой точности (по умолчанию до 3-х знаков)
  const roundRandomNumbers = randomNumbers.map(i => +i.toFixed(precision))
  //создадим обьект, для хранения числа выпадений случайных величин
  const numberOfDrops = {}
  //посчитаем число выпадений каждого значения
  roundRandomNumbers.forEach(i => {
    const iStr = `${i}`
    if (iStr in numberOfDrops) {
      numberOfDrops[iStr] += 1
    } else {
      numberOfDrops[iStr] = 1
    }
  })
  //посчиатем МО
  //как сумма значений на вероятность их выпадения
  const m = Object
    .entries(numberOfDrops)
    .reduce((prevResult, [value, frequency]) => {
      //находим веротяность получения значения
      const probability = frequency / n
      //умножаем значение на вероятность появления
      //сумируем с результатом из предыдущей иттерации
      return prevResult + +value * probability
    }, 0)
  //возвращаем округлённое МО
  return +m.toFixed(precision)
}

//будем искать дисперсию по формуле D(x) = M(x^2) - M(x)^2
//randomNumbers - случайные числа
//n - обьем выборки
//precision - точность
//matchExpect - M(x)
function calcDispersion({randomNumbers, matchExpect, precision = 3, n}) {
  //возведём значения СВ в квадрат
  const rnd2 = randomNumbers.map(i => i ** 2)
  //найдём M(x^2)
  const m2 = calcMatchExpect({randomNumbers: rnd2, n, precision})
  //возвращаем D(x) c указанной точностью 
  return +(m2 - matchExpect ** 2).toFixed(precision)
}

function calcNCentralMoment(prob, precision = 3, n) {
  const numerator = prob.reduce((acc, num) => acc + (num) ** n, 0)
  return +(numerator / prob.length).toFixed(precision)
}

function calcSeconCentralMoment(prob, precision = 3) {
  return calcNCentralMoment(prob, precision, 2)
}

function calcThirdCentralMoment(prob, precision = 3) {
  return calcNCentralMoment(prob, precision, 3)
}

function clalcByTheLimitCentralTheorem({m, d, n}) {
  const arr = (n) => new Array(n).fill()
  const sqrtD = Math.sqrt(d)

  return arr(n).map(() => {
    const s = arr(12).reduce((s) => s + Math.random(), 0)
    return m + (s - 6) * sqrtD
  })
}

export {
  clalcByTheLimitCentralTheorem,
  getRndNumsBySelectionMethod,
  getHitRate,
  getStackedHits,
  calcMatchExpect,
  calcDispersion,
  calcSeconCentralMoment,
  calcThirdCentralMoment
} 