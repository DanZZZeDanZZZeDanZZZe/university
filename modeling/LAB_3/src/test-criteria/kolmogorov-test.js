//проверка генератора по критерию колмогорова
//sortedRandomNumbers - отсортированный массив случайных чисел
//в качестве меры расхождения используем максимальное значения модуля разности
//между теоретическим и статистическим распределением
export function calcKolmogorovTest(sortedRandomNumbers) {
  console.log('calcKolmogorovTest -> sortedRandomNumbers', sortedRandomNumbers)
  //число случайных величин
  const n = sortedRandomNumbers.length
  //переменная для храненения значения расхождения
  let dMax = 0

  sortedRandomNumbers.forEach((rndNumber, index) => {
    const dp = Math.abs((index + 1) / n - rndNumber)
    const dm = Math.abs(rndNumber - index / n) 
    const newDMax = Math.max(dp, dm) 

    if (newDMax > dMax) dMax = newDMax
  })

  return dMax * Math.sqrt(n)
}