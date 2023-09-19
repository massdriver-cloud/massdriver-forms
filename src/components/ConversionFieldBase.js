import PropTypes from 'prop-types'
import stylin from '../utils/stylin'
import FieldWrapper from '../fields/FieldWrapper'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import TextField from './TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'

const ConversionFieldBase = ({
  type,
  items,
  inputValue,
  onInputChange,
  selectValue,
  onSelectChange,
  title,
  unitError,
  ...props
}) => (
  <FieldWrapper {...props}>
    {({ hasSchemaErrors, disabled, required }) => (
      <>
        {unitError && (
          <UnitError>
            <ErrorListText sx={{ fontSize: '14px' }}>{unitError}</ErrorListText>
          </UnitError>
        )}
        <Stack direction='row' spacing={2}>
          <TextField
            type='number'
            required={required}
            disabled={disabled}
            error={hasSchemaErrors}
            fullWidth
            value={inputValue || ''}
            onChange={event => onInputChange(event.target.value)}
            label={title}
          />
          <TextField
            select
            disabled={disabled}
            value={selectValue}
            onChange={event => onSelectChange(event.target.value)}
            label={type}
            sx={{ width: '40%' }}
          >
            {items.map(item => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </>
    )}
  </FieldWrapper>
)

ConversionFieldBase.propTypes = {
  type: PropTypes.string,
  items: PropTypes.array,
  inputValue: PropTypes.number,
  onInputChange: PropTypes.func,
  selectValue: PropTypes.string,
  onSelectChange: PropTypes.func,
  title: PropTypes.string,
  unitError: PropTypes.string
}

export default ConversionFieldBase

const ErrorListText = stylin(Typography)({
  color: '#870000',
  fontWeight: 'bold',
  fontSize: '13px',
  lineHeight: 1.66,
  mx: '8px',
  mt: '3px'
})

const UnitError = stylin(Box)({
  position: 'absolute',
  top: '-10px',
  left: '-5px',
  color: 'red',
  background: 'rgba(255, 255, 255, 0.5)',
  width: 'calc(100% + 10px)',
  backdropFilter: 'blur(1px)',
  webkitBackdropFilter: 'blur(1px)',
  height: 'calc(100% + 10px)',
  zIndex: 10000000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px'
})
