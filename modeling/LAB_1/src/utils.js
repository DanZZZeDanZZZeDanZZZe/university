function rnd({ y0, y1, m }) {
  const y = (y0 + y1) % m

  const resValue = y / m 

  return {
    y0: y1,
    y1: y,
    resValue 
  }
}

function getRandomNumbers({ y0, y1, m, n }) {
  if (n === 0) return []

  if (n === 1) {
    const {resValue} = rnd({ y0, y1, m })
    return [resValue]
  }

  const boundRnd = (args) => rnd({ ...args, m })
  let previousY = y0
  let currentY = y1

  return new Array(n).fill(null).map(() => {
    const { y0, y1, resValue } = boundRnd({y0: previousY , y1: currentY})
    previousY = y0
    currentY = y1
    return resValue
  })
}

function getRoundNumbers(numbers, precision = 1) {
  return numbers.map(item => +item.toFixed(precision))
}

function getPossibleProbabilities(precision) {
  const cof = 10 ** precision

  return new Array(cof)
    .fill(null)
    .map((_, index) => index / cof)
}

function getRanges(prob) {
  const {length} = prob

  return prob.map((item, index) => {
    if (length - 1 === index) {
      return {
        name: `[${item}, 1)`,
        scope: [item, 1]
      }
    }
    return {
      name: `[${item}, ${prob[index + 1]})`,
      scope: [item, prob[index + 1]]
    }
  })
}

function getHitRate(numbers, intervalPrecision) {
  const prob = getPossibleProbabilities(intervalPrecision)
  const ranges = getRanges(prob)

  const a = ranges.map(({name, scope}) => {
    const count = numbers.filter(num => {
      return num >= scope[0] && num < scope[1]
    }).length 
    return {name, scope, count}
  })
  console.log('getHitRate -> a', a)
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

function calcProbabilities(hitRate, numberOfElements) {
  return hitRate.map(([num, hits]) => {
    const prob = hits / numberOfElements
    return [num, +prob.toFixed(4)]
  })
}

function calcMatchExpect(probabilities) {
  return probabilities.reduce((acc, [num, prob]) => acc + num * prob, 0)
}

export {
  getPossibleProbabilities,
  getRandomNumbers,
  getRoundNumbers,
  getHitRate,
  getStackedHits,
  calcProbabilities,
  calcMatchExpect
} 