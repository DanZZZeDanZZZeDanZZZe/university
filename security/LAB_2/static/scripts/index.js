function query(className) {
  return document.getElementsByClassName(className)[0]
}

function getValues(type) {
  return {
    text: query('decrypted-text').value.split(''),
    tableSize: +query('table-size').value,
    xKey: query('x-key').value.split('').map(item => +item),
    yKey: query('y-key').value.split('').map(item => +item),
    type
  }
}

const encryptButton = query('encrypt')

const calcButtonHandler = async (url, type) => {
  try {
    const params = getValues(type)
    const {xKey, yKey, tableSize, text} = params
    const tableSize2 = tableSize ** 2
    const textLength = text.length

    if (!(xKey.length === tableSize && xKey.length === yKey.length)) {
      throw new Error('Key lengths and dimensions must be equal!')
    }

    if (textLength > tableSize2) {
      throw new Error('The string is too long!')
    }

    if (textLength < tableSize2) {
      const spaceArr = new Array(tableSize2 - textLength).fill(' ')
      const newText = [...text, ...spaceArr]
      params.text = newText.join('')
    }

    console.log('buttonHandler -> params', params)

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify(params)
    })

    const { result } = await res.json()
    
    query('encrypted-text').value = result
  } catch({ message }) {
    alert(message)
  }
} 

encryptButton.onclick = () => calcButtonHandler('result', 'decrypt')