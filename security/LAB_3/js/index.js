const lcg = require('./lcg')
const {rus} = require('./alphabet')
const fs = require('fs')

function generateGamma(size) {  // генерация массива случаных чисел конгруэнтным методом
  // начальное значение для генерации
  let seed = 7
  const results = []

  const rnd = () => lcg.rnd(5, 4003, 4096, seed)

  while (results.length < size) {
    // деление по модулю на size позволяет ограничить значение случайных чисел
    seed = rnd() % size
    results.push(seed)
  }
  return results
}


function doubleMap(callback, arr1, arr2) { // двойной перебор массивов
  return arr1.map((el, index) =>  callback(el, arr2[index]))
}

function getWord(alphabet, index_list) {  // получение слова из массива позиций
  return index_list.map(i => alphabet[i]).join('')
}


function getIndexes(alphabet, word) { // получение массива позиций из слова
  return word.trim().split('').map(i => alphabet.indexOf(i))
}

function encrypt(message, alphabet, gamma) { // функция шифрования
    // получаем индексы
    const messageIndexes = getIndexes(alphabet, message)
    // гаммируем
    // складываем индексы с гаммой и делим на максимально допустимый индекс
    const newMessageIndexes = doubleMap(
      (x, y) => (x+y) % alphabet.length, 
      messageIndexes, 
      gamma
    )
    return getWord(alphabet, newMessageIndexes)
}

function  decrypt(cipher, alphabet, gamma) {  // функция расшифрования
  // получаем индексы
  const cipherIndexes = getIndexes(alphabet, cipher)
  // получаем исходные позиции
  // прибавив максимальную позицию и отняв гамму
  const newCipherIndexes = doubleMap(
    (x, y) => (x + alphabet.length - y) % alphabet.length,
    cipherIndexes, 
    gamma
  )
  return getWord(alphabet, newCipherIndexes)
}

// ввод данных из текстового файла
const message = fs.readFileSync('./word.txt').toString().trim()

// получение результатов
const gamma = generateGamma(message.length)
const cipher = encrypt(message, rus, gamma)
const decryptedCipher = decrypt(cipher, rus, gamma)

console.log(`Исходное сообщение: ${message}`)
console.log(`Шифрованное сообщение: ${cipher}`)
console.log(`Расшифрованное исходное сообщение: ${decryptedCipher}`)