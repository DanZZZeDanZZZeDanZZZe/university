function clacZeroSeries(series) {
  let numberOfZeroSeries = 0
  for (let i = 0; i < series.length; i++) {
    if ((series[i - 1] === 0) && (series[i] === 0)) numberOfZeroSeries++
  }
  return numberOfZeroSeries
}


export function calcSeriesCriterion(randomNumbers, separatingElement, tB) {
  const series = randomNumbers.map((item) => item > separatingElement ? 1 : 0)
  const numberOfZeroSeries = clacZeroSeries(series)

  const p = 1 - separatingElement
  const MV = (1 - p) / p + 1
  const DV = (1 - p) / p**2

  const offset = tB * Math.sqrt(DV / numberOfZeroSeries)
  const VN = MV - offset
  const VB = MV + offset
  return {VN, MV, VB}
}