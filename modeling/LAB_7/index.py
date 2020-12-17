import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from statistics import mean
from numpy import var
import random as rnd


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


def simulate_experiment(n):
    a, b, x0 = 0, 10, 5
    p = 0.5
    time_results = [simulate_wanderings(p, x0, a, b) for i in range(n)]
    return time_results


def plan_experiment(step, n):
    return [simulate_experiment(i+1*step) for i in range(n)]


experiment_results = plan_experiment(10, 1000)

average_times = list(map(mean, experiment_results))
variance = [round(var(i)) for i in experiment_results]
list(map(var, experiment_results))

# положение и размеры
plt.figure(figsize=(12, 50))
average_times_hist = plt.subplot(211)
variance_hist = plt.subplot(212)

average_times_hist.set_title(
    'Статистическое распределение среднего времени блуждания')
variance_hist.set_title('Статистическое распеределение дисперсии')

# деления на оси X
average_times_hist.xaxis.set_major_locator(
    ticker.MultipleLocator(10))
variance_hist.xaxis.set_major_locator(
    ticker.MultipleLocator(100))

# сетка
average_times_hist.grid(True)
variance_hist.grid(True)

average_times_hist.hist(average_times, bins=200, density='True',
                        histtype='bar', alpha=0.7, facecolor='orange')
variance_hist.hist(variance, bins=200, density='True',
                   histtype='bar', alpha=0.7, cumulative='True', facecolor='green')
plt.show()
