import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

const AutocompleteField = ({
  // standard props
  loading,
  loadingText,
  loadingError,
  validationError,
  errorText,
  noOptionsText,
  noSearchOptionsText,
  options,
  disabled,
  value,
  onChange,
  onBlur,
  onFocus,
  // Autocomplete props
  autocompleteProps,
  // TextField props
  label,
  ...props
}) => {
  const _options = [
    ...(options?.map(option =>
      typeof option === 'object'
        ? option
        : {
          label: option,
          value: option
        }
    ) || []),
    ...(value === '' ? [{ label: '', value: '' }] : [])
  ]
  // adds the selected option value to the onChange event.
  // necessary for RJSF
  const _onChange = (event, option) =>
    onChange?.(
      {
        ...event,
        target: {
          ...event.target,
          value: Array.isArray(option)
            ? option.map(option => option.value || option)
            : option?.value
        }
      },
      option
    )

  const _onBlur = event => {
    const option = _options.find(option => option.label === event.target.value)
    return onBlur?.(
      {
        ...event,
        target: {
          ...event.target,
          value: option?.value
        }
      },
      option
    )
  }

  const _onFocus = event => {
    const option = _options.find(option => option.label === event.target.value)
    return onFocus?.(
      {
        ...event,
        target: {
          ...event.target,
          value: option?.value
        }
      },
      option
    )
  }

  return (
    <Autocomplete
      renderInput={params => (
        <TextField
          // params
          {...params}
          // props passed through that need to go to the TextField
          label={label}
          error={validationError}
          {...props}
          // Nested props. Only these three need to be handled this way as they are the only ones 'params' uses.
          InputProps={{
            ...params?.InputProps,
            ...props?.InputProps
          }}
          InputLabelProps={{
            ...params?.InputLabelProps,
            ...props?.InputLabelProps
          }}
          inputProps={{
            ...params?.inputProps,
            ...props?.inputProps
          }}
        />
      )}
      options={
        loading || loadingError || !Array.isArray(options) ? [] : _options
      }
      disabled={disabled}
      loading={loading || loadingError}
      loadingText={
        loading
          ? loadingText || (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CircularProgress size={20} />
            </Box>
          )
          : errorText || 'There was an issue getting your options.'
      }
      noOptionsText={options.length > 0 ? noSearchOptionsText : noOptionsText}
      value={value}
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      {...autocompleteProps}
      filterOptions={(options, state) => {
        const customFilteredOptions = autocompleteProps?.filterOptions?.(
          options,
          state
        )
        return customFilteredOptions && value === ''
          ? customFilteredOptions.filter(option => option.value !== '')
          : customFilteredOptions ||
          options.filter(option =>
            option.label
              .toLowerCase()
              .includes(state.inputValue.toLowerCase())
          )
      }}
    />
  )
}

export default AutocompleteField
