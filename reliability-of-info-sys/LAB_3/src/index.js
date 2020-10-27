import Chart from 'chart.js'
import { zip } from 'lodash';

function parallel(...pArr) {
	const r = pArr.reduce((result, p) => {
		return result * (1 - p) 	
  }, 1)	
  return 1 - r
}

function succesive(...pArr) {
	return pArr.reduce((pPrev, p) => pPrev  * p)
}

function calcP(lambda, t) {
	return Math.exp(-1 * lambda * t)
}

function calcT(lambda, t) {
	return -1 / lambda * Math.log(Math.random())
}

const tLength = 0.8 * 10e5
const tStep = 10e3
const lambdaValues = [
  2 * 10e-5,
  2 * 10e-7,
  4 * 10e-6,
  3 * 10e-6,
  3 * 10e-7,
  2 * 10e-8,
  1 * 10e-7,
  9 * 10e-9,
]
const N = tLength * tStep

const results1 = []
const results2 = []

for (let t = 0; t < tLength; t += tStep) {
  const pArr = lambdaValues.map(l => calcP(l, t)) 
  const [p1, p2, p3, p4, p5, p6, p7, p8] = pArr 

  const p13 = parallel(p1, p3)
  const p47 = parallel(p4, p7)
  const p13478 = succesive(p13, p47, p8)
  const p256 = succesive(p2, p5, p6)
  const p = parallel(p13478, p256)
  results1.push(p) 
}

for (let t = 0; t < tLength; t += tStep) {
  const pArr = lambdaValues.map(l => calcT(l, t)) 
  const [t1, t2, t3, t4, t5, t6, t7, t8] = pArr 

  const t13 = Math.max(t1, t3)
  const t47 = Math.max(t4, t7)
  const t13478 = Math.min(t13, t47, t8)
  const t256 = Math.min(t2, t5, t6)
  const t = Math.max(t13478, t256)
  results2.push(t) 
}

const maxTc = Math.max(...results2)
const minTc = Math.min(...results2)
const Diap = maxTc - minTc

const ChInt = tLength / tStep
const jArr = new Array(ChInt).fill(null)
const Int = Math.ceil(Diap / ChInt)

const Nc = results2.map((el) => {
  return jArr.map((_, j) => {
    return el < j * Int ? 0 : 1
  },0)
})

const PcC = zip(...Nc).map((i) => {
  return i.reduce((a, b) => a + b) / tLength * tStep
})

console.log('maxTc', maxTc.toFixed(2))
console.log('minTc', minTc.toFixed(2))
console.log('Diap', Diap.toFixed(2))
console.log('ChInt', ChInt)
console.log('Int', Int)

new Chart(document.getElementById("line-chart"), {
  type: 'line', 
  data: {
    labels: new Array(tLength / tStep).fill(null).map((_, i) => i * tStep),
    datasets: [{  
        data:  results1,
        label: "Pc(t)",
        borderColor: "red",
        fill: false,
      }, 
      {  
        data:  PcC,
        label: "Pc_c(j)",
        borderColor: "blue",
        fill: false,
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Результаты'
    },
  } 
})