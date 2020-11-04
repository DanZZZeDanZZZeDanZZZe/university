function clacX2({hitRate, pt, n}) {
  return hitRate.reduce((acc, item, index) => {
    const l = (item - n * pt[index])**2 / (n * pt[index])
    return acc + l
  }, 0)
}

export function clacX2forEquiprobable({hitRate, n, pt}) {
  const {length} = hitRate
  //const pt = new Array(length).fill(1 / length)
  return clacX2({hitRate, pt, n})
}