# WIP python solution

coins = [1, 5, 10, 25, 50]
n = 16

def find_combos(cur_n, cur_coins):
    if cur_n == 0:
        global combos
        combos.append(cur_coins)

    for coin in coins:
        if coin > cur_n or (len(cur_coins) > 0 and coin > cur_coins[-1]):
            break
        find_combos(cur_n - coin, cur_coins + [coin])

coins.sort()
combos = []

find_combos(n, [])
print(combos)
