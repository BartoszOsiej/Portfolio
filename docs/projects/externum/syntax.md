---
sidebar_position: 2
title: Syntax Reference
---

# Externum — Syntax Reference

## Data Types

```python
# Primitives
x = 42              # int
y = 3.14            # float
s = "hello"         # string
b = True            # bool
n = None            # null

# Collections
lst = [1, 2, 3]                 # list
tup = (1, 2, 3)                 # tuple
d = {"a": 1, "b": 2}           # dict
s = {1, 2, 3}                   # set

# Literals
hex_val = 0xFF                   # hexadecimal
bin_val = 0b1010                 # binary
f_str = f"value is {x}"         # f-string
```

## Control Flow

```python
# If/elif/else
if x > 10 {
    print("big")
} elif x > 5 {
    print("medium")
} else {
    print("small")
}

# While
while x > 0 {
    x -= 1
}

# For loop (multi-variable)
for i, v in enumerate(lst) {
    print(f"{i}: {v}")
}

# Break / continue
for item in lst {
    if item == 0 { continue }
    if item > 100 { break }
    process(item)
}
```

## Functions

```python
# Basic function
fn add(a, b) -> int {
    return a + b
}

# Default parameters
fn greet(name, greeting="Hello") {
    print(f"{greeting}, {name}!")
}

# *args and **kwargs
fn flexible(*args, **kwargs) {
    for arg in args { print(arg) }
    for k, v in kwargs { print(f"{k}={v}") }
}

# Lambdas
square = fn(x) -> int { return x * x }

# Generators
fn count_to(n) {
    for i in range(n) {
        yield i
    }
}
```

## OOP

```python
class Animal {
    fn __init__(self, name, sound) {
        self.name = name
        self.sound = sound
    }

    fn speak() {
        print(f"{self.name} says {self.sound}!")
    }
}

class Dog extends Animal {
    fn __init__(self, name) {
        super().__init__(name, "Woof")
    }

    fn fetch(item) {
        print(f"{self.name} fetches the {item}!")
    }
}
```

## Error Handling

```python
try {
    result = risky_operation()
} catch (e) {
    print(f"Error: {e}")
} else {
    print("No error!")
} finally {
    cleanup()
}

# Assertions
assert x > 0, "x must be positive"
```

## Shell Integration

```python
# Inline bash
files = `ls -la`

# Bash block
%% 
echo "Running system check..."
uname -a
df -h
%%
```

## Operators

```python
# Arithmetic: + - * / % **
# Comparison: == != < > <= >=
# Logical: && || !
# Bitwise: & | ^ ~ << >>
# Ternary: x if condition else y

# Comprehensions
squares = [x * x for x in range(10)]
evens = [x for x in lst if x % 2 == 0]
```
