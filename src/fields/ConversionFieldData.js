import { useState } from 'react'
import PropTypes from 'prop-types'
import ConversionFieldBase from '../components/ConversionFieldBase'
import {
  convertValue,
  getBestWholeValue
} from './ConversionField.helpers'

const DECIMAL_DATA_UNIT_VALUES = {
  Bytes: 1,
  Kibibytes: 1_024,
  KiB: 1_024,
  Mebibytes: 1_048_576,
  MiB: 1_048_576,
  Gibibytes: 1_073_741_824,
  GiB: 1_073_741_824
}

const BASE_10_DATA_UNIT_VALUES = {
  Bytes: 1,
  Kilobytes: 1_000,
  KB: 1_000,
  Megabytes: 1_000_000,
  MB: 1_000_000,
  Gigabytes: 1_000_000_000,
  GB: 1_000_000_000
}

const ALL_DATA_UNIT_VALUES = {
  ...DECIMAL_DATA_UNIT_VALUES,
  ...BASE_10_DATA_UNIT_VALUES
}

const ConversionFieldData = ({
  formData = 0,
  schema,
  uiSchema,
  onChange,
  errorSchema,
  ...props
}) => {
  const passedUnit = uiSchema?.unit || uiSchema?.default

  // if (process.env.NODE_ENV === 'development' && !Object.keys(DECIMAL_DATA_UNIT_VALUES).includes(passedUnit)) throw `The ConversionFieldData field must be provided a valid 'unit' prop through the uiSchema. You have provided '${passedUnit}'. The valid options are: | ${Object.keys(ALL_DATA_UNIT_VALUES).join(" | ")}`

  !Object.keys(ALL_DATA_UNIT_VALUES).includes(passedUnit) &&
    console.error(
      `The ConversionFieldData field must be provided a valid 'unit' prop through the uiSchema. You have provided '${passedUnit}'. The valid options are: | ${Object.keys(
        ALL_DATA_UNIT_VALUES
      ).join(' | ')}`
    )

  // Falls back on Bytes if invalid unit is passed
  // const unit = Object.keys(ALL_DATA_UNIT_VALUES).includes(passedUnit)
  //   ? passedUnit
  //   : 'Bytes'
  const unit = passedUnit

  const parsedFormData = parseInt(formData, 10)

  /**
   * Decides which map of units to use based on the default.
   * If the default is Base2, then we use decimal
   * If it is base10, we use Base_10
   * If it is a Byte, we use both.
   */
  const unitsMap =
    unit === 'Bytes'
      ? ALL_DATA_UNIT_VALUES
      : Object.keys(DECIMAL_DATA_UNIT_VALUES).includes(unit)
        ? DECIMAL_DATA_UNIT_VALUES
        : BASE_10_DATA_UNIT_VALUES

  const selectItems = Object.keys(unitsMap).filter(
    unit => unit.length <= 3 || unit === 'Bytes'
  )

  const bestWholeValueObj = getBestWholeValue(parsedFormData, unit, unitsMap)

  const [selectedValue, setSelectedValue] = useState(bestWholeValueObj?.unit)
  const [inputValue, setInputValue] = useState(bestWholeValueObj?.value)

  const onInputChange = newValue => {
    setInputValue(parseInt(newValue || 0, 10))
    onChange(
      convertValue(parseInt(newValue || 0, 10), selectedValue, unit, unitsMap)
    )
  }

  const onSelectChange = newSelectValue => {
    setSelectedValue(newSelectValue)
    onChange(
      convertValue(parseInt(inputValue, 10), newSelectValue, unit, unitsMap)
    )
  }

  const newErrorSchema = {
    ...errorSchema,
    _errors: [
      ...(errorSchema?._errors || []),
      ...(parsedFormData > Number.MAX_SAFE_INTEGER
        ? ['Value is too large.']
        : [])
    ]
  }

  return (
    <ConversionFieldBase
      type={uiSchema?.type || 'Size'}
      items={selectItems.slice(selectItems.indexOf(unit), selectItems.length)}
      inputValue={inputValue}
      onInputChange={onInputChange}
      selectValue={selectedValue}
      onSelectChange={onSelectChange}
      errorSchema={newErrorSchema}
      title={schema?.title}
      unitError={
        !Object.keys(ALL_DATA_UNIT_VALUES).includes(passedUnit)
          ? `Invalid data '${passedUnit}' was passed as a unit to the field.`
          : ''
      }
      uiSchema={uiSchema}
      schema={schema}
      {...props}
    />
  )
}

ConversionFieldData.propTypes = {
  formData: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object,
  uiSchema: PropTypes.object,
  errorSchema: PropTypes.object
}

export default ConversionFieldData
