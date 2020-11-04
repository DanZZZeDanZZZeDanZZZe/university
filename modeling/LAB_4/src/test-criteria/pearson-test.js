function clacX2({hitRate, pt, n}) {
  console.log("clacX2 -> pt", pt)
  return hitRate.reduce((acc, item, index) => {
    const l = (item - n * pt[index])**2 / (n * pt[index])
    console.log("clacX2 -> l", l)
    return acc + l
  }, 0)
}

export function clacX2forEquiprobable({hitRate, n}) {
  const {length} = hitRate
  console.log("clacX2forEquiprobable -> length", length)
  const pt = new Array(length).fill(1 / length)
  return clacX2({hitRate, pt, n})
}