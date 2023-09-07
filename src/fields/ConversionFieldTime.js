import { useState } from 'react'
import PropTypes from 'prop-types'
import ConversionFieldBase from '../components/ConversionFieldBase'
import {
  convertValue,
  getBestWholeValue
} from './ConversionField.helpers'

const TIME_UNIT_VALUES = {
  Milliseconds: 1,
  Seconds: 1_000,
  Minutes: 60_000,
  Hours: 3_600_000,
  Days: 86_400_000
}

const ConversionFieldTime = ({
  formData = 0,
  schema,
  uiSchema,
  onChange,
  errorSchema,
  ...props
}) => {
  const passedUnit = uiSchema?.unit || uiSchema?.default

  // Falls back on Milliseconds if invalid unit is passed
  // const unit = Object.keys(TIME_UNIT_VALUES).includes(passedUnit)
  //   ? passedUnit
  //   : 'Milliseconds'
  const unit = passedUnit

  !unit &&
    console.error(
      `The ConversionFieldTime field must be provided a 'unit' prop through the uiSchema`
    )

  const selectItems = Object.keys(TIME_UNIT_VALUES)
  const bestWholeValueObj = getBestWholeValue(
    parseInt(formData, 10),
    unit,
    TIME_UNIT_VALUES
  )

  const [selectedValue, setSelectedValue] = useState(bestWholeValueObj?.unit)
  const [inputValue, setInputValue] = useState(bestWholeValueObj?.value)

  const onInputChange = newValue => {
    setInputValue(parseInt(newValue || 0, 10))
    onChange(
      convertValue(
        parseInt(newValue || 0, 10),
        selectedValue,
        unit,
        TIME_UNIT_VALUES
      )
    )
  }

  const onSelectChange = newSelectValue => {
    setSelectedValue(newSelectValue)
    onChange(
      convertValue(
        parseInt(inputValue, 10),
        newSelectValue,
        unit,
        TIME_UNIT_VALUES
      )
    )
  }

  const newErrorSchema = {
    ...errorSchema,
    _errors: [
      ...(errorSchema?._errors || []),
      ...(formData > Number.MAX_SAFE_INTEGER ? ['Value is too large.'] : [])
    ]
  }

  return (
    <ConversionFieldBase
      type={uiSchema?.type || 'Duration'}
      items={selectItems.slice(selectItems.indexOf(unit), selectItems.length)}
      inputValue={inputValue}
      onInputChange={onInputChange}
      selectValue={selectedValue}
      onSelectChange={onSelectChange}
      errorSchema={newErrorSchema}
      title={schema?.title}
      unitError={
        !Object.keys(TIME_UNIT_VALUES).includes(passedUnit)
          ? `Invalid data '${passedUnit}' was passed as a unit to the field.`
          : ''
      }
      schema={schema}
      uiSchema={uiSchema}
      {...props}
    />
  )
}

ConversionFieldTime.propTypes = {
  formData: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object,
  uiSchema: PropTypes.object,
  errorSchema: PropTypes.object
}

export default ConversionFieldTime
