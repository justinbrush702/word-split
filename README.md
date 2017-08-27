# Word Split
This repository houses different solutions to the "Word Split" problem.

### The Problem
Given an input string and a dictionary, return a splitting of the string into words in the dictionary.
* If a splitting is possible, return a possible list of words (There can be multiple answers.).
* If a splitting is impossible, return null.

### The Solutions
* The recursive solution breaks up the input as it finds words and repeats for the rest of the substring. It will find an answer if one exists, but it has an exponential runtime.
* The optimal solution uses dynamic programming, storing information about each subset of characters as it fills a matrix with data points. While space complexity is slightly increased, runtime complexity drops from exponential to polynomial. I educated myself on using dynamic programming for this solution via [Tushar Roy](https://www.youtube.com/watch?v=WepWFGxiwRs).

### Rules
* Exact Matching - potential words must match exactly to a word in the dictionary, including capital letters

### Examples
* split("helloworld", ["world", "hello"]) -> ["hello", "world"]
* split("hello world", ["world", "hello", " ", "test"]) -> ["hello", " ", "world"]
* split("hello world", ["world", "hello"]) -> null
* split("", ["world", "hello"]) -> empty set

### How To Run
I run tests against the solutions using Node.js. If you have Node installed, clone the repo and run:

```sh
node tests.js
```

This file will run test cases against one of the two solutions. The solution to use is hardcoded on line 5 of tests.js.
