# Алгоритм RSA
from random import randint
from random import randrange
from math import gcd  # проверка на взаимно простые числа
from alphabet import rus
from calc_primes import calc_primes


def get_indices(alphabet, word):  # получение списка позиций из слова
    return [alphabet.index(el) for el in list(word.strip())]


def get_word(alphabet, index_list):  # получение слова из списка позиций
    return ''.join([alphabet[i] for i in index_list])


def transform_index(index, key):
    return index ** key[0] % key[1]


def transform_indices(indices, key):
    return [transform_index(i, key) for i in indices]


# получаем случайное число, в интервале от 1 до mod
# будем добавлять в начло массива индексов перед запутыванием
def get_prefix(mod):
    return [randint(1, mod)]


# связываем значения индексов, чтобы каждое следущее зависило от предыдущего
def link_indices(indices, mod):
    linked_indices, prev = [], 0
    for i in indices:
        prev = (i + prev) % mod
        linked_indices.append(prev)
    return linked_indices


# убираем связь между индексами
def unlink_indices(indices, mod):
    linked_indices, prev = [], 0
    for i in range(len(indices)):
        linked_indices.append((indices[i] - prev) % mod)
        prev = indices[i]
    return linked_indices


def encrypt(word, public_key):  # функция шифрования
    indices = get_indices(rus, word)
    mod = public_key[1]
    prefix_and_indices = get_prefix(mod) + indices
    linked_indices = link_indices(prefix_and_indices, mod)
    return transform_indices(linked_indices, public_key)


def decrypt(indices, private_key):  # функция расшифрования
    mod = private_key[1]
    linked_indices = transform_indices(indices, private_key)
    original_indices = unlink_indices(linked_indices, mod)[1:]

    return get_word(rus, original_indices)


def generate_keys(n):
    def rnd_prime(primes):
        return primes[randint(0, len(primes) - 1)]


# Расширенный алгоритм Евклида для поиска public
# Источник https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm
def multinv(modulus, value):
    x, lastx = 0, 1
    a, b = modulus, value
    while b:
        a, p, b = b, a // b, a % b
        x, lastx = lastx - p * x, x
    result = (1 - lastx * modulus) // value
    if result < 0:
        result += modulus
    assert 0 <= result < modulus and value * result % modulus == 1
    return result


def keygen(n):
    primes = calc_primes(n)

    def randprime(primes):
        return primes[randint(0, len(primes) - 1)]

    p = randprime(primes)
    q = randprime(primes)
    composite = p * q
    totient = (p - 1) * (q - 1)

    while True:
        private = randrange(totient)
        if gcd(private, totient) == 1:
            break
    public = multinv(totient, private)

    assert public * \
        private % totient == gcd(public, totient) == gcd(private, totient) == 1
    return [public, composite], [private, composite]


pubkey, privkey = keygen(1000)
message = input()
a = encrypt(message, pubkey)
b = decrypt(a, privkey)

print(f'Исходное сообщение: {message}')
print(f'Шифрованное сообщение: {a}')
print(f'Расшифрованное исходное сообщение: {b}')
