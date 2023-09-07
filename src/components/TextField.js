import TextField from '@mui/material/TextField'

const TextFieldWrapper = ({ sx, onWheel, ...props }) => {
  const _onWheel = event => {
    if (onWheel) {
      return onWheel(event)
    }
    event.target.blur()
    event.stopPropagation()
  }

  return (
    <TextField
      {...props}
      onWheel={_onWheel}
      sx={{
        ...sx,
        'input::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0
        },
        'input::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0
        },
        'input[type=number]': {
          MozAppearance: 'textfield'
        }
      }}
    />
  )
}

export default TextFieldWrapper
