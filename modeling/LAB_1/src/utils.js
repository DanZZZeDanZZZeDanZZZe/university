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

function calcNormFreq(hitRate, precision) {
  const {length} = hitRate

  return hitRate.map((item) => {
    const {count} = item
    return {...item, freq: count / length * 10 * precision}
  })
}

function calcMatchExpect(prob, precision = 3) {
  const sum = prob.reduce((a, b) => a + b)
  return +(sum / prob.length).toFixed(precision)
}

function calcDispersion(prob, matchExpect, precision = 3) {
  const numerator = prob.reduce((acc, num) => acc + (num - matchExpect) ** 2, 0)
  return +(numerator / prob.length).toFixed(precision)
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

export {
  getRandomNumbers,
  getHitRate,
  getStackedHits,
  calcMatchExpect,
  calcDispersion,
  calcSeconCentralMoment,
  calcThirdCentralMoment
} 