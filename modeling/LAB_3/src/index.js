import './style.css'
import Chart from 'chart.js';
import createFrequencyHistogram from './charts/frequency-histogram'
import createStatisticalDistributionFunction from './charts/statistical-distribution-function'
import { 
  getRndNumsBySelectionMethod,
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
const N = 3000
const intervalStart = 0
const intervalEnd = 3

const interval1 = {a: intervalStart, b: 1}
const interval2 = {a: 1, b: 1.5}
const interval3 = {a: 1.5, b: intervalEnd}

//обьявляем функции для нашего закона распределения
const func1 = (x) => 0.25 * x ** 2
const func2 = (x) => 1.14 * x - 0.89
const func3 = (x) => 1 - 0.08 * (x - 3) ** 2

//обратные функции, для поиска x в критерии колмогорова
const inverseFunc1 = (y) => Math.sqrt(y / 0.25)
const inverseFunc2 = (y) => (y + 0.89 )/ 1.14 
const inverseFunc3 = (y) => Math.sqrt((1 - y) / 0.08) + 3

//так как функции монотонно возрастающие, то с находим, как значение функции,
//на конце интервала
const c1 = func1(interval1.b) 
const c2 = func2(interval2.b)
const c3 = func3(interval3.b)

//получаем случайные числа для каждого из интервалов
const randomNumbers1 = getRndNumsBySelectionMethod({...interval1, c: c1, func: func1, n: N / 3})
const randomNumbers2 = getRndNumsBySelectionMethod({...interval2, c: c2, func: func2, n: N / 3})
const randomNumbers3 = getRndNumsBySelectionMethod({...interval3, c: c3, func: func3, n: N / 3})

//обьединяем полученные результаты в один массив
const randomNumbers = [...randomNumbers1, ...randomNumbers2, ...randomNumbers3]

const hitRate = getHitRate({randomNumbers, numberOfIntervals: 15, intervalStart, intervalEnd})

const normolizeHitRate = hitRate.map((item) => {
  const {count} = item
  return {...item, count: count / N}
})

const normolizeStackedHits = getStackedHits(normolizeHitRate) 
const matchExpect = calcMatchExpect({randomNumbers, n: N})

const sortedRandomNumbers = [...randomNumbers].sort()

//функция для выражения x в критерии калмогорова
const dynamicFunc = (y) => {
  const a1 = func1(interval1.a)
  const b1 = func1(interval1.b)
  if (y > a1 && y < b1) return inverseFunc1(y)
  const a2 = func2(interval2.a)
  const b2 = func2(interval2.b)
  if (y >= a2 && y < b2) return inverseFunc2(y)
  const a3 = func3(interval3.a)
  const b3 = func3(interval3.b)
  if (y >= a3 && y <= b3) return inverseFunc3(y)
}
//const kolmogorovTest = calcKolmogorovTest(randomNumbers1.sort())
const kolmogorovTest = calcKolmogorovTest(sortedRandomNumbers.sort(), dynamicFunc)

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
insert('.kolmogorov-test', kolmogorovTest)