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
  const cof = 10 * precision

  return new Array(cof)
    .fill(null)
    .map((_, index) => index / cof)
}

function getHitRate(numbers, values) {
  const frequency = new Map(values.map(item => [item, 0]))

  numbers.forEach(num => {
    if (frequency.has(num)) {
      const count = frequency.get(num)
      frequency.set(num, count + 1)
    }
  })

  return [...frequency.entries()]
}

function getStackedHits(sortHitRate) {
  let prevFrequency = null
  return sortHitRate.map((item, index) => {
    if (index === 0) {
      prevFrequency = item[1]
      return item
    }
    const [value, frequency] = item
    const newFrequency = frequency + prevFrequency
    
    prevFrequency = newFrequency
    return [value, newFrequency]
  })
}

export {
  getPossibleProbabilities,
  getRandomNumbers,
  getRoundNumbers,
  getHitRate,
  getStackedHits
} 