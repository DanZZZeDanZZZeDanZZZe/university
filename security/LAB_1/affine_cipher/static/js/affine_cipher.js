function query(className) {
  return document.getElementsByClassName(className)[0]
}

const key1Input = query('key1-input')
const key2Input = query('key2-input')
const textInput = query('text-input')
const cipherInput = query('cipher-input')

const encryptionButton = query('encryption-button')
const decryptionButton = query('decryption-button')

const buttonHandler = async (url, inputStart, inputEnd) => {
  try {
    const params = {
      key1: key1Input.value,
      key2: key2Input.value,
      text: inputStart.value.trim().toLowerCase()
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    const { text } = await res.json()
    inputEnd.value = text
  } catch({ message }) {
    alert(message)
  }
}

encryptionButton.onclick = () => buttonHandler('encryption_button', textInput, cipherInput)
decryptionButton.onclick = () => buttonHandler('decryption_button', cipherInput, textInput)