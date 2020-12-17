import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from statistics import mean
import random as rnd

# число испытаний
n = 100000
# положение экранов
a, b = 0, 10
# начальное положение
x0 = 5
# вероятность шага вправо
p = 0.5


def inc(x):
    x += 1
    return x


def dec(x):
    x -= 1
    return x


def simulate_wanderings(p, x0, a, b):
    x = x0
    time = 0
    while ((x != a) and (x != b)):
        r = rnd.random()
        x = inc(x) if r < p else dec(x)
        time = inc(time)
    return time


results = [simulate_wanderings(p, x0, a, b) for _ in range(n)]
average_time = mean(results)

# построение графиков
# цена деления
division_value = 10

# положение и размеры
plt.figure(figsize=(12, 20))
frequency_histogram = plt.subplot(211)
static_histogram = plt.subplot(212)


frequency_histogram.set_title('Гистограмма частот')
static_histogram.set_title('Статистическая функция распределения')


# деления на оси X
frequency_histogram.xaxis.set_major_locator(
    ticker.MultipleLocator(division_value))
static_histogram.xaxis.set_major_locator(
    ticker.MultipleLocator(division_value))

# сетка
frequency_histogram.grid(True)
static_histogram.grid(True)


frequency_histogram.hist(results, bins=20, density='True',
                         histtype='bar', alpha=0.7, facecolor='orange')
static_histogram.hist(results, bins=20, density='True',
                      histtype='bar', alpha=0.7, cumulative='True', facecolor='green')
plt.show()

print(f'Среднее время до поглощения частицы: { average_time }')
