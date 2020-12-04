from alphabet import rus
import lcg


def generate_gamma(size):  # генерация списка случаных чисел конгруэнтным методом
    # начальное значение для генерации
    seed = 7
    results = []

    def rnd():
        return lcg.rnd(5, 4003, 4096, seed)

    while (len(results) < size):
        # деление по модулю на size - 1
        # позволяет ограничить значение случайных чисел
        seed = rnd() % size - 1
        results.append(seed)
    return results


def get_word(alphabet, index_list):  # получение слова из списка позиций
    return ''.join([alphabet[i] for i in index_list])


def get_indexes(alphabet, word):  # получение списка позиций из слова
    return [alphabet.index(el) for el in list(word.strip())]


def encrypt(message, alphabet, gamma):  # функция шифрования
    max_num = len(alphabet) - 1
    # получаем индексы
    message_indexes = get_indexes(alphabet, message)
    # гаммируем
    # складываем индексы с гаммой и делим на максимально допустимый индекс
    new_message_indexes = [(x+y) % max_num
                           for x, y in zip(message_indexes, gamma)]

    return get_word(alphabet, new_message_indexes)


def decrypt(cipher, alphabet, gamma):  # функция расшифрования
    max_num = len(alphabet) - 1
    # получаем индексы
    cipher_indexes = get_indexes(alphabet, cipher)
    # получаем исходные позиции
    # прибавив максимальную позицию и отняв гамму
    new_cipher_indexes = [(x+max_num - y) % max_num
                          for x, y in zip(cipher_indexes, gamma)]

    return get_word(alphabet, new_cipher_indexes)


# ввод данных
message = input()

# получение результатов
gamma = generate_gamma(len(message))
cipher = encrypt(message, rus, gamma)
decrypted_cipher = decrypt(cipher, rus, gamma)

# вывод результатов
print(f'Исходное сообщение: {message}')
print(f'Шифрованное сообщение: {cipher}')
print(f'Расшифрованное исходное сообщение: {decrypted_cipher}')
