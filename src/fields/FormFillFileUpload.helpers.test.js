import { stripDefaultValues } from './FormFillFileUpload.helpers'

describe('stripDefaultValues', () => {
  test('should run fine with no data', () => {
    expect(() => stripDefaultValues()).not.toThrow()
  })

  test('should remove default values from the form data', () => {
    const SCHEMA_PROPERTIES = {
      field1: {
        type: 'string',
        default: 'field1value'
      },
      field2: {
        type: 'integer',
        default: 2
      },
      field3: {
        type: 'integer'
      }
    }

    const FORM_DATA = {
      field1: 'field1value',
      field2: 2
    }

    expect(stripDefaultValues(FORM_DATA, SCHEMA_PROPERTIES)).toMatchObject({
      oldValues: {
        field1: 'field1value',
        field2: 2
      },
      newValues: {}
    })
  })

  test('should ignore values that arent the set default', () => {
    const SCHEMA_PROPERTIES = {
      field1: {
        type: 'string',
        default: 'field1value'
      },
      field2: {
        type: 'integer',
        default: 2
      },
      field3: {
        type: 'integer'
      }
    }

    const FORM_DATA = {
      field1: 'field1value',
      field2: 21,
      field3: 3
    }

    expect(stripDefaultValues(FORM_DATA, SCHEMA_PROPERTIES)).toMatchObject({
      oldValues: {
        field1: 'field1value'
      },
      newValues: {
        field2: 21,
        field3: 3
      }
    })
  })
})
