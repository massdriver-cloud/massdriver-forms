export const pipe =
  (...fns) =>
  x =>
    fns.reduce((res, fn) => fn(res), x)

export const compose =
  (...fns) =>
  x =>
    fns.reduceRight((res, fn) => fn(res), x)

/**
 * Variatic curry
 */
// export const curry = fn => {
//   const innerFn = (N, args) => (...x) =>
//     N <= x.length ? fn(...args, ...x) : innerFn(N - x.length, [...args, ...x])

//   return innerFn(fn.length, [])
// }
