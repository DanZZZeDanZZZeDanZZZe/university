//проверка генератора по критерию колмогорова
//sortedRandomNumbers - отсортированный массив случайных чисел
//func-функция закона распределния, которая определяется динамическ,
//в зависимости от случаной величины
//в качестве меры расхождения используем максимальное значения модуля разности
//между теоретическим и статистическим распределением
export function calcKolmogorovTest(sortedRandomNumbers, func) {
  //число случайных величин
  const n = sortedRandomNumbers.length
  //переменная для храненения значения расхождения
  let dMax = 0

  sortedRandomNumbers.forEach((rndNumber, index) => {
    const dp = Math.abs((index + 1) / n - func(rndNumber))
    const dm = Math.abs(func(rndNumber) - index / n) 

    if (dp > dMax) dMax = dp
    if (dm > dMax) dMax = dm
  })

  return dMax * Math.sqrt(n)
}