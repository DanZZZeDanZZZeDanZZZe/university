from math import ceil


def strXOR(a, b):
    return str(int(a) ^ int(b))


def mapStrXOR(a, b):
    return ''.join(strXOR(a[i], b[i]) for i in range(len(a)))


def convertKeyStr(key, bitString):
    if len(key) < len(bitString):
        return key * ceil(len(bitString) / len(key))
    else:
        return key


def grouper(iterable, n):
    args = [iter(iterable)] * n
    return [''.join(i) for i in (zip(*args))]


def encrypt(text, key):
    bitString = ''.join(format(ord(x), 'b') for x in text)
    key = convertKeyStr(key, bitString)
    return mapStrXOR(bitString, key)


def decrypt(text, key):
    key = convertKeyStr(key, text)
    result = mapStrXOR(text, key)
    return ''.join(chr(int(i, 2)) for i in grouper(result, 7))


print('Введите исходное сообщение: ')
message = input()
print('Введите ключ: ')
key = input()
encrypted_message = encrypt(message, key)
decrypted_message = decrypt(encrypted_message, key)
print('Шифрованное сообщение: ')
print(encrypted_message)
print('Дешифрованное сообщение: ')
print(decrypted_message)
