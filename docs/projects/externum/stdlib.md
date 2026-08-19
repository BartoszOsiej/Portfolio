---
sidebar_position: 5
title: Standard Library
---

# Externum — Standard Library

The standard library is written **in Externum itself** — demonstrating that the
language is expressive enough to build real, useful programs.

## Modules

### math.ext

```python
import math

print(math.sqrt(16))        # 4.0
print(math.pi)              # 3.14159...
print(math.abs(-5))         # 5
print(math.max(1, 2, 3))   # 3
print(math.min(1, 2, 3))   # 1
```

### string.ext

```python
from string import capitalize, split, join, upper, lower

s = "hello world"
print(capitalize(s))        # "Hello world"
print(upper(s))             # "HELLO WORLD"
print(split(s, " "))        # ["hello", "world"]
print(join(["a", "b"], "-")) # "a-b"
```

### io.ext

```python
from io import read_file, write_file, append_file, exists

# Read
content = read_file("data.txt")

# Write
write_file("output.txt", "Hello, world!")

# Append
append_file("log.txt", "New entry\n")

# Check existence
if exists("config.txt") {
    config = read_file("config.txt")
}
```

### list.ext

```python
from list import map, filter, reduce, sort, reverse

nums = [3, 1, 4, 1, 5, 9, 2, 6]

squared = map(nums, fn(x) -> int { return x * x })
evens = filter(nums, fn(x) -> bool { return x % 2 == 0 })
total = reduce(nums, fn(a, b) -> int { return a + b }, 0)

sorted_nums = sort(nums)           # [1, 1, 2, 3, 4, 5, 6, 9]
reversed_nums = reverse(nums)      # [6, 2, 9, 5, 1, 4, 1, 3]
```

### random.ext

```python
from random import rand_int, rand_float, choice, shuffle

r = rand_int(1, 100)          # random int 1..100
f = rand_float(0.0, 1.0)     # random float 0..1
c = choice(["a", "b", "c"])   # random element

lst = [1, 2, 3, 4, 5]
shuffle(lst)                   # shuffle in place
```

## Writing Your Own Modules

```python
# myutils.ext

fn greet(name) {
    print(f"Hello, {name}!")
}

fn factorial(n) -> int {
    if n <= 1 { return 1 }
    return n * factorial(n - 1)
}

# Exported automatically
```

```python
# main.ext
import myutils

myutils.greet("World")
print(myutils.factorial(5))  # 120
```
