import './style.css'
import Chart from 'chart.js';
import createFrequencyHistogram from './charts/frequency-histogram'
import createStatisticalDistributionFunction from './charts/statistical-distribution-function'
import { 
  getRandomNumbers,  
  getHitRate,
  getStackedHits,
  calcMatchExpect,
  calcDispersion,
  calcSeconCentralMoment,
  calcThirdCentralMoment
} from './utils.js'
import {
  clacX2forEquiprobable
} from './test-criteria/pearson-test'
import {
  calcKolmogorovTest
} from './test-criteria/kolmogorov-test'
import {
  calcSeriesCriterion
} from './test-criteria/series-criterion'


const Y1 = 3215
const Y2 = 4073
const M = 4096 * 4
const PRECISION = 1
const N = 10000

const initalValues = {
  y0: Y1,
  y1: Y2,
  m: M,
  n: N,
}

const query = (selector) => document.querySelector(selector)
const insert = (selector, HTML) => query(selector).innerHTML = HTML

const ctxFrequencyHistogram = query('#frequency-histogram');
const ctxStatisticalDistributionFunction = query('#statistical-distribution-function')

const randomNumbers = getRandomNumbers(initalValues)
const hitRate = getHitRate(randomNumbers, PRECISION)

const normolizeHitRate = hitRate.map((item) => {
  const {count} = item
  return {...item, count: count / N}
})

const normolizeStackedHits = getStackedHits(normolizeHitRate) 
const matchExpect = calcMatchExpect(randomNumbers)

new Chart(
  ctxFrequencyHistogram,
  createFrequencyHistogram(normolizeHitRate)
);

new Chart(
  ctxStatisticalDistributionFunction,
  createStatisticalDistributionFunction(normolizeStackedHits)
);

insert('.MO', matchExpect)
insert('.D', calcDispersion(randomNumbers, matchExpect))
insert('.second', calcSeconCentralMoment(randomNumbers))
insert('.third', calcThirdCentralMoment(randomNumbers))

const hitRateCounts = hitRate.map(({count}) => count)
const pearsonTest = clacX2forEquiprobable(hitRateCounts, N)
const sortedRandomNumbers = [...randomNumbers].sort()
const kolmogorovTest = calcKolmogorovTest(sortedRandomNumbers)
const seriesCriterion = calcSeriesCriterion(randomNumbers, 0.3, 2.33)
const toFixed = num => +num.toFixed(3)
const {VN, MV, VB} = seriesCriterion

insert('.pearson-test', pearsonTest)
insert('.kolmogorov-test', kolmogorovTest)
insert('.series-criterion', `${toFixed(VN)} <= ${toFixed(MV)} <= ${toFixed(VB)}`)