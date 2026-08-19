---
sidebar_position: 3
title: Compiler & Transpiler
---

# Externum — Compiler & Transpiler

## Pipeline

```
Source (.ext) → Lexer → Parser → AST → Transpiler → Target
```

### 1. Lexer

Tokenises the source into tokens:
- Keywords, identifiers, operators, literals
- Handles f-strings, multi-line strings, comments
- Supports Python-style indentation (optional braces)

### 2. Parser

Recursive descent parser with:
- Full operator precedence (14 levels)
- Expression parsing with Pratt algorithm
- Statement parsing (if, while, for, fn, class, try)
- Error recovery (continues parsing after errors)

### 3. AST

Abstract syntax tree with typed nodes:
- Expressions: literals, binary ops, function calls, member access
- Statements: assignments, returns, imports, class definitions
- Declarations: functions, classes, modules

### 4. Transpiler

Three target backends:

#### Python Backend
- Direct AST → Python translation
- Handles all Externum features via Python equivalents
- Generates clean, idiomatic Python output
- Supports all standard library imports

#### Bash Backend
- AST → Bash script translation
- Limited to shell-compatible constructs
- Functions → Bash functions
- Loops → Bash loops
- I/O → echo/printf/read

#### Binary Backend
- AST → standalone executable
- Embeds Python interpreter or uses native compilation
- No runtime dependencies

## Type System

Externum is **dynamically typed** with optional type hints:

```python
fn add(a: int, b: int) -> int {
    return a + b
}
```

Type hints are for documentation and IDE support — not enforced at runtime.

## Module Resolution

```python
# Import from standard library
import math
from string import capitalize

# Import own modules
import mymodule
from mypackage.sub import something

# Import with alias
import collections as coll
```

Resolution order:
1. Check if `.ext` file exists in current directory
2. Check if package directory with `__init__.ext` exists
3. Check standard library

## Error Reporting

```
Error in file "main.ext" at line 15, column 8:
    Undefined variable "x"
    
    13 | fn main() {
    14 |     y = 10
 >> 15 |     print(x)
                  ^
    16 | }
```

## Tests

**120/120 tests** covering:
- Lexer correctness (all token types)
- Parser correctness (all syntax constructs)
- Python transpiler output (matches expected)
- Bash transpiler output (matches expected)
- Binary compilation (produces runnable output)
- Standard library functions (all implemented)
- Edge cases (empty files, nested constructs, error recovery)
