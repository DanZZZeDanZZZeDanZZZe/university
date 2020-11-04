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
//функция для нормального распределения на интервале (0, 1)
const func = (x) => {
  const sqrt = (n) => Math.sqrt(n)
  const {E, PI} = Math
  //return (1 / (sqrt(D) * sqrt(2 * PI))) * E ** ((x - M) ** 2 / 2 * D)
  return (1 / (sqrt(D) * sqrt(2 * PI))) * E ** ((x - M) ** 2 / 2 * D)
  // return (1 / (sqrt(2 * PI))) * E ** ((x - M) ** 2 / 2 )
}
const step = 1 / 25
//создаем интервалы для диаграмм
const ranges = arr(25).map((_, index) => {
  const start = index * step
  const end = (index + 1) * step

  return {
    name: `[${start}, ${end})`,
    scope: [start, end]
  }
})

const pt = ranges.map(({scope}) => {
  const [start, end] = scope
  console.log("(start + end) / 2", (start + end) / 2)
  return func((start + end) / 2)
})
console.log("pt", pt)

const randomNumbers = clalcByTheLimitCentralTheorem({m: M , d: D, n: N})
const hitRate = getHitRate({randomNumbers, ranges})
console.log(randomNumbers.map(i => func(i)))
const normolizeHitRate = hitRate.map((item) => {
  const {count} = item
  return {...item, count: count / N}
})

const normolizeStackedHits = getStackedHits(normolizeHitRate) 
const matchExpect = calcMatchExpect({randomNumbers, n: N})
//const kolmogorovTest = calcKolmogorovTest(randomNumbers.sort(), func)
const X2 = clacX2forEquiprobable({
  hitRate: hitRate.map(({count}) => count), 
  n: N,
  pt
})
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