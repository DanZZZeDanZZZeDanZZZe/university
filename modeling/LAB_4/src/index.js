import './style.css'
import Chart from 'chart.js';
import createFrequencyHistogram from './charts/frequency-histogram'
import createStatisticalDistributionFunction from './charts/statistical-distribution-function'
import { 
  getRndNumsBySelectionMethod,
  clalcByTheLimitCentralTheorem,
  getHitRate,
  getStackedHits,
  calcMatchExpect,
  calcDispersion,
} from './utils.js'
import {
  clacX2forEquiprobable
} from './test-criteria/pearson-test'
import {
  calcKolmogorovTest
} from './test-criteria/kolmogorov-test'

//указываем обьем выборки и границы интервала
const N = 90000
const M = 0.5
const D = 0.083

const arr = (n) => new Array(n).fill()
//обратная функция для нормального распределения на интервале (0, 1)
const func = (y) => {
  const sqrt = (n) => Math.sqrt(n)
  const ln = (n) => Math.log(n)
  const pi = Math.PI
  const piece = sqrt(-2 * D * ln(sqrt(D) * sqrt(2* pi) * y))
  return y <= 0.5 ? M - piece : M + piece
}

//создаем интервалы для диаграмм
const step = 1 / 25
const ranges = arr(25).map((_, index) => {
  const start = index * step
  const end = (index + 1) * step

  return {
    name: `[${start}, ${end})`,
    scope: [start, end]
  }
})

const randomNumbers = clalcByTheLimitCentralTheorem({m: M , d: D, n: N})
const hitRate = getHitRate({randomNumbers, ranges})

const normolizeHitRate = hitRate.map((item) => {
  const {count} = item
  return {...item, count: count / N}
})

const normolizeStackedHits = getStackedHits(normolizeHitRate) 
const matchExpect = calcMatchExpect({randomNumbers, n: N})

// const sortedRandomNumbers = [...randomNumbers].sort()

// //функция для выражения x в критерии калмогорова
// const dynamicFunc = (y) => {
//   const a1 = func1(interval1.a)
//   const b1 = func1(interval1.b)
//   if (y > a1 && y < b1) return inverseFunc1(y)
//   const a2 = func2(interval2.a)
//   const b2 = func2(interval2.b)
//   if (y >= a2 && y < b2) return inverseFunc2(y)
//   const a3 = func3(interval3.a)
//   const b3 = func3(interval3.b)
//   if (y >= a3 && y <= b3) return inverseFunc3(y)
// }

const kolmogorovTest = calcKolmogorovTest(randomNumbers.sort(), func)

const query = (selector) => document.querySelector(selector)
const insert = (selector, HTML) => query(selector).innerHTML = HTML

const ctxFrequencyHistogram = query('#frequency-histogram');
const ctxStatisticalDistributionFunction = query('#statistical-distribution-function')

new Chart(
  ctxFrequencyHistogram,
  createFrequencyHistogram(normolizeHitRate)
)
new Chart(
  ctxStatisticalDistributionFunction,
  createStatisticalDistributionFunction(normolizeStackedHits)
)
insert('.MO', matchExpect)
insert('.D', calcDispersion({randomNumbers, matchExpect, n: N}))
insert('.kolmogorov-test', kolmogorovTest.toFixed(3))