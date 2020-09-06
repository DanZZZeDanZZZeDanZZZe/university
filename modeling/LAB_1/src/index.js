import './style.css'
import Chart from 'chart.js';
import createFrequencyHistogram from './charts/frequency-histogram'
import createStatisticalDistributionFunction from './charts/statistical-distribution-function'
import { 
  getPossibleProbabilities,
  getRandomNumbers, 
  getRoundNumbers, 
  getHitRate,
  getStackedHits
} from './utils.js'

const Y1 = 3215
const Y2 = 4073
const M = 4096 * 4
const PRECISION = 2

const initalValues = {
  y0: Y1,
  y1: Y2,
  m: M,
  n: 1000,
}

const query = (selctor) => document.querySelector(selctor)

const ctxFrequencyHistogram = query('#frequency-histogram');
const ctxStatisticalDistributionFunction = query('#statistical-distribution-function');

const randomNumbers = getRandomNumbers(initalValues)
const roundRandomValues = getRoundNumbers(randomNumbers, PRECISION)
const possibleProbabilities = getPossibleProbabilities(PRECISION)
const hitRate = getHitRate(roundRandomValues, possibleProbabilities)
const sortHitRate = hitRate.sort((a, b) => a[0] > b[0])
const stackedHits = getStackedHits(sortHitRate) 

new Chart(
  ctxFrequencyHistogram,
  createFrequencyHistogram(sortHitRate)
);

new Chart(
  ctxStatisticalDistributionFunction,
  createStatisticalDistributionFunction(stackedHits)
);