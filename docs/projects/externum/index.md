---
sidebar_position: 1
title: Externum Language
---

import ScrollReveal from '@site/src/components/ScrollReveal'
import GlowCard from '@site/src/components/GlowCard'

<a class="tests-cta" href="./tests">🧪 120/120 tests passing →</a>

# Externum v3.0 "Sentient"

> **A fully functional programming language that fuses Python's readability,
> binary performance, and Bash's system control into one paradigm.
> Compiles to three targets at once: Python, Bash, and binary.**

<ScrollReveal>

## What It Can Do

| Area | Support |
|---|---|
| **Data types** | lists, dicts, tuples, sets, f-strings, `0b`/`0x` literals |
| **Control flow** | `if/elif/else`, `while`, `for ... in`, `break/continue`, `try/except/finally`, `with`, `assert` |
| **Functions** | default params, `*args`/`**kwargs`, lambdas, closures, **generators** (`yield`) |
| **OOP** | classes, inheritance, methods, `self` |
| **Modules** | `import`, own `.ext` modules, standard library |
| **Expressions** | full operator precedence, bitwise ops, ternary, comprehensions |
| **Shell** | inline bash `` `cmd` `` and `%% ... %%` blocks |
| **Tooling** | REPL, 3 compile targets, `argv`, browser playground |

</ScrollReveal>

## Quick Start

```bash
git clone https://github.com/BartoszOsiej/externum.git
cd Externum
pip install -e .            # Python 3.10+

externum --version          # Externum 3.0.0

# Run a program
externum run examples/pokedex.ext

# Interactive shell
externum repl
```

## Example

```python
# fibonacci.ext
fn fibonacci(n: int) -> int {
    if n <= 1 {
        return n
    }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

for i in range(20) {
    print(f"fib({i}) = {fibonacci(i)}")
}
```

## Three Compile Targets

| Target | Use Case |
|---|---|
| **Python** | Full-featured execution with Python's ecosystem |
| **Bash** | System scripts, cron jobs, shell automation |
| **Binary** | Standalone executable, no runtime dependencies |

```bash
# Compile to all three
externum compile examples/fibonacci.ext

# Output:
#   examples/fibonacci.py
#   examples/fibonacci.sh
#   examples/fibonacci.bin
```

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  .ext source │────►│    Parser    │────►│     AST      │
│  (Externum)  │     │ (recursive  │     │              │
│              │     │  descent)   │     │              │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                              ┌───────────────────┼───────────────────┐
                              ▼                   ▼                   ▼
                     ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
                     │  Python      │    │  Bash        │    │  Binary      │
                     │  transpiler  │    │  transpiler  │    │  compiler    │
                     └──────────────┘    └──────────────┘    └──────────────┘
```

## Features

### Standard Library

Written **in Externum itself** — the stdlib proves the language is expressive
enough to build real programs:

- `math.ext` — math functions
- `string.ext` — string manipulation
- `io.ext` — file I/O
- `list.ext` — list operations
- `random.ext` — random number generation

### Browser Playground

The Externum playground executes **entirely in your browser** — the transpiler
(written in Python) runs through WebAssembly (Pyodide), with no server at all.

### Module System

```python
# Import own modules
import utils
from math import sqrt

# Import with alias
import collections as coll
```

## Tests

**120/120 tests passing** — comprehensive coverage of:
- Parser correctness (all syntax constructs)
- Transpiler output (Python, Bash, binary)
- Runtime behaviour (all data types, control flow)
- Standard library functions
- Edge cases and error handling

---

**See also:** [Syntax](./syntax) · [Compiler](./compiler) · [Architecture](./architecture) · [Standard Library](./stdlib) · [Playground](./playground)
