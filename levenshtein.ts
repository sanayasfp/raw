  export function levenshtein(a: string, b: string): number {
    const m = Math.max(a.length, b.length);
    const n = Math.min(a.length, b.length);

    if (m === 0) return n;
    if (n === 0) return m;

    const matrix: number[][] = new Array(m + 1).fill(0).map(() => new Array(n + 1));
    matrix[0][0] = 0;

    for (let i = 1; i <= m; i++) matrix[i][0] = i;
    for (let j = 1; j <= m; j++) matrix[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i - 1] === b[j - 1]) matrix[i][j] = matrix[i - 1][j - 1];
        else {
          const removal = matrix[i - 1][j] + 1;
          const insertion = matrix[i][j - 1] + 1;
          const substitution = matrix[i - 1][j - 1] + 1;

          matrix[i][j] = Math.min(removal, insertion, substitution);
        }
      }
    }

    return matrix[m][n];
  }

  if (require.main === module) {
    const distance = levenshtein("k", "hello");
    console.log(distance); // 1
  }
