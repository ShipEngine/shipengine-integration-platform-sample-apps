/**
 * Return the cartesian product of `a` arrays.
 * 
 * @param a
 */
export const cartesian = <T>(...a: T[][]): T[][] => {
  return a.reduce<T[][]>(
    (results, entries) =>
      results
        .map(result => entries.map(entry => [...result, entry] ))
        .reduce((subResults, result) => [...subResults, ...result]   , []), 
    [[]]
  )
}

/**
 * Return a range array of `n` elements.
 * 
 * @param n 
 */
export const range = (n: number): number[] => [...Array(n)].map((_, i) => i + 1)