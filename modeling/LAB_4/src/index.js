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
  erf, sqrt, abs
} from 'mathjs'
import {
  clacX2forEquiprobable
} from './test-criteria/pearson-test'
import {
  calcKolmogorovTest
} from './test-criteria/kolmogorov-test'

//указываем обьем выборки и границы интервала
const N = 90000
const M = 3
const D = 1
const intervalStart = 0
const intervalEnd = 6

const arr = (n) => new Array(n).fill()
const func = (x) => {
  return 0.5 * abs(1 + erf((x - M) / (D * sqrt(2))))
}
const step = (intervalEnd - intervalStart) / 15
//создаем интервалы для диаграмм
const ranges = arr(15).map((_, index) => {
  const start = index * step
  const end = (index + 1) * step

  return {
    name: `[${start.toFixed(2)}, ${end.toFixed(2)})`,
    scope: [start, end]
  }
})

const pt = ranges.map(({scope}) => {
  const [start, end] = scope
  return abs(func(start) - func(end))
})

const randomNumbers = clalcByTheLimitCentralTheorem({m: M , d: D, n: N})
const hitRate = getHitRate({randomNumbers, ranges})
//console.log(randomNumbers.map(i => func(i)))
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


console.log("X2", X2)
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
//insert('.kolmogorov-test', kolmogorovTest.toFixed(3))