import random as r
import math as m

CRITICAL_VALUE = 1.96


def analytical_solution(p0, p1, p2, p3):
    hit_p_1 = 3 * p0 * (1 - p0)**2
    hit_p_2 = 3 * p0**2 * (1 - p0)
    hit_p_3 = p0**3
    return round(p1 * hit_p_1 + p2 * hit_p_2 + p3 * hit_p_3, 5)


def monte_carlo_solution(n, p0, p1, p2, p3):
    count = 0

    def hit_the_target(p):
        nonlocal count

        r_num = r.random()
        if r_num < p:
            count += 1

    def shot(): return r.random() < p0

    for i in range(n):
        shot_count = 0
        for i in range(3):
            if shot():
                shot_count += 1

        if shot_count == 3:
            hit_the_target(p3)
        elif shot_count == 2:
            hit_the_target(p2)
        elif shot_count == 1:
            hit_the_target(p1)

    return round(count / n, 5)


n = 10000000
p0 = 0.7
p1 = 0.5
p2 = 0.7
p3 = 0.9

analytical_p = analytical_solution(p0, p1, p2, p3)
monte_carlo_p = monte_carlo_solution(n, p0, p1, p2, p3)

interval_r = CRITICAL_VALUE * m.sqrt(monte_carlo_p * (1 - monte_carlo_p) / n)
start_boundary = round(monte_carlo_p - interval_r, 5)
end_boundary = round(monte_carlo_p + interval_r, 5)

print('analytical solution:', analytical_p)
print('Monte Carlo solution:', monte_carlo_p)
print(
    f'Confidence interval: {start_boundary} < {analytical_p} < {end_boundary}'
)
