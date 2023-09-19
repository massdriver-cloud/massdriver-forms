import { convertValue, getBestWholeValue } from './ConversionField.helpers'

describe('convertValue', () => {
  test('should run fine with no data', () => {
    expect(() => convertValue()).not.toThrow()
  })

  test('should properly convert Kilobytes to Bytes', () => {
    const BASE_10_DATA_UNIT_VALUES = {
      Bytes: 1,
      Kilobytes: 1000,
      Megabytes: 1000000,
      Gigabytes: 1000000000
    }

    expect(
      convertValue(3000, 'Kilobytes', 'Bytes', BASE_10_DATA_UNIT_VALUES)
    ).toBe(3000000)
  })

  test('should properly convert Gigabytes to Megabytes', () => {
    const BASE_10_DATA_UNIT_VALUES = {
      Bytes: 1,
      Kilobytes: 1000,
      Megabytes: 1000000,
      Gigabytes: 1000000000
    }

    expect(
      convertValue(3000, 'Gigabytes', 'Megabytes', BASE_10_DATA_UNIT_VALUES)
    ).toBe(3000000)
  })

  test('should properly convert Gigabytes to Kilobytes', () => {
    const BASE_10_DATA_UNIT_VALUES = {
      Bytes: 1,
      Kilobytes: 1000,
      Megabytes: 1000000,
      Gigabytes: 1000000000
    }

    expect(
      convertValue(3, 'Gigabytes', 'Kilobytes', BASE_10_DATA_UNIT_VALUES)
    ).toBe(3000000)
  })

  test('should properly convert Kilobytes to Gigabytes', () => {
    const BASE_10_DATA_UNIT_VALUES = {
      Bytes: 1,
      Kilobytes: 1000,
      Megabytes: 1000000,
      Gigabytes: 1000000000
    }

    expect(
      convertValue(3000000, 'Kilobytes', 'Gigabytes', BASE_10_DATA_UNIT_VALUES)
    ).toBe(3)
  })
})

describe('getBestWholeValue', () => {
  test('should run fine with no data', () => {
    expect(() => getBestWholeValue()).not.toThrow()
  })

  test('should return highest whole value and unit as an object', () => {
    const BASE_10_DATA_UNIT_VALUES = {
      Bytes: 1,
      Kilobytes: 1000,
      Megabytes: 1000000,
      Gigabytes: 1000000000
    }

    const ALL_DATA_UNIT_VALUES = {
      Bytes: 1,
      Kibibytes: 1024,
      Kilobytes: 1000,
      Mebibytes: 1048576,
      Megabytes: 1000000,
      Gibibytes: 1073741824,
      Gigabytes: 1000000000
    }

    const dataObj = getBestWholeValue(300000000, 'Bytes', ALL_DATA_UNIT_VALUES)

    expect(dataObj.value).toBe(300)
    expect(dataObj.unit).toBe('Megabytes')

    const otherDataObj = getBestWholeValue(
      3000000000,
      'Bytes',
      BASE_10_DATA_UNIT_VALUES
    )

    expect(otherDataObj.value).toBe(3)
    expect(otherDataObj.unit).toBe('Gigabytes')
  })
})
