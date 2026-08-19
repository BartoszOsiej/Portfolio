---
sidebar_position: 4
title: Architecture
---

# Externum — Architecture

## Project Structure

```
externum/
├── externum/
│   ├── __init__.py        # Package init
│   ├── cli.py             # CLI entry point
│   ├── lexer.py           # Tokeniser
│   ├── parser.py          # Recursive descent parser
│   ├── ast_nodes.py       # AST node definitions
│   ├── transpiler/
│   │   ├── __init__.py
│   │   ├── python.py      # Python backend
│   │   ├── bash.py        # Bash backend
│   │   └── binary.py      # Binary backend
│   ├── repl.py            # Interactive shell
│   ├── module_loader.py   # Module resolution
│   └── stdlib/            # Standard library (in Externum)
│       ├── math.ext
│       ├── string.ext
│       ├── io.ext
│       ├── list.ext
│       └── random.ext
├── examples/              # Example programs
│   ├── fibonacci.ext
│   ├── pokedex.ext
│   └── ...
├── tests/                 # 120 test cases
│   ├── test_lexer.py
│   ├── test_parser.py
│   ├── test_transpiler.py
│   └── test_stdlib.py
├── setup.py               # pip install -e .
├── README.md
└── README.pl.md           # Polish documentation
```

## Data Flow

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Source   │───►│  Lexer   │───►│  Parser  │───►│   AST    │
│  (.ext)  │    │ (tokens) │    │  (tree)  │    │          │
└──────────┘    └──────────┘    └──────────┘    └────┬─────┘
                                                      │
                                 ┌────────────────────┼────────────────────┐
                                 ▼                    ▼                    ▼
                         ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
                         │   Python     │    │    Bash      │    │   Binary     │
                         │  transpiler  │    │  transpiler  │    │   compiler   │
                         └──────┬───────┘    └──────┬───────┘    └──────┬───────┘
                                │                   │                   │
                                ▼                   ▼                   ▼
                         ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
                         │  .py output  │    │  .sh output  │    │  .bin output │
                         └──────────────┘    └──────────────┘    └──────────────┘
```

## Key Design Decisions

1. **Python implementation** — the transpiler itself is written in Python, making
   it easy to extend and maintain
2. **Three targets** — compile once, run anywhere (Python ecosystem, shell scripts,
   standalone binaries)
3. **Own stdlib** — the standard library is written in Externum, proving the
   language is self-hosting capable
4. **Browser execution** — via Pyodide (Python → WebAssembly), no server needed
5. **100% test coverage** — 120 tests ensure every feature works across all backends

## REPL

Interactive shell with:
- History navigation (up/down arrows)
- Tab completion
- Multi-line input (auto-detects incomplete blocks)
- Direct execution mode (no compilation needed)
- Variable persistence between lines

## Module System

```python
# Relative imports
from . import local_module
from .sub import something

# Absolute imports
import externum.utils
from externum.math import sqrt
```

Modules are resolved by:
1. Checking the current directory for `.ext` files
2. Checking for package directories with `__init__.ext`
3. Checking the standard library
