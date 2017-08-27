# Word Split
This repository houses different solutions to the "Word Split" problem.

### The Problem
Given an input string and a dictionary, return a splitting of the string into words in the dictionary.
* If a splitting is possible, return a possible list of words (There can be multiple answers.).
* If a splitting is impossible, return null.

### Rules
* Exact Matching - potential words must match exactly to a word in the dictionary, including capital letters

### Examples
* split("helloworld", ["world", "hello"]) -> ["hello", "world"]
* split("hello world", ["world", "hello"]) -> null / empty set
* split("hello world", ["world", "hello", " ", "test"]) -> ["world", "hello", " "]
