# Алгоритм RSA
from alphabet import rus


def get_indices(alphabet, word):  # получение списка позиций из слова
    return [alphabet.index(el) for el in list(word.strip())]


def get_word(alphabet, index_list):  # получение слова из списка позиций
    return ''.join([alphabet[i] for i in index_list])


def transform_index(index, key):
    return index ** key[0] % key[1]


def transform_indices(indices, key):
    return [transform_index(i, key) for i in indices]


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
    return transform_indices(link_indices(indices, mod), public_key)


def decrypt(indices, private_key):  # функция расшифрования
    mod = private_key[1]
    original_indices = unlink_indices(
        transform_indices(indices, private_key), mod)

    return get_word(rus, original_indices)


a = encrypt('ввввввввввввввввввввввввввв', [5, 21])
b = decrypt(a, [17, 21])

print(a)
print(b)
