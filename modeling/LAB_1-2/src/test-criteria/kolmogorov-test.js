export function calcKolmogorovTest(sortedRandomNumbers) {
  const n = sortedRandomNumbers.length
  let dMax = 0

  sortedRandomNumbers.forEach((rndNumber, index) => {
    const dp = Math.abs((index + 1) / n - rndNumber)
    const dm = Math.abs(rndNumber - index / n) 
    const newDMax = Math.max(dp, dm) 

    if (newDMax > dMax) dMax = newDMax
  })

  return dMax * Math.sqrt(n)
}