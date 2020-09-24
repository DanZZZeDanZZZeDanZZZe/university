export function calcKolmogorovTest(rndNumbers) {
  const n = rndNumbers.length
  let dMax = 0

  rndNumbers.map((item, index) => {
    const ft = item / n
    dp = Math.abs((index + 1) / n - ft)
    dm = Math.abs(ft - i / n) 
    dMax = Math.max(dp, dm) 
  })

  return dMax * Math.sqrt(n)
}