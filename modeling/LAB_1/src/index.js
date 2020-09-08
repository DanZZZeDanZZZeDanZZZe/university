import './style.css'
import Chart from 'chart.js';
import createFrequencyHistogram from './charts/frequency-histogram'
import createStatisticalDistributionFunction from './charts/statistical-distribution-function'
import { 
  getPossibleProbabilities,
  getRandomNumbers, 
  getRoundNumbers, 
  getHitRate,
  getStackedHits,
  calcProbabilities,
  calcMatchExpect
} from './utils.js'

const Y1 = 3215
const Y2 = 4073
const M = 4096 * 4
const PRECISION = 1
const N = 1000

const initalValues = {
  y0: Y1,
  y1: Y2,
  m: M,
  n: N,
}

const query = (selctor) => document.querySelector(selctor)

const ctxFrequencyHistogram = query('#frequency-histogram');
const ctxStatisticalDistributionFunction = query('#statistical-distribution-function');

const randomNumbers = getRandomNumbers(initalValues)

const hitRate = getHitRate(randomNumbers, PRECISION)
const stackedHits = getStackedHits(hitRate) 

// const numberOfElements = randomNumbers.length
// const probabilities = calcProbabilities(hitRate, numberOfElements)
// const matchExpect = calcMatchExpect(probabilities)

new Chart(
  ctxFrequencyHistogram,
  createFrequencyHistogram(hitRate)
);

new Chart(
  ctxStatisticalDistributionFunction,
  createStatisticalDistributionFunction(stackedHits)
);