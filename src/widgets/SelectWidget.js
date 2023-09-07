import {
  ariaDescribedByIds,
  enumOptionsValueForIndex,
  labelValue
} from '@rjsf/utils'

import AutocompleteField from '../components/AutocompleteField'
import Typography from '@mui/material/Typography'

/** NOTE
 *  This is an internal RJSF component that we have overriden to provide custom support.
 *  Be careful when touching anything in this file, as much of the code is used by RJSF internally.
 *
 *
 *  Treat this file as part of RJSF's internal Form implementation.
 */

/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
const SelectWidget = ({
  schema,
  id,
  name, // remove this from textFieldProps
  options,
  label,
  hideLabel,
  required,
  disabled,
  placeholder,
  readonly,
  value,
  multiple,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  rawErrors = [],
  registry,
  uiSchema,
  hideError,
  formContext,
  ...textFieldProps
}) => {
  const { enumOptions, enumDisabled, emptyValue: optEmptyVal } = options

  const isMultiple = typeof multiple === 'undefined' ? false : !!multiple

  const emptyValue = isMultiple ? [] : ''
  const isEmpty =
    typeof value === 'undefined' ||
    (isMultiple && value.length < 1) ||
    (!isMultiple && value === emptyValue)

  const _onChange = ({ target: { value } }) => {
    const index = Array.isArray(value)
      ? value.map(val =>
        String(enumOptions.map(option => option.value).indexOf(val))
      )
      : String(enumOptions.map(option => option.value).indexOf(value))

    index !== '-1'
      ? // has value in options array: will set selecte value
      onChange(enumOptionsValueForIndex(index, enumOptions, optEmptyVal))
      : optEmptyVal !== undefined
        ? // has an emptyValue set via ui:schema: will set selected value to optEmptyValue
        onChange(optEmptyVal)
        : // has default value in schema: wont set selected value to empty string
        schema.default === undefined &&
        onChange(enumOptionsValueForIndex(index, enumOptions, optEmptyVal))
  }
  const _onBlur = ({ target: { value } }) =>
    onBlur(
      id,
      enumOptionsValueForIndex(
        String(enumOptions.map(option => option.value).indexOf(value)),
        enumOptions,
        optEmptyVal
      )
    )
  const _onFocus = ({ target: { value } }) =>
    onFocus(
      id,
      enumOptionsValueForIndex(
        String(enumOptions.map(option => option.value).indexOf(value)),
        enumOptions,
        optEmptyVal
      )
    )

  return (
    <AutocompleteField
      id={id}
      name={id}
      label={labelValue(label || undefined, hideLabel, false)}
      value={isEmpty ? emptyValue : value}
      required={required}
      disabled={disabled || readonly}
      autoFocus={autofocus}
      placeholder={placeholder}
      error={rawErrors.length > 0}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      {...textFieldProps}
      InputLabelProps={{
        ...textFieldProps.InputLabelProps
      }}
      SelectProps={{
        ...textFieldProps.SelectProps,
        isMultiple
      }}
      aria-describedby={ariaDescribedByIds(id)}
      options={enumOptions}
      noSearchOptionsText={
        <Typography variant='h6'>
          There are no options matching that search text. Please search for
          something else.
        </Typography>
      }
      autocompleteProps={{
        multiple: isMultiple,
        isOptionEqualToValue: (option, value) =>
          option?.value === value || (value === '' && option.value === value),
        getOptionLabel: option =>
          typeof option === 'object'
            ? option.label
            : enumOptions.find(opt => opt.value === option)?.label || '',
        getOptionDisabled: option =>
          Array.isArray(enumDisabled) &&
          enumDisabled.indexOf(option?.value) !== -1,
        filterOptions: (options, state) =>
          options.filter(option =>
            option?.label
              ?.toLowerCase()
              ?.includes(state.inputValue?.toLowerCase())
          )
      }}
    />
  )
}

export default SelectWidget
