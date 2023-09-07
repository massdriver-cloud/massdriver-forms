export const convertValue = (value, currentUnit, newUnit, unitsMap) =>
  (value * unitsMap?.[currentUnit]) / unitsMap?.[newUnit]

export const getBestWholeValue = (value = 0, currentUnit, unitsMap) => {
  if (value === 0) return { value, unit: currentUnit }

  const bestUnit = Object.keys(unitsMap).reduce((prev, nextUnit) =>
    convertValue(value, currentUnit, nextUnit, unitsMap) % 1 === 0
      ? nextUnit
      : prev
  )

  return {
    value: convertValue(value, currentUnit, bestUnit, unitsMap),
    unit: bestUnit
  }
}
