# Levenshtein Distance: Understanding and Applying

Levenshtein distance, also known as edit distance, is a fundamental concept in computer science and information theory. It measures the similarity between two strings by calculating the minimum number of operations required to transform one into the other. These operations include insertion, deletion, and substitution of a character.

## Origin and Usage

The concept is named after Vladimir Levenshtein, a Russian scientist who introduced it in 1965. Since then, Levenshtein distance has become an essential tool in various fields of computer science, including:

1. **Spell Checking:** Search engines, spell checkers, and voice recognition systems use Levenshtein distance to suggest corrections or alternatives for incorrect input.

2. **Bioinformatics:** It is used to compare DNA and RNA sequences, as well as to align protein sequences.

3. **Text Analysis:** In text analysis, it helps measure the similarity between documents, identify plagiarism, or classify texts by theme.

## Calculating Levenshtein Distance

The Levenshtein algorithm relies on a dynamic programming approach. It involves filling a matrix where each cell represents the cost of an operation to transform a substring of the first string into a substring of the second.

Here are the three possible operations:

1. **Insertion:** Adding a character to the first string to make it identical to the second.

2. **Deletion:** Removing a character from the first string to make it identical to the second.

3. **Substitution:** Replacing a character in the first string with another to make it identical to the second.

Each cell `(i, j)` of the matrix represents the minimum cost to transform the substring of the first string up to index `i` into the substring of the second string up to index `j`.

## The Levenshtein Distance Algorithm

The Levenshtein distance algorithm can be summarized in four steps:

1. **Initialize a Matrix:** Create a 2D matrix of size `(m+1) x (n+1)`, where `m` is the length of the first string and `n` is the length of the second string.

2. The cells in the first column represent the distances between each character of the first string and an empty string, while the cells in the first row represent the distances between each character of the second string and an empty string. Cell `(0,0)` is initialized to zero, and each other cell `(i,0)` is initialized to `i`, and each other cell `(0,j)` is initialized to `j`. In simpler terms, we initialize the first column to 0, 1, 2, 3, ..., `m`, and the first row to 0, 1, 2, 3, ..., `n`.

3. For each position `(i,j)` in the matrix where `i > 0` and `j > 0`, calculate the cost of transforming the substring of the first string up to position `i` and the substring of the second string up to position `j`.

    - If the characters at the two positions are identical, the cost is zero;
    - Otherwise, the cost is the minimum among the cost of insertion, deletion, and substitution, plus one.
        - Cost of insertion: cell `(i,j-1)` + 1
        - Cost of deletion: cell `(i-1,j)` + 1
        - Cost of substitution: cell `(i-1,j-1)` + 1

4. Return the value of cell `(m,n)` in the matrix, which represents the Levenshtein distance between the two strings.

#### Example of Implementation

- [x] [TypeScript](./levenshtein.ts) - by [Sana Yasfp](https://github.com/sanayasfp)
- [ ] [Python](./levenshtein.py)
- [ ] [PHP](./levenshtein.php)
- [ ] [Java](./Levenshtein.java)
- [ ] [C](./levenshtein.c)
- [ ] [C++](./levenshtein.cpp)
- [ ] [C#](./Levenshtein.cs)
- [ ] [Rust](./levenshtein.rs)

Levenshtein distance is a powerful tool for measuring similarity between strings in various different contexts. Understanding and applying it can greatly contribute to solving complex problems in computer science and related fields.