alphabet = ("а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я").split(' ')
alphabet_len = len(alphabet)

def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, y, x = egcd(b % a, a)
        return (g, x - (b // a) * y, y)

def modinv(a, m):
    g, x, y = egcd(a, m)
    if g != 1:
        raise Exception('modular inverse does not exist')
    else:
        return x % m

def encryptChar(char, k1, k2):
    order = alphabet.index(char)
    print(order)
    newOrder = (k1 * order + k2) % alphabet_len
    return alphabet[newOrder]

def encrypt(string, k1, k2):
    encryptCharWithKeys = lambda char: encryptChar(char, k1, k2)
    return "".join(list(map(encryptCharWithKeys, string)))

def decryptChar(char, k1, k2):
    order = alphabet.index(char)
    newOrder = modinv(k1, alphabet_len)  * (order - k2) % alphabet_len
    print(newOrder)
    return alphabet[newOrder]
   
def decrypt(string, k1, k2):
    decryptCharWithKeys = lambda char: decryptChar(char, k1, k2)
    return "".join(list(map(decryptCharWithKeys, string)))