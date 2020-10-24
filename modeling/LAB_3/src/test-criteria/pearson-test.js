export function clacX2({hitRate, pt, n}) {
  return hitRate.reduce((acc, item, index) => {
    return acc + (item - n * pt[index])**2 / (n * pt[index])
  }, 0)
}

//hitRate - число попаданий случайных величин в интервал
//funcDensity - 
export function clacX2forEquiprobable(hitRate, funcDensity) {
  const {length} = hitRate
  const pt = new Array(length).fill(1 / length)
  return clacX2({hitRate, pt, n})
}